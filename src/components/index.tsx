import { TimelineItemModel } from '@models/TimelineItemModel';
import { TimelineProps } from '@models/TimelineModel';
import { getUniqueID } from '@utils/index';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import GlobalContextProvider from './GlobalContext';
import { GlobalContext } from './GlobalContext';
import Timeline from './timeline/timeline';
const toReactArray = React.Children.toArray;

// Define the WrapperComponent with correct typing for children
const WrapperComponent: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
  console.log('WrapperComponent', children);
  const { mode } = useContext(GlobalContext);
  console.log('WrapperComponent mode', mode);

  // You can add additional logic or context here if needed
  return (
    <>
      {children}
    </>
  );
};

const Chrono: React.FunctionComponent<Partial<TimelineProps>> = (
  props: TimelineProps,
) => {
  const {
    allowDynamicUpdate = false,
    children,
    items,
    onScrollEnd,
    slideShow = false,
    onItemSelected,
    activeItemIndex = 0,
    titleDateFormat = 'MMM DD, YYYY',
  } = props;

  const { mode } = useContext(GlobalContext); // Get the mode from context

  const [timeLineItems, setTimeLineItems] = useState<TimelineItemModel[]>([]);
  const timeLineItemsRef = useRef<TimelineItemModel[]>();
  const [slideShowActive, setSlideShowActive] = useState(false);
  const [activeTimelineItem, setActiveTimelineItem] = useState(activeItemIndex);

  const initItems = (lineItems?: TimelineItemModel[]): TimelineItemModel[] => {
    if (lineItems?.length) {
      return lineItems.map((item, index) => {
        const id = getUniqueID();

        return {
          ...item,
          _dayjs: dayjs(item.date),
          active: index === activeItemIndex,
          id,
          items: item.items?.map((subItem) => ({
            ...subItem,
            _dayjs: dayjs(subItem.date),
            id: getUniqueID(),
            isNested: true,
            visible: true,
          })),
          title: item.date
            ? dayjs(item.date).format(titleDateFormat)
            : item.title,
          visible: true,
        };
      });
    }

    const itemLength = React.Children.toArray(children).filter(
      (item) => (item as React.ReactElement).props.className !== 'chrono-icons',
    ).length;

    return Array.from({ length: itemLength }).map((_, index) => ({
      active: index === activeItemIndex,
      id: getUniqueID(),
      visible: true,
    }));
  };

  const updateItems = (lineItems: TimelineItemModel[]) => {
    if (lineItems) {
      const pos = timeLineItems.length;

      return lineItems.map((item, index) => ({
        ...item,
        active: index === pos,
        visible: true,
      }));
    } else {
      return [];
    }
  };

  useEffect(() => {
    const _items = items?.filter((item) => item);
    let newItems: TimelineItemModel[] = [];

    if (!_items?.length) {
      const lineItems = initItems();
      setTimeLineItems(lineItems);
      return;
    }

    if (timeLineItems.length && _items.length > timeLineItems.length) {
      newItems = updateItems(_items);
    } else if (_items.length) {
      newItems = initItems(_items);
    }

    if (newItems.length) {
      timeLineItemsRef.current = newItems;
      setTimeLineItems(newItems);
      setActiveTimelineItem(0);
    }
  }, [JSON.stringify(allowDynamicUpdate ? items : null)]);

  const handleTimelineUpdate = useCallback((actvTimelineIndex: number) => {
    setTimeLineItems((lineItems) =>
      lineItems.map((item, index) => ({
        ...item,
        active: index === actvTimelineIndex,
        visible: actvTimelineIndex >= 0,
      })),
    );

    setActiveTimelineItem(actvTimelineIndex);

    if (items) {
      if (items.length - 1 === actvTimelineIndex) {
        setSlideShowActive(false);
      }
    }
  }, []);

  useEffect(() => {
    handleTimelineUpdate(activeItemIndex);
  }, [activeItemIndex]);

  const restartSlideShow = useCallback(() => {
    handleTimelineUpdate(-1);

    setTimeout(() => {
      setSlideShowActive(true);
      handleTimelineUpdate(0);
    }, 0);
  }, []);

  const handleOnNext = () => {
    if (!timeLineItems.length) {
      return;
    }
    if (activeTimelineItem < timeLineItems.length - 1) {
      const newTimeLineItem = activeTimelineItem + 1;

      handleTimelineUpdate(newTimeLineItem);
      setActiveTimelineItem(newTimeLineItem);
    }
  };

  const handleOnPrevious = () => {
    if (activeTimelineItem > 0) {
      const newTimeLineItem = activeTimelineItem - 1;

      handleTimelineUpdate(newTimeLineItem);
      setActiveTimelineItem(newTimeLineItem);
    }
  };

  const handleFirst = () => {
    setActiveTimelineItem(0);
    handleTimelineUpdate(0);
  };

  const handleLast = () => {
    if (timeLineItems.length) {
      const idx = timeLineItems.length - 1;
      setActiveTimelineItem(idx);
      handleTimelineUpdate(idx);
    }
  };

  const handleOutlineSelection = useCallback(
    (index: number) => {
      if (index >= 0) {
        setActiveTimelineItem(index);
        handleTimelineUpdate(index);
      }
    },
    [timeLineItems.length],
  );

  const onPaused = useCallback(() => {
    setSlideShowActive(false);
  }, []);

  let iconChildren = toReactArray(children).filter(
    (item) => (item as any).props.className === 'chrono-icons',
  );

  if (iconChildren.length) {
    iconChildren = (iconChildren[0] as any).props.children;
  }

  // Reset the timeline when mode changes
  useEffect(() => {
    console.log('Mode changed to', mode);
    setTimeLineItems(initItems(items));
    setActiveTimelineItem(0);
    setSlideShowActive(false);
    // Add any other reset logic if necessary
  }, [mode]);

  return (
    <GlobalContextProvider {...props}>
      <WrapperComponent>
        <Timeline
          activeTimelineItem={activeTimelineItem}
          contentDetailsChildren={toReactArray(children).filter(
            (item) => (item as any).props.className !== 'chrono-icons',
          )}
          iconChildren={iconChildren}
          items={timeLineItems}
          onFirst={handleFirst}
          onLast={handleLast}
          onNext={handleOnNext}
          onPrevious={handleOnPrevious}
          onRestartSlideshow={restartSlideShow}
          onTimelineUpdated={handleTimelineUpdate}
          slideShow={slideShow}
          slideShowEnabled={slideShow}
          slideShowRunning={slideShowActive}
          onScrollEnd={onScrollEnd}
          onItemSelected={onItemSelected}
          onOutlineSelection={handleOutlineSelection}
          onPaused={onPaused}
        />
      </WrapperComponent>
    </GlobalContextProvider>
  );
};

export default Chrono;

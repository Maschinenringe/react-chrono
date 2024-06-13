import {
  TextDensity,
  TimelineMode,
  TimelineModel,
  TimelineProps,
} from '@models/TimelineModel';

export type TimelineToolbarProps = Pick<
  TimelineModel,
  | 'activeTimelineItem'
  | 'slideShowEnabled'
  | 'slideShowRunning'
  | 'onRestartSlideshow'
  | 'onNext'
  | 'onPrevious'
  | 'onPaused'
  | 'onFirst'
  | 'onLast'
  | 'items'
> & {
  id: string;
  onActivateTimelineItem: (id: string) => void;
  onUpdateMode: (mode: TimelineMode) => void;
  onUpdateTextContentDensity: (value: TextDensity) => void;
  onUpdateTimelineMode: (mode: TimelineMode) => void;
  toggleDarkMode: () => void;
  totalItems: number;
} & Pick<TimelineProps, 'darkMode' | 'flipLayout'>;

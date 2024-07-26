/// <reference types="react" />
import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
export declare const TimelineVerticalWrapper: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
export declare const VerticalItemWrapper: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, {
    $alternateCards?: boolean;
    $cardHeight?: number;
    $cardLess?: boolean;
    $isNested?: boolean;
    theme?: Theme;
}>> & string;
export declare const TimelineCardContentWrapper: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {
    $alternateCards?: boolean;
    $cardLess?: boolean;
    $flip?: boolean;
    $isMobile?: boolean;
    $noTitle?: boolean;
    height?: number;
}>> & string;
export declare const TimelineTitleWrapper: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {
    $alternateCards?: boolean;
    $flip?: boolean;
    $hide?: boolean;
    mode?: TimelineMode;
}>> & string;

import { TimelineProps, TimelineMode } from '@models/TimelineModel';
import React, { ReactNode } from 'react';
interface ModeContextProps {
    horizontalAll: boolean;
    renderMode: TimelineMode;
    setRenderMode: (mode: TimelineMode) => void;
}
export declare const ModeContext: React.Context<ModeContextProps>;
export declare const useRenderMode: () => ModeContextProps;
export declare const ModeProvider: React.FC<{
    children: ReactNode;
    mode?: TimelineMode;
    showAllCardsHorizontal?: boolean;
}>;
declare const Chrono: React.FC<Partial<TimelineProps>>;
export default Chrono;

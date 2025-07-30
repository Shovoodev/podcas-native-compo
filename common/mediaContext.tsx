import { Audio, AVPlaybackStatus } from "expo-av";
import {
  type SetStateAction,
  type Dispatch,
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

// --------------------------------------------------------------------

export type SetState<T> = Dispatch<SetStateAction<T>>;

type SelectedPlace = {
  text: string;
};
interface OFMapContextValue {
  inputSearch: SelectedPlace | undefined;
  setInputSearch: SetState<SelectedPlace | undefined>;
  progressPass: number;
  setProgressPass: SetState<number>;
  duration: number;
  setDuration: SetState<number>;
  sound: Audio.Sound | null;
  setSound: SetState<Audio.Sound | null>;
  isPlaying: boolean;
  setIsPlaying: SetState<boolean>;
  progress: number;
  setProgress: SetState<number>;
  timeLeft: number;
  setTimeLeft: SetState<number>;
  position: number;
  setPosition: SetState<number>;
}

// --------------------------------------------------------------------

const OFMapContext = createContext<OFMapContextValue | null>(null);

export function OFMapProvider({ children }: PropsWithChildren) {
  const [inputSearch, setInputSearch] = useState<SelectedPlace | undefined>();
  const [progressPass, setProgressPass] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [position, setPosition] = useState(0);

  const ctxValue = useMemo(
    () => ({
      inputSearch,
      setInputSearch,
      progressPass,
      setProgressPass,
      duration,
      setDuration,
      sound,
      setSound,
      isPlaying,
      setIsPlaying,
      progress,
      setProgress,
      timeLeft,
      setTimeLeft,
      position,
      setPosition,
    }),
    [
      inputSearch,
      setInputSearch,
      progressPass,
      setProgressPass,
      duration,
      setDuration,
      sound,
      setSound,
      isPlaying,
      setIsPlaying,
      progress,
      setProgress,
      timeLeft,
      setTimeLeft,
      position,
      setPosition,
    ]
  );

  return (
    <OFMapContext.Provider value={ctxValue}>{children}</OFMapContext.Provider>
  );
}

export function useOFMapApi() {
  const context = useContext(OFMapContext);

  if (context === null) {
    throw new Error(
      "The component must be rendered as child of Home component"
    );
  }

  return context;
}

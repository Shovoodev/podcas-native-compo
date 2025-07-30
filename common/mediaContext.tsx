import { AVPlaybackStatus } from "expo-av";
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
}

// --------------------------------------------------------------------

const OFMapContext = createContext<OFMapContextValue | null>(null);

export function OFMapProvider({ children }: PropsWithChildren) {
  const [inputSearch, setInputSearch] = useState<SelectedPlace | undefined>();
  const [progressPass, setProgressPass] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const ctxValue = useMemo(
    () => ({
      inputSearch,
      setInputSearch,
      progressPass,
      setProgressPass,
      duration,
      setDuration,
    }),
    [
      inputSearch,
      setInputSearch,
      progressPass,
      setProgressPass,
      duration,
      setDuration,
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

import { createContext, useState } from "react";

export const PlayInfoContext = createContext(null);

const PlayInfoProvider = ({ children }) => {
  const [isStart, setIsStart] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const value = {
    state: { isStart, isDone },
    actions: { setIsStart, setIsDone },
  };
  return (
    <PlayInfoContext.Provider value={value}>
      {children}
    </PlayInfoContext.Provider>
  );
};

export { PlayInfoProvider };
export default PlayInfoContext;

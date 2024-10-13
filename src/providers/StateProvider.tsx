import { createContext, useContext, useState } from "react";

const StateContext = createContext(null);

export const StateProvider = ({ children }: { children: any }) => {
  const [clickedElement, setClickedElement] = useState(null);

  return (
    // @ts-expect-error
    <StateContext.Provider value={{ clickedElement, setClickedElement }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

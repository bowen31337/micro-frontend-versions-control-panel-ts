import React, { createContext, useReducer } from "react";
import { Remote } from "./RemoteTypes";
const initMFEState: Remote[] = [];

const Reducer = (
  state: Remote[],
  action: { payload: Remote; type: string }
) => {
  switch (action.type) {
    case "UPDATE_REMOTE": {
      const existScope = state.find(
        (item) => item?.scope === action.payload?.scope
      );

      if (existScope) {
        return state.map((item) => {
          if (item?.scope === action.payload?.scope) {
            return { ...item, ...action.payload };
          }
          return item;
        });
      }
      return [...state, action.payload];
    }
    default:
      return state;
  }
};

export const MFEContext = createContext<[Remote[], React.Dispatch<any>]>([
  initMFEState,
  () => {},
]);

export const MEFProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, initMFEState);

  return (
    <MFEContext.Provider value={[state, dispatch]}>
      {children}
    </MFEContext.Provider>
  );
};

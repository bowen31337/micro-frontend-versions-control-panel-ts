import { useContext, useMemo } from "react";
import { MFEContext } from "./Provider";

import { useLocalStorage } from "../hooks/useLocalStorage";

import { Remote } from "./RemoteTypes";
export const VersionSelect = ({ scope }: { scope: string }) => {

  const [state, dispatch] = useContext<[Remote[], React.Dispatch<any>]>(
    MFEContext
  );
  const [_, setStorage] = useLocalStorage<Remote[]>("MFE_REMOTES", []);

  const currentRemote = useMemo(() => {
    return _.find((item:Remote) => item.scope === scope);
  }, [scope, _]);

  if (!state) {
    return <p>loading...</p>;
  }
  return (
    <select
      onChange={(e) => {
        dispatch({
          type: "UPDATE_REMOTE",
          payload: { scope, version: e.target.value },
        });

        setStorage((cachedRemotes: Remote[]) => {
          const existScope = cachedRemotes.find(
            (item) => item?.scope === scope
          );

          if (existScope) {
            return cachedRemotes.map((item) => {
              if (item?.scope === scope) {
                return {
                  ...item,
                  url: currentRemote?.url,
                  scope,
                  version: e.target.value,
                };
              }
              return item;
            });
          }
          return [
            ...cachedRemotes,
            { url: currentRemote?.url, scope, version: e.target.value },
          ] as Remote[];
        });
      }}
      value={currentRemote?.version}
    >
      {currentRemote?.versions?.map((version:string) => (
        <option key={version} value={version}>
          {version}
        </option>
      ))}
    </select>
  );
};

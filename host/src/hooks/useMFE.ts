import { useContext, useEffect } from "react";
import { MFEContext } from "../mfe/Provider";
import { remotes } from "../mfe/RemoteMap";
import { Remote } from "../mfe/RemoteTypes";
import { fetchJson } from "../mfe/utils";
import { useLocalStorage } from "./useLocalStorage";


export const useMFE = () => {
  const [_, setStorage] = useLocalStorage<Remote[]>("MFE_REMOTES", []);
  const [state, dispatch] = useContext<[Remote[], React.Dispatch<any>] >(MFEContext);

  useEffect(() => {
    for (const remote of remotes) {
      const { url, scope } = remote;
      fetchJson(url + "/remoteEntries/index.json").then((data) => {
        setStorage((cachedRemotes:Remote[]) => {
          const existScope = cachedRemotes.find(
            (item) => item?.scope === scope
          );

          if (existScope) {
            dispatch({
              type: "UPDATE_REMOTE",
              payload: {
                url,
                scope,
                version: data.includes(existScope.version)
                  ? existScope.version
                  : data[0],
                versions: data,
              },
            });
            return cachedRemotes.map((item) => {
              if (item?.scope === scope) {
                return {
                  ...item,
                  url,
                  scope,
                  version: remote.defaultVersion,
                  versions: data,
                };
              }
              return item;
            });
          }

          dispatch({
            type: "UPDATE_REMOTE",
            payload: { url, scope, version: data[1], versions: data },
          });
          return [
            ...cachedRemotes,
            { url, scope, version: data[1], versions: data },
          ];
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

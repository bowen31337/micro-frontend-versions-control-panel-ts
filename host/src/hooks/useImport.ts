import { useFederatedComponent } from "./useFederatedComponent";

import { useLocalStorage } from "./useLocalStorage";
import { Remote } from "../mfe/RemoteTypes";

export const useImport = (path: string) => {
  if (!path) {
    throw new Error("path is required");
  }
  const [remotes, _] = useLocalStorage<Remote []>("MFE_REMOTES", []);

  const [scope, module] = path.split("/");

  const remote = remotes.find((s:Remote) => s.scope === scope) as unknown as Remote;

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    remote?.url,
    scope,
    `./${module}`,
    remote?.version
  );

  return { FederatedComponent, errorLoading };
};

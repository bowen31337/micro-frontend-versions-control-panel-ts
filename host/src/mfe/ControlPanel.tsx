import { remotes } from "./RemoteMap";
import { VersionSelect } from "./VersionSelect";

import { useMFE } from "../hooks/useMFE";
export const ControlPanel = () => {
  useMFE();

  return (
    <div
      style={{
        border: "2px solid blue",
        width: "600px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h2>This is a control panel </h2>
      <ul>
        {remotes.map(({ scope, url }) => (
          <li key={scope}>
            {scope} : {url} : <VersionSelect scope={scope} /> <button onClick={()=>window.location.reload()} >Load</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

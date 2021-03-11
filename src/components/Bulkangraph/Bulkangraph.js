import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import OrgChart from "./orgChart";

const NewData = [
  {
    id: "1",
    pid: "",
    name: "",
  },
];

function BalkanGraph({ ...props }) {
  const [nodesData, setNodesData] = useState([]);

  useEffect(() => {
    let data = _.cloneDeep(NewData);
    setNodesData(data);
  }, []);

  return (
    <>
      {isToken && (
        <div style={{ height: "100%", overflow: "hidden" }}>
          <OrgChart />
        </div>
      )}
    </>
  );
}

export default BalkanGraph;

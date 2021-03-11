import React, { useState, useEffect } from "react";
import { Button, Select, Input, Radio } from "antd";

const { Option } = Select;

function NodeMenu({ nodeData, onNodeUpdate, onClose, lobList }) {
  const [lobValue, setLobValue] = useState([]);
  const [finalSelectedLob, setFinalSelectedLob] = useState([]);
  const [location, setLocation] = useState("");
  const [approval, setApproval] = useState("No");
  const [approvalForQuote, setApprovalForQuote] = useState("No");
  const [approvalFor, setApprovalFor] = useState("");
  const [levelList, setLevelList] = useState([]);

  useEffect(() => {
    let LobsValue = [];
    if (nodeData && nodeData.lob) {
      nodeData.lob.forEach((item) => {
        LobsValue.push(item.name);
      });
      setLocation(nodeData.locationOfService);
      if (nodeData.approvalRequiredForLead) {
        setApproval("Yes");
      } else {
        setApproval("No");
      }
      if (nodeData.approvalRequiredForQuote) {
        setApprovalForQuote("Yes");
      } else {
        setApprovalForQuote("No");
      }
      setFinalSelectedLob(nodeData.lob);
      setLobValue(LobsValue);
      if (nodeData.level !== "L1") {
        setApprovalFor(nodeData.approvalFor);
      }
      let level = parseInt(nodeData.level.substring(1));
      let Levels = [];
      if (level >= 2) {
        for (let i = 0; i < level - 1; i++) {
          Levels.push(`L${i + 1}`);
        }
        setLevelList(Levels);
      }
    }
  }, [nodeData]);

  const makeLob = (SelectedValues) => {
    let Lobs = [];
    lobList.forEach((item) => {
      if (SelectedValues.find((val) => val === item.name)) {
        Lobs.push(item);
      }
    });
    setFinalSelectedLob(Lobs);
  };

  const handleChange = (value) => {
    console.log("Selected Value", value);
    makeLob(value);
    setLobValue(value);
  };

  const onLocationChange = (value) => {
    setLocation(value);
  };

  const onApprovalChange = (e) => {
    setApproval(e.target.value);
  };

  const onQuoteApproval = (e) => {
    setApprovalForQuote(e.target.value);
  };

  const onUserNodeUpdate = () => {
    let NodeData = nodeData;
    NodeData["locationOfService"] = location;
    NodeData["approvalRequiredForLead"] = approval === "Yes" ? true : false;
    NodeData["approvalRequiredForQuote"] =
      approvalForQuote === "Yes" ? true : false;
    NodeData["approvalFor"] = approvalFor;
    NodeData["lob"] = finalSelectedLob;
    onNodeUpdate(NodeData);
  };

  const handleApprovalForChange = (value) => {
    setApprovalFor(value);
  };

  return (
    <div>
      <div className="node-menu-label">User Name</div>
      <div>{nodeData.userName}</div>
      <div className="node-menu-label" style={{ marginTop: "20px" }}>
        LOB
      </div>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="select lob"
        onChange={handleChange}
        optionLabelProp="label"
        value={lobValue}
      >
        {lobList &&
          lobList.map((item) => (
            <Option key={item.id} value={item.name}>
              {item.name}
            </Option>
          ))}
      </Select>
      <div className="node-menu-label" style={{ marginTop: "20px" }}>
        Location Of Service
      </div>
      <Input
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        style={{ width: "310px" }}
      />

      <div className="node-menu-label" style={{ marginTop: "20px" }}>
        Approval Required For Lead
      </div>
      <Radio.Group onChange={onApprovalChange} value={approval}>
        <Radio value={"Yes"}>Yes</Radio>
        <Radio value={"No"}>No</Radio>
      </Radio.Group>

      <div className="node-menu-label" style={{ marginTop: "20px" }}>
        Approval Required For Quote
      </div>
      <Radio.Group onChange={onQuoteApproval} value={approvalForQuote}>
        <Radio value={"Yes"}>Yes</Radio>
        <Radio value={"No"}>No</Radio>
      </Radio.Group>

      <div className="node-menu-label" style={{ marginTop: "20px" }}>
        Approval For
      </div>
      <Select
        style={{ width: "100%", marginBottom: "100px" }}
        placeholder="Select approval"
        onChange={handleApprovalForChange}
        value={approvalFor}
        disabled={nodeData.level === "L1"}
      >
        {levelList &&
          levelList.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
      </Select>
      <div className="node-menu-button">
        <Button type="primary" onClick={onUserNodeUpdate}>
          Update
        </Button>
        <Button
          type="primary"
          onClick={onClose}
          style={{ marginLeft: "100px" }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default NodeMenu;

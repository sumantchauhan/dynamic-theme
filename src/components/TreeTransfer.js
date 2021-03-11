import React, { useState } from "react";
import { Transfer, Tree } from "antd";

// Customize Table Transfer
const isChecked = (selectedKeys, eventKey) =>
  selectedKeys.indexOf(eventKey) !== -1;

const generateTree = (treeNodes = [], checkedKeys = []) =>
  treeNodes.map(({ children, ...props }) => ({
    ...props,
    disabled: checkedKeys.includes(props.key),
    children: generateTree(children, checkedKeys),
  }));

const dataSource = [
  { key: "0-0", title: "0-0" },
  {
    key: "0-1",
    title: "0-1",
    children: [
      { key: "0-1-0", title: "0-1-0" },
      { key: "0-1-1", title: "0-1-1" },
    ],
  },
  { key: "0-2", title: "0-3" },
];

const TreeTransfer = ({ ...restProps }) => {
  const transferDataSource = [];
  const [targetKeys, setTargetKeys] = useState([]);
  function flatten(list = []) {
    list.forEach((item) => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  flatten(dataSource);

  const onChange = (keys) => {
    setTargetKeys(keys);
  };

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      onChange={onChange}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={(item) => item.title}
      showSelectAll={false}
    >
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === "left") {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              checkStrictly
              defaultExpandAll
              checkedKeys={checkedKeys}
              treeData={generateTree(dataSource, targetKeys)}
              onCheck={(_, { node: { key } }) => {
                onItemSelect(key, !isChecked(checkedKeys, key));
              }}
              onSelect={(_, { node: { key } }) => {
                onItemSelect(key, !isChecked(checkedKeys, key));
              }}
            />
          );
        }
      }}
    </Transfer>
  );
};

export default TreeTransfer;

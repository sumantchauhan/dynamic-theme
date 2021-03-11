import React, { useState, useEffect } from "react";
import { Transfer, Button, Row, Col } from "antd";
import "./TransferList.scss";
import LeftsideItemList from "./LeftsideItemList";

const leftList = [
  {
    id: "xyz1",
    name: "AAAAAAAAAAAAAAAAAAAAA",
    child: [
      {
        id: "ch1",
        pid: "xyz1",
        name: "CHAILD1-AAAAAAA",
      },
      {
        id: "ch2",
        pid: "xyz1",
        name: "CHAILD1-BBBBBBB",
      },
      {
        id: "ch3",
        pid: "xyz1",
        name: "CHAILD1-CCCCCCCC",
      },
      {
        id: "ch4",
        pid: "xyz1",
        name: "CHAILD1-DDDDDDDDD",
      },
      {
        id: "ch5",
        pid: "xyz1",
        name: "CHAILD1-EEEEEEEEEE",
      },
    ],
  },
  {
    id: "xyz2",
    name: "BBBBBBBBBBBBBBBBBBBBB",
    child: [
      {
        id: "ch21",
        pid: "xyz2",
        name: "CHAILD2-AAAAAAAAAAA",
      },
      {
        id: "ch22",
        pid: "xyz2",
        name: "CHAILD2-BBBBBBBBBB",
      },
      {
        id: "ch23",
        pid: "xyz2",
        name: "CHAILD2-CCCCCCCCCC",
      },
      {
        id: "ch24",
        pid: "xyz2",
        name: "CHAILD2-DDDDDDDDDD",
      },
      {
        id: "ch25",
        pid: "xyz2",
        name: "CHAILD2-EEEEEEEEE",
      },
      {
        id: "ch26",
        pid: "xyz2",
        name: "CHAILD2-FFFFFFFF",
      },
    ],
  },
  {
    id: "xyz3",
    name: "CCCCCCCCCCCCCCCCCCCCC",
    child: [
      {
        id: "ch31",
        pid: "xyz3",
        name: "CHAILD3-AAAAAAA",
      },
      {
        id: "ch32",
        pid: "xyz3",
        name: "CHAILD3-BBBBBBB",
      },
      {
        id: "ch33",
        pid: "xyz3",
        name: "CHAILD3-CCCCCCCC",
      },
      {
        id: "ch34",
        pid: "xyz3",
        name: "CHAILD3-DDDDDDDDDD",
      },
      {
        id: "ch35",
        pid: "xyz3",
        name: "CHAILD3-EEEEEEEEE",
      },
    ],
  },
  {
    id: "xyz4",
    name: "DDDDDDDDDDDDDDDDDDDDDD",
    child: [
      {
        id: "ch41",
        pid: "xyz4",
        name: "CHAILD4-AAAAAAAA",
      },
    ],
  },
  {
    id: "xyz5",
    name: "EEEEEEEEEEEEEEEEEEEEEE",
    child: [
      {
        id: "ch51",
        pid: "xyz5",
        name: "CHAILD5-AAAAAAAAAA",
      },
      {
        id: "ch5",
        pid: "xyz5",
        name: "CHAILD5-BBBBBBBBB",
      },
    ],
  },
  {
    id: "xyz6",
    name: "FFFFFFFFFFFFFFFFFFFFFF",
    child: [],
  },
  {
    id: "xyz7",
    name: "GGGGGGGGGGGGGGGGGGGGGG",
    child: [
      {
        id: "ch71",
        pid: "xyz7",
        name: "CHAILD7-AAAAAAAAA",
      },
    ],
  },
  {
    id: "xyz8",
    name: "HHHHHHHHHHHHHHHHHHHHHH",
    child: [],
  },
];

function TransferList() {
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [leftsideItems, setLeftsideItems] = useState(leftList);

  useEffect(() => {
    getMock();
  }, []);

  const getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    setMockData(mockData);
    setTargetKeys(targetKeys);
  };

  const handleChange = (targetKeys) => {
    setTargetKeys(targetKeys);
  };

  const renderFooter = () => (
    <Button
      size="small"
      style={{ float: "right", margin: 5 }}
      onClick={getMock}
    >
      reload
    </Button>
  );

  return (
    <>
      {/* <Transfer
        dataSource={mockData}
        showSearch
        listStyle={{
          width: 350,
          height: 400,
        }}
        operations={["to right", "to left"]}
        targetKeys={targetKeys}
        onChange={handleChange}
        render={(item) => `${item.title}-${item.description}`}
        footer={renderFooter}
      /> */}
      <Row style={{ padding: "10px" }}>
        <Col span={8} style={{ border: "1px solid gray", padding: "10px" }}>
          <LeftsideItemList itemList={leftsideItems} />
        </Col>
        <Col span={4}>---</Col>
        <Col span={8} style={{ border: "1px solid gray", padding: "10px" }}>
          col-6 col-pull-18
        </Col>
      </Row>
    </>
  );
}

export default TransferList;

import React from "react";
import { Collapse, Checkbox, Divider, Row, Col } from "antd";

const { Panel } = Collapse;

function LeftsideItemList({ itemList }) {
  const [checkAll, setCheckAll] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkedList, setCheckedList] = React.useState([]);
  const [plainOptions, setPlainOptions] = React.useState([]);

  const genExtra = ({ item }) => (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <Checkbox
        onChange={(e) => onChange(e, item)}
        checked={checkedList.includes(item.id)}
      ></Checkbox>
    </div>
  );

  React.useEffect(() => {
    if (checkedList.length === 0) {
      setIndeterminate(false);
    }
  }, [checkedList]);

  const onChange = async (e, item) => {
    let CheckedList = [...checkedList];
    if (CheckedList.length > 0) {
      if (CheckedList.includes(item.id)) {
        for (let i = 0; i < CheckedList.length; i++) {
          if (CheckedList[i] === item.id) {
            CheckedList.splice(i, 1);
            break;
          }
        }
        setCheckedList([...CheckedList]);
      } else {
        CheckedList.push(item.id);
        setCheckedList([...CheckedList]);
      }
    } else {
      let checkedItem = [item.id];
      setCheckedList([...checkedItem]);
      setIndeterminate(true);
    }
  };

  const onCheckAllChange = (e) => {
    if (e.target.checked) {
      let CheckedItem = [];
      itemList.forEach((item) => CheckedItem.push(item.id));
      setCheckedList([...CheckedItem]);
    } else {
      setCheckedList([]);
    }
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onChildChange = (e, child) => {};

  return (
    <>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </Checkbox>
      <Divider />
      <Collapse accordion>
        {itemList &&
          itemList.map((item) => (
            <Panel key={item.id} header={item.name} extra={genExtra({ item })}>
              <>
                {item.child.length > 0 &&
                  item.child.map((child) => (
                    <div key={child.id}>
                      <Row>
                        <Col span={20}> {child.name}</Col>
                        <Col span={4}>
                          <Checkbox
                            onChange={(e) => onChildChange(e, child)}
                          ></Checkbox>
                        </Col>
                      </Row>
                    </div>
                  ))}
              </>
            </Panel>
          ))}
      </Collapse>
    </>
  );
}

export default LeftsideItemList;

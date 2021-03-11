import React, { useState, useEffect, useRef } from "react";
import OrgChart from "@balkangraph/orgchart.js";
import { useHistory } from "react-router-dom";
import NodeMenu from "./NodeMenu";
import { Drawer, Select } from "antd";

const { Option } = Select;

let NodeData = [
  {
    id: "directors",
    name: "Directors",
    tags: ["directors-group", "group"],
    description: "Top Management",
  },
  {
    id: "devs",
    name: "Dev Team",
    pid: "directors",
    tags: ["devs-group", "group"],
    description: "Research and Development",
  },
  {
    id: "sales",
    name: "Sales Team",
    pid: "directors",
    tags: ["sales-group", "group"],
    description: "Sales and Marketing",
  },
  {
    id: 1,
    stpid: "directors",
    name: "Billy Moore",
    title: "CEO",
    img: "https://cdn.balkan.app/shared/2.jpg",
  },
  {
    id: 2,
    stpid: "directors",
    name: "Marley Wilson",
    title: "Director",
    img: "https://cdn.balkan.app/shared/3.jpg",
  },
  {
    id: 3,
    stpid: "directors",
    name: "Bennie Shelton",
    title: "Shareholder",
    img: "https://cdn.balkan.app/shared/4.jpg",
  },
  {
    id: "hrs",
    pid: "directors",
    name: "HR Team",
    tags: ["hrs-group", "group"],
    description: "Human Resource | London",
  },
  {
    id: 5,
    stpid: "hrs",
    name: "Glenn Bell",
    title: "HR",
    img: "https://cdn.balkan.app/shared/10.jpg",
  },
  {
    id: 6,
    stpid: "hrs",
    name: "Marcel Brooks",
    title: "HR",
    img: "https://cdn.balkan.app/shared/11.jpg",
  },
  {
    id: 7,
    stpid: "hrs",
    name: "Maxwell Bates",
    title: "HR",
    img: "https://cdn.balkan.app/shared/12.jpg",
  },
  {
    id: 8,
    stpid: "hrs",
    name: "Asher Watts",
    title: "Junior HR",
    img: "https://cdn.balkan.app/shared/13.jpg",
  },
  {
    id: 10,
    stpid: "devs",
    name: "Jordan Harris",
    title: "JS Developer",
    img: "https://cdn.balkan.app/shared/6.jpg",
  },
  {
    id: 11,
    stpid: "devs",
    name: "Will Woods",
    title: "JS Developer",
    img: "https://cdn.balkan.app/shared/7.jpg",
  },
  {
    id: 12,
    stpid: "devs",
    name: "Skylar Parrish",
    title: "node.js Developer",
    img: "https://cdn.balkan.app/shared/8.jpg",
  },
  {
    id: 13,
    stpid: "devs",
    name: "Ashton Koch",
    title: "C# Developer",
    img: "https://cdn.balkan.app/shared/9.jpg",
  },
  {
    id: 14,
    stpid: "sales",
    name: "Bret Fraser",
    title: "Sales",
    img: "https://cdn.balkan.app/shared/13.jpg",
  },
  {
    id: 15,
    stpid: "sales",
    name: "Steff Haley",
    title: "Sales",
    img: "https://cdn.balkan.app/shared/14.jpg",
  },
];

window.onload = function () {
  // Template node info for ula
  OrgChart.templates.ula.name = `<text width="145"
       style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="#4d4d4d" x="99" y="25" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.ula.title = `<text width="145"
       style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="#4d4d4d" x="99" y="50" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.ula.level = `<text width="145"
       style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="#4d4d4d" x="99" y="75" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.ula.locationOfService = `<text width="145"
       style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
        fill="#4d4d4d" x="99" y="100" ><tspan>{val}</tspan></text>`;

  // Template node info for diva
  OrgChart.templates.diva.userName = `<text width="145"
       style="font-size: 15px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="white" x="10" y="115" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.diva.roleName = `<text width="145"
       style="font-size: 15px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="white" x="10" y="135" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.diva.level = `<text width="145"
       style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="white" x="175" y="100" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.diva.locationOfService = `<text width="145"
       style="font-size: 15px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
        fill="white" x="10" y="155" ><tspan>{val}</tspan></text>`;

  // Template node info for luba
  OrgChart.templates.luba.userName = `<text width="145"
       style="font-size: 15px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="white" x="100" y="20" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.luba.roleName = `<text width="145"
       style="font-size: 15px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="white" x="100" y="40" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.luba.level = `<text width="145"
       style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="white" x="100" y="60" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.luba.locationOfService = `<text width="145"
       style="font-size: 15px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
        fill="white" x="100" y="80" ><tspan>{val}</tspan></text>`;

  // Template node info for polina

  OrgChart.templates.polina.userName = `<text width="145"
  style="font-size: 15px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
  fill="white" x="90" y="20" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.polina.roleName = `<text width="145"
  style="font-size: 15px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
  fill="white" x="90" y="40" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.polina.level = `<text width="145"
  style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
  fill="white" x="250" y="20" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.polina.locationOfService = `<text width="145"
  style="font-size: 15px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
   fill="white" x="90" y="60" ><tspan>{val}</tspan></text>`;

  // Template node info for rony

  OrgChart.templates.rony.userName = `<text width="145"
       style="font-size: 15px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="#4d4d4d" x="10" y="20" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.rony.roleName = `<text width="145"
       style="font-size: 15px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="#4d4d4d" x="10" y="40" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.rony.level = `<text width="145"
       style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="#4d4d4d" x="10" y="60" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.rony.locationOfService = `<text width="145"
       style="font-size: 15px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
        fill="#4d4d4d" x="10" y="80" ><tspan>{val}</tspan></text>`;

  // Template node info for ana

  OrgChart.templates.ana.userName = `<text width="145"
       style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="white" x="99" y="25" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.ana.roleName = `<text width="145"
       style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="white" x="99" y="50" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.ana.level = `<text width="145"
       style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
       fill="white" x="99" y="75" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.ana.locationOfService = `<text width="145"
       style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
        fill="white" x="99" y="100" ><tspan>{val}</tspan></text>`;

  // Template node info for olivia
  OrgChart.templates.ana.userName = `<text width="145"
  style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
  fill="white" x="99" y="25" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.ana.roleName = `<text width="145"
  style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
  fill="white" x="99" y="50" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.ana.level = `<text width="145"
  style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
  fill="white" x="99" y="75" ><tspan>{val}</tspan></text>`;
  OrgChart.templates.ana.locationOfService = `<text width="145"
  style="font-size: 16px;font-family: Helvetica;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
   fill="white" x="99" y="100" ><tspan>{val}</tspan></text>`;
};

const GraphOrg = ({ ...props }) => {
  const history = useHistory();
  const divRef = useRef(null);
  const [nodes, setUserNodes] = useState([]);
  const [lobList, setLobList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [nodeData, setNodeData] = useState({});
  const [orgChart, setOrgChart] = useState("");
  const [templateType, setTemplateType] = useState("olivia");

  useEffect(() => {
    let chart = new OrgChart(divRef.current, {
      nodes: NodeData,
      template: templateType,
      nodeMouseClick: OrgChart.action.edit,
      mouseScrool: OrgChart.action.scroll,
      // layout: OrgChart.tree,
      layout: OrgChart.mixed,
      align: OrgChart.ORIENTATION,
      enableSearch: true,
      enableDragDrop: true,
      nodeMenu: {
        add: { text: "Create User" },
        // edit: { text: "Edit" },
        // remove: { text: "Remove" },
      },
      toolbar: { zoom: true },
      nodeBinding: {
        name: "name",
        title: "title",
        level: "level",
        locationOfService: "locationOfService",
        // lob: "lob",
        img_0: "img",
      },
    });

    setOrgChart(chart);

    chart.on("add", function (sender, node) {
      //   history.push({
      //     pathname: `${config.basePath}userCreation`,
      //     state: {
      //       nodeData: node,
      //     },
      //   });
    });

    chart.on("click", function (sender, args) {
      let details = chart.get(args.node.id);
      setNodeData(details);
      setVisible(true);
    });
  }, [nodes, templateType]);

  const onNodeUpdate = (updatedValue) => {};

  const onClose = () => {
    setVisible(false);
    // getUserHierarchy().then((resp) => {
    //   if (orgChart) {
    //     orgChart.update(resp);
    //   }
    // });
  };

  const onTemplateChange = (value) => {
    setTemplateType(value);
  };

  return (
    <>
      <div className="template-selection">
        <div className="template">Template</div>
        <Select
          style={{ width: 200 }}
          placeholder="Select a template"
          onChange={onTemplateChange}
          value={templateType}
        >
          <Option value="ula">ula</Option>
          <Option value="luba">luba</Option>
          <Option value="diva">diva</Option>
          <Option value="polina">polina</Option>
          <Option value="rony">rony</Option>
          <Option value="ana">ana</Option>
        </Select>
      </div>
      <div id="tree" ref={divRef}></div>
      <Drawer
        className="node-menu-container"
        title=" "
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width="360"
        maskClosable={false}
        destroyOnClose={true}
      >
        <NodeMenu
          nodeData={nodeData}
          onNodeUpdate={onNodeUpdate}
          onClose={onClose}
          lobList={lobList}
        />
      </Drawer>
    </>
  );
};

export default GraphOrg;

import React, { useState, useEffect, useRef } from "react";
import OrgChart from "@balkangraph/orgchart.js";

const Nodes = [
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

window.onload = () => {
  OrgChart.templates.group.link =
    '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}" />';
  OrgChart.templates.group.nodeMenuButton = "";
  OrgChart.templates.group.min = Object.assign({}, OrgChart.templates.group);
  OrgChart.templates.group.min.imgs = "{val}";
  OrgChart.templates.group.min.description =
    '<text width="230" text-overflow="multiline" style="font-size: 14px;" fill="#aeaeae" x="125" y="100" text-anchor="middle">{val}</text>';
};

const GroupHierarchy = () => {
  const nodesRef = useRef(null);
  useEffect(() => {
    let chart = new OrgChart(nodesRef.current, {
      template: "olivia",
      nodes: Nodes,
      enableDragDrop: true,
      mouseScrool: OrgChart.action.scroll,
      nodeMouseClick: OrgChart.action.edit,
      nodeMenu: {
        details: { text: "Details" },
        edit: { text: "Edit" },
        add: { text: "Add" },
        remove: { text: "Remove" },
      },
      dragDropMenu: {
        addInGroup: { text: "Add in group" },
        addAsChild: { text: "Add as child" },
      },
      nodeBinding: {
        imgs: function (sender, node) {
          if (node.min) {
            var val = "";
            var count =
              node.stChildrenIds.length > 5 ? 5 : node.stChildrenIds.length;
            var x = node.w / 2 - (count * 32) / 2;

            for (var i = 0; i < count; i++) {
              var data = sender.get(node.stChildrenIds[i]);
              val +=
                '<image xlink:href="' +
                data.img +
                '" x="' +
                (x + i * 32) +
                '" y="45" width="32" height="32" ></image>';
            }
            return val;
          }
        },
        description: "description",
        field_0: "name",
        field_1: "title",
        img_0: "img",
      },
      tags: {
        group: {
          template: "group",
        },
        "devs-group": {
          subTreeConfig: {
            columns: 2,
          },
        },
        "sales-group": {
          subTreeConfig: {
            columns: 1,
          },
        },
        "hrs-group": {
          min: true,
          subTreeConfig: {
            columns: 2,
          },
        },
      },
    });

    chart.on("click", function (sender, args) {
      if (args.node.tags.indexOf("group") != -1) {
        if (args.node.min) {
          sender.maximize(args.node.id);
        } else {
          sender.minimize(args.node.id);
        }
      }
      return false;
    });

    chart.on("drop", function (sender, draggedNodeId, droppedNodeId) {
      var draggedNode = sender.getNode(draggedNodeId);
      var droppedNode = sender.getNode(droppedNodeId);

      if (
        droppedNode.tags.indexOf("group") != -1 &&
        draggedNode.tags.indexOf("group") == -1
      ) {
        var draggedNodeData = sender.get(draggedNode.id);
        draggedNodeData.pid = null;
        draggedNodeData.stpid = droppedNode.id;
        sender.updateNode(draggedNodeData);
        return false;
      }
    });
  }, []);

  return <div id="tree" ref={nodesRef}></div>;
};

export default GroupHierarchy;

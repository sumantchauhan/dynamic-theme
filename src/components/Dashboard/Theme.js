import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import { Menu, Dropdown } from "antd";
import colors from "../../Assets/colors";

const Theme = ({ onThemeChange }) => {
  const menu = (
    <Menu className="theme-menu">
      <Menu.Item key="0" onClick={() => onMenuClick(colors.primaryDark)}>
        <div
          className="theme-selector"
          style={{ background: colors.primaryDark }}
        ></div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={() => onMenuClick(colors.backgroundLight)}>
        <div
          className="theme-selector"
          style={{ background: colors.backgroundLight }}
        ></div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={() => onMenuClick(colors.gray)}>
        <div
          className="theme-selector"
          style={{ background: colors.gray }}
        ></div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={() => onMenuClick(colors.black)}>
        <div
          className="theme-selector"
          style={{ background: colors.black }}
        ></div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" onClick={() => onMenuClick(colors.indigo)}>
        <div
          className="theme-selector"
          style={{ background: colors.indigo }}
        ></div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5" onClick={() => onMenuClick(colors.orange)}>
        <div
          className="theme-selector"
          style={{ background: colors.orange }}
        ></div>
      </Menu.Item>
    </Menu>
  );

  const onMenuClick = (themeColor) => {
    onThemeChange(themeColor);
  };

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <div onClick={(e) => e.preventDefault()}>
          <SettingsIcon style={{ marginTop: "5px" }} />
        </div>
      </Dropdown>
    </>
  );
};

export default Theme;

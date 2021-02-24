import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";

const DashboardDrawerMenu = ({ iconColor }) => {
  return (
    <List>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon style={{ color: iconColor }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon style={{ color: iconColor }} />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon style={{ color: iconColor }} />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon style={{ color: iconColor }} />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon style={{ color: iconColor }} />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon style={{ color: iconColor }} />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon style={{ color: iconColor }} />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon style={{ color: iconColor }} />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItem>
    </List>
  );
};

export default DashboardDrawerMenu;

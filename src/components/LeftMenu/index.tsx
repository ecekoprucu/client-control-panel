import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Divider, Drawer, List, ListItem } from "@mui/material";
import { Logout as LogoutIcon, Home as HomeIcon } from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_APP, ROUTE_DASHBOARD } from "@/router/routes";

import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/authSlice";

export const LeftMenu = () => {
  const theme = useTheme();

  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { pathname } = location;

  return (
    <Drawer
      sx={{
        width: theme.leftMenu?.width ?? 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: theme.leftMenu?.width ?? 0,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem>
          <ListItemButton
            onClick={() => navigate(`${ROUTE_APP}/${ROUTE_DASHBOARD}`)}
            selected={pathname === `${ROUTE_APP}/${ROUTE_DASHBOARD}`}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton onClick={() => dispatch(logout())}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

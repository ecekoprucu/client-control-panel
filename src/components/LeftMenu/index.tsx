import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Divider, Drawer, List, ListItem } from "@mui/material";
import { Logout as LogoutIcon, Home as HomeIcon } from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_APP } from "@/router/routes";

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
          backgroundColor: "#f7f7f7",
          justifyContent: "space-between",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem>
          <ListItemButton
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#fff",
                border: "1px solid gray",
                borderRadius: 4,

                "&:hover": {
                  backgroundColor: "#ebebeb",
                },
              },
            }}
            onClick={() => navigate(`${ROUTE_APP}`)}
            selected={pathname === `${ROUTE_APP}`}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        <Divider />
        <ListItem>
          <ListItemButton
            sx={{
              "&:hover": {
                backgroundColor: "#ebebeb",
                borderRadius: 4,
              },
            }}
            onClick={() => dispatch(logout())}
          >
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

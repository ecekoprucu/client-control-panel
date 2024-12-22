import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Divider, Drawer, List, ListItem } from "@mui/material";
import {
  Logout as LogoutIcon,
  Home as HomeIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_APP, ROUTE_CLIENTS } from "@/router/routes";

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
              borderRadius: 4,
              "&.Mui-selected": {
                backgroundColor: "#fff",
                boxShadow: 2,
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
        <ListItem>
          <ListItemButton
            sx={{
              borderRadius: 4,
              "&.Mui-selected": {
                backgroundColor: "#fff",
                boxShadow: 2,
                borderRadius: 4,

                "&:hover": {
                  backgroundColor: "#ebebeb",
                },
              },
            }}
            onClick={() => navigate(`${ROUTE_CLIENTS}`)}
            selected={pathname === `${ROUTE_APP}/${ROUTE_CLIENTS}`}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText>Clients</ListItemText>
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

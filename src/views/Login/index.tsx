// Components
import { TextInput } from "@/components/TextInput";
// MUI
import { Box, Button, Grid2, Typography, useTheme } from "@mui/material";
// React
import { useCallback, useState } from "react";
// Redux
import { useDispatch } from "react-redux";
import { login as redux_login } from "@/redux/slice/authSlice";
// Enums
import { ENUM_LOADING_TYPES } from "@/enums/loadingTypes";

export const LoginPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [loadingState, setLoadingState] = useState(
    ENUM_LOADING_TYPES.ENUM_IDLE
  );

  const theme = useTheme();

  const dispatch = useDispatch();

  const handleLogin = useCallback(() => {
    setLoadingState(ENUM_LOADING_TYPES.ENUM_PENDING);
    dispatch(redux_login(userInfo));
    const timeout = setTimeout(() => {
      setLoadingState(ENUM_LOADING_TYPES.ENUM_SUCCESS);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [userInfo, dispatch]);

  return (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      bgcolor={theme.palette.background.paper}
    >
      <Grid2 container width="100%">
        <Grid2 bgcolor="primary.main" size={{ xs: 12, md: 6, lg: 8 }} />
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="100%"
            justifyContent="center"
          >
            <Typography color={theme.palette.primary.main} mb={2} variant="h3">
              Login
            </Typography>
            <Box display="flex" width="50%" flexDirection="column" gap={2}>
              <TextInput
                fullWidth
                title="Email"
                value={userInfo.email}
                onChange={(value) => setUserInfo({ ...userInfo, email: value })}
                placeholder="Please enter your email"
              />
              <TextInput
                fullWidth
                title="Password"
                value={userInfo.password}
                type="password"
                onChange={(value) =>
                  setUserInfo({ ...userInfo, password: value })
                }
                placeholder="Please enter your password"
              />
              <Button
                onClick={handleLogin}
                fullWidth
                variant="contained"
                color="primary"
                disabled={loadingState === ENUM_LOADING_TYPES.ENUM_PENDING}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

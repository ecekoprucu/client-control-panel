import { LeftMenu } from "@/components/LeftMenu";

import { Box, Breadcrumbs, Link, Stack, useTheme } from "@mui/material";
import _ from "lodash";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

type AppWrapperProps = {
  children: ReactNode;
};

export const AppWrapper = ({ children }: AppWrapperProps) => {
  const theme = useTheme();

  const location = useLocation();

  const { pathname } = location;
  const segments = pathname.split("/");

  return (
    <Box bgcolor="#f7f7f7" width="100vw" height="100vh" p={2}>
      <Stack direction={"row"}>
        {/* Left Menu */}
        <LeftMenu />
        <Stack width={`calc(100% - ${theme?.leftMenu?.width ?? 0})`}>
          <Breadcrumbs aria-label="breadcrumb">
            {segments.map((segment, index) => {
              return (
                <Link href={`${segment}`} key={index}>
                  {segment === "" ? "Home" : _.capitalize(segment)}
                </Link>
              );
            })}
          </Breadcrumbs>
          {children}
        </Stack>
      </Stack>
    </Box>
  );
};

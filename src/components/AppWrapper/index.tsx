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
        <Stack width={`calc(100% - ${theme?.leftMenu?.width ?? 0}px)`}>
          <Breadcrumbs
            sx={{
              px: 3,
            }}
            aria-label="breadcrumb"
          >
            {segments.map((segment, index) => {
              return (
                <Link
                  color={
                    index === segments.length - 1 ? "primary" : "textDisabled"
                  }
                  href={`/${segment}`}
                  sx={{
                    textDecoration: "none",
                  }}
                  key={index}
                >
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

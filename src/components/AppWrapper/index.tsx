import { LeftMenu } from "@/components/LeftMenu";
import { Box, Stack, useTheme } from "@mui/material";
import { ReactNode } from "react";

type AppWrapperProps = {
  children: ReactNode;
};

export const AppWrapper = ({ children }: AppWrapperProps) => {
  const theme = useTheme();

  return (
    <Box bgcolor="#f7f7f7" p={2}>
      <Stack direction={"row"}>
        {/* Left Menu */}
        <LeftMenu />
        <Stack width={`calc(100% - ${theme?.leftMenu?.width ?? 0})`}>
          {children}
        </Stack>
      </Stack>
    </Box>
  );
};

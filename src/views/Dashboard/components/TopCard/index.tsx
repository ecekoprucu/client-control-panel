import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

type TopCard = {
  title: string;
  count: number;
  info: number;
};

export const TopCard = ({ title, count, info }: TopCard) => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <Box
      border={1}
      minWidth={isSmallScreen ? 150 : 200}
      px={1.5}
      py={1.5}
      borderColor="#cbcbcb"
      borderRadius={2}
      height="100%"
    >
      <Typography color="#7b7777">{title}</Typography>
      <Typography fontWeight={600} fontSize="2rem" color="black">
        {Math.round(count)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
      </Typography>
      <Typography fontSize="0.85rem" color="gray">
        {title}: <b>{info} days</b>
      </Typography>
    </Box>
  );
};

import { Box, Typography } from "@mui/material";

type TopCard = {
  title: string;
  count: number;
  info: number;
};

export const TopCard = ({ title, count, info }: TopCard) => {
  return (
    <Box
      border={1}
      minWidth={250}
      px={1.5}
      py={1.5}
      borderColor="#cbcbcb"
      borderRadius={2}
    >
      <Typography color="#7b7777">{title}</Typography>
      <Typography fontWeight={600} fontSize="2rem" color="black">
        {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
      </Typography>
      <Typography fontSize="0.85rem" color="gray">
        {title}: <b>{info} days</b>
      </Typography>
    </Box>
  );
};

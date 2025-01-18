import { Calendar } from "@/views/Dashboard/components/Calendar";
import { Chart } from "@/views/Dashboard/components/Chart";
import { TopCard } from "@/views/Dashboard/components/TopCard";
import { Box, Grid2, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <Box
      m={2}
      bgcolor="#fff"
      border={1}
      borderColor="#cbcbcb"
      p={3}
      borderRadius={2}
    >
      <Typography variant="h3">{t("menu.dashboard")}</Typography>
      <Box display="flex" gap={2}>
        <Box width="50%">
          <Box display="flex" my={3}>
            <Grid2 container spacing={1}>
              <Grid2 size={{ md: 6, lg: 4 }}>
                <TopCard title="Booking" count={1200} info={50} />
              </Grid2>
              <Grid2 size={{ md: 6, lg: 4 }}>
                <TopCard title="Check In" count={500} info={50} />
              </Grid2>
              <Grid2 size={{ md: 6, lg: 4 }}>
                <TopCard title="Check Out" count={20000} info={500} />
              </Grid2>
            </Grid2>
          </Box>
          <Box>
            <Chart />
          </Box>
        </Box>
        <Box width="50%">
          <Calendar />
        </Box>
      </Box>
    </Box>
  );
};

import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, Add } from "@mui/icons-material";

const WeeklyMachinePlan = () => {
  const { i18n } = useTranslation();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);

  const selectedTime = useMemo(
    () => new Date(selectedDate.setHours(selectedHour, 0, 0, 0)),
    [selectedDate, selectedHour]
  );
  const datesArray = useMemo(() => {
    const selectedDay = selectedDate.getDay();

    const closestMonday = new Date(selectedDate);
    closestMonday.setDate(
      selectedDate.getDate() - (selectedDay === 0 ? 6 : selectedDay - 1)
    );

    const weekArray = Array.from({ length: 7 }).map((_, index) => {
      const day = new Date(closestMonday);
      day.setDate(closestMonday.getDate() + index);
      return day;
    });

    return weekArray;
  }, [selectedDate]);
  const currentWeekText = useMemo(() => {
    const firstDay = datesArray[0];
    const lastDay = datesArray[6];

    return `${firstDay.toLocaleDateString(i18n.language, {
      day: "numeric",
    })} ${firstDay.toLocaleDateString(i18n.language, {
      month: "short",
    })} ${firstDay.toLocaleDateString(i18n.language, {
      year: "numeric",
    })} - ${lastDay.toLocaleDateString(i18n.language, {
      day: "numeric",
    })} ${lastDay.toLocaleDateString(i18n.language, {
      month: "short",
    })} ${lastDay.toLocaleDateString(i18n.language, {
      year: "numeric",
    })} `;
  }, [datesArray, i18n.language]);

  const changeSelectedWeek = useCallback((direction) => {
    setSelectedDate((prevSelectedDate) => {
      const newDate = new Date(prevSelectedDate);

      if (direction === "next") {
        newDate.setDate(prevSelectedDate.getDate() + 7);
      } else if (direction === "prev") {
        newDate.setDate(prevSelectedDate.getDate() - 7);
      }

      return newDate;
    });
  }, []);

  return (
    <>
      <Typography mb={2} fontSize="1.75rem" color="#101010" fontWeight={700}>
        Weekly Plan
      </Typography>
      <Box
        borderRadius={2}
        px={5}
        py={4}
        borderTop={1}
        borderRight={1}
        borderColor="#F7F7F9"
        bgcolor="#FEFEFE"
        boxShadow="7.2px 7.2px 64.8px 0px #0000000D"
        display="flex"
        flexDirection="column"
      >
        <Grid mb={2} container spacing={1}>
          <Grid item xs={12}>
            <Box
              display="flex"
              mb={2}
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Box alignItems="center" gap={2} display="flex">
                <Typography
                  fontSize="1.125rem"
                  color="#101010"
                  fontWeight={700}
                >
                  Weekly Machine Plan
                </Typography>
                <Box
                  bgcolor="mainColors.lightBlue"
                  py={0.5}
                  px={1}
                  borderRadius={4}
                >
                  <Typography
                    color="mainColors.linkBlue"
                    fontSize="0.75rem"
                    fontWeight={500}
                  >
                    124 active machine
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{
                  backgroundColor: "#539883",
                  borderRadius: 2,
                }}
              >
                Create Work Order
              </Button>
            </Box>
            <Box display="flex" gap={3}>
              <Box display="flex" gap={0.5}>
                <ButtonBase onClick={() => changeSelectedWeek("prev")}>
                  <ChevronLeft
                    fontSize="medium"
                    sx={{
                      color: "#888888",
                    }}
                  />
                </ButtonBase>
                <ButtonBase onClick={() => changeSelectedWeek("next")}>
                  <ChevronRight
                    fontSize="medium"
                    sx={{
                      color: "#888888",
                    }}
                  />
                </ButtonBase>
              </Box>
              <Box alignItems="center" gap={1} display="flex">
                <Typography fontSize="1.75rem" color="#515151" fontWeight={700}>
                  This Week:
                </Typography>
                <Typography
                  fontSize="1.625rem"
                  color="#515151"
                  fontWeight={400}
                >
                  {currentWeekText}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={0.5} pb={1}></Grid>
          {datesArray.map((date, index) => (
            <Grid
              key={index}
              pb={2}
              borderBottom="1px solid #EBEBEB"
              item
              xs={11.5 / 7}
            >
              <Box display="flex" justifyContent="center">
                <Box
                  py={1}
                  px={2}
                  borderRadius="50%"
                  bgcolor={
                    isSameDay(new Date(), date) ? "#539883" : "transparent"
                  }
                >
                  <Typography
                    fontSize="0.551rem"
                    textAlign="center"
                    fontWeight={500}
                    color={isSameDay(new Date(), date) ? "#FFF" : "#222222"}
                  >
                    {date.toLocaleDateString(i18n.language, {
                      weekday: "short",
                    })}
                  </Typography>
                  <Typography
                    fontSize="1.225rem"
                    textAlign="center"
                    fontWeight={700}
                    color={isSameDay(new Date(), date) ? "#FFF" : "#222222"}
                  >
                    {date.toLocaleDateString(i18n.language, {
                      day: "numeric",
                    })}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid container maxHeight="40vh" overflow="auto" spacing={0}>
          <Grid item xs={0.5}>
            <Box display="flex" flexDirection="column">
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={24.95}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  1AM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  2AM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  3AM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  4AM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  5AM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  6AM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  4AM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  7AM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  8AM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  9AM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  10AM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  11AM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="blue"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  Noon
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  1PM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  2PM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  3PM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  4PM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  5PM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  6PM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  7PM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  8PM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  9PM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  10PM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="GrayText"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  11PM
                </Typography>
              </Box>
              <Box
                position="relative"
                borderBottom={1}
                borderColor="transparent"
                height={49.9}
              >
                <Typography
                  color="blue"
                  position="absolute"
                  fontSize="0.5rem"
                  bottom={-5}
                >
                  Night
                </Typography>
              </Box>
            </Box>
          </Grid>
          {datesArray.map((_, index) => (
            <Grid
              sx={{
                cursor: "pointer",
              }}
              key={index}
              item
              xs={11.5 / 7}
            >
              <Box
                borderTop={0}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={24.95}
              >
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
                borderBottom="0.3px solid #ACACAC"
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderColor="#EBEBEB"
                height={49.9}
                borderBottom="0.3px solid #ACACAC"
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
                <ButtonBase />
              </Box>
              <Box
                borderTop={1}
                borderLeft={index === 0 ? 1 : 0}
                borderRight={1}
                borderBottom={1}
                borderColor="#EBEBEB"
              >
                <ButtonBase />
                <Divider
                  sx={{
                    borderColor: "#EBEBEB",
                    opacity: 0.4,
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default WeeklyMachinePlan;

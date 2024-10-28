// MUI
import { Box, Button, ButtonBase, Grid, Typography } from "@mui/material";
// React
import { useCallback, useMemo, useState } from "react";
// Helpers
import { useTranslation } from "react-i18next";
import {
  isSameDay,
  differenceInMinutes,
  areIntervalsOverlapping,
  isBefore,
} from "date-fns";
import { v4 as uuidv4 } from "uuid";
import lodash from "lodash";
import { isEventInBoxTimeSlot } from "@/views/Machines/WeeklyMachinePlan/helpers/isEventInBoxTimeslot";
import { isEventStartingInThisBox } from "@/views/Machines/WeeklyMachinePlan/helpers/isEventStartingInThisBox";
// Icons
import { ChevronLeft, ChevronRight, Add } from "@mui/icons-material";

const WeeklyMachinePlan = () => {
  const { i18n, t } = useTranslation();

  const [baseDate, setBaseDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const datesArray = useMemo(() => {
    const selectedDay = baseDate.getDay();

    const closestMonday = new Date(baseDate);
    closestMonday.setDate(
      baseDate.getDate() - (selectedDay === 0 ? 6 : selectedDay - 1)
    );

    const weekArray = Array.from({ length: 7 }).map((_, index) => {
      const day = new Date(closestMonday);
      day.setDate(closestMonday.getDate() + index);
      return day;
    });

    return weekArray;
  }, [baseDate]);
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
  const colorArray = useMemo(
    () => [
      "#FF0000",
      "#FFA500",
      "#FFFF00",
      "#008000",
      "#0000FF",
      "#4B0082",
      "#EE82EE",
      "#FF1493",
      "#FF4500",
      "#FFD700",
      "#00FF00",
      "#00FFFF",
    ],
    []
  );

  const hours = useMemo(() => Array.from({ length: 24 }), []);

  const changeSelectedWeek = useCallback((direction) => {
    setBaseDate((prevBaseDate) => {
      const newDate = new Date(prevBaseDate);

      if (direction === "next") {
        newDate.setDate(prevBaseDate.getDate() + 7);
      } else if (direction === "prev") {
        newDate.setDate(prevBaseDate.getDate() - 7);
      }

      return newDate;
    });
  }, []);
  const handleSelectDateAndTime = useCallback(
    (dateIndex, hourIndex, timeSlot) => {
      // Calculate start time
      const startTime = new Date(dateIndex);
      startTime.setHours(hourIndex, timeSlot, 0, 0);

      // Calculate end time by adding 45 minutes to the start time
      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + 45);

      // Add the event to the state
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          id: uuidv4(),
          startTime,
          endTime,
          title: "Event",
          description: "Event description",
          color: colorArray[Math.floor(Math.random() * colorArray.length)],
        },
      ]);
    },
    [colorArray]
  );
  const getOverlappingEvents = useCallback((events) => {
    events.sort((a, b) => a.startTime - b.startTime);

    const overlappedGroups = [];
    let currentGroup = [];

    events.forEach((event, index) => {
      if (
        currentGroup.length === 0 ||
        isBefore(event.startTime, currentGroup[currentGroup.length - 1].endTime)
      ) {
        currentGroup.push(event);
      } else {
        overlappedGroups.push([...currentGroup]);
        currentGroup = [event];
      }

      if (index === events.length - 1) {
        overlappedGroups.push([...currentGroup]);
      }
    });

    return overlappedGroups;
  }, []);

  return (
    <>
      <Typography mb={2} fontSize="1.75rem" color="#101010" fontWeight={700}>
        {t("Machines.weeklyPlan.title")}
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
                  {t("Machines.weeklyPlan.subHeader")}
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
                    124 {t("Machines.weeklyPlan.chip")}
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
                {t("table.create_work_order")}
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
                  {t("Machines.weeklyPlan.thisWeek")}
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
              {hours.map((_, index) => {
                if (index === 0 || index === 12) {
                  return (
                    <Box
                      key={index}
                      position="relative"
                      borderBottom={1}
                      borderColor="transparent"
                      height={50}
                    >
                      <Typography
                        color="#016BB8"
                        position="absolute"
                        fontSize="0.5rem"
                        top={0}
                      >
                        {t(`Machines.weeklyPlan.hours.${index}`)}
                      </Typography>
                    </Box>
                  );
                } else {
                  return (
                    <Box
                      key={index}
                      position="relative"
                      borderBottom={1}
                      borderColor="transparent"
                      height={50}
                    >
                      <Typography
                        color="GrayText"
                        position="absolute"
                        fontSize="0.5rem"
                        top={0}
                      >
                        {t(`Machines.weeklyPlan.hours.${index}`)}
                      </Typography>
                    </Box>
                  );
                }
              })}
            </Box>
          </Grid>
          {datesArray.map((date, index) => (
            <Grid key={index} item xs={11.5 / 7}>
              {hours.map((_, innerIndex) => {
                const timeSlotStart = new Date(date);
                timeSlotStart.setHours(innerIndex, 0, 0, 0);

                const timeSlotEnd = new Date(timeSlotStart);
                timeSlotEnd.setHours(innerIndex + 1, 0, 0, 0);

                const eventsInSlot = events
                  .map((event) => {
                    // Adjust event to the current day
                    const dayStart = new Date(date);
                    dayStart.setHours(0, 0, 0, 0);

                    const dayEnd = new Date(date);
                    dayEnd.setHours(23, 59, 59, 999);

                    const eventStart =
                      event.startTime > dayStart ? event.startTime : dayStart;
                    const eventEnd =
                      event.endTime < dayEnd ? event.endTime : dayEnd;

                    if (eventStart >= eventEnd) {
                      return null;
                    }

                    return {
                      ...event,
                      startTime: eventStart,
                      endTime: eventEnd,
                    };
                  })
                  .filter(
                    (event) =>
                      event &&
                      areIntervalsOverlapping(
                        { start: timeSlotStart, end: timeSlotEnd },
                        { start: event.startTime, end: event.endTime }
                      )
                  );
                if (innerIndex === 0) {
                  return (
                    <Box
                      key={uuidv4()}
                      borderLeft={index === 0 ? "1px solid #EBEBEB" : 0}
                      borderRight="1px solid #EBEBEB"
                      height={50}
                      display="flex"
                      flexDirection="column"
                      position="relative"
                      borderTop={
                        eventsInSlot
                          .map((event) =>
                            isEventInBoxTimeSlot(
                              event.startTime,
                              event.endTime,
                              date,
                              innerIndex
                            )
                          )
                          .some((isIn) => isIn)
                          ? 0
                          : "1px solid #ACACAC"
                      }
                    >
                      {lodash.isEmpty(eventsInSlot) ? (
                        <>
                          <ButtonBase
                            sx={{
                              height: "50%",
                              width: "100%",
                              cursor: "default",
                            }}
                            disableRipple
                            onClick={() =>
                              handleSelectDateAndTime(datesArray[index], 0, 0)
                            }
                          />
                          <ButtonBase
                            sx={{
                              height: "50%",
                              width: "100%",
                              cursor: "default",
                              borderBottom: "1px solid #ebebeb66",
                            }}
                            disableRipple
                            onClick={() =>
                              handleSelectDateAndTime(datesArray[index], 0, 15)
                            }
                          />
                          <ButtonBase
                            sx={{
                              height: "50%",
                              width: "100%",
                              cursor: "default",
                            }}
                            disableRipple
                            onClick={() =>
                              handleSelectDateAndTime(datesArray[index], 0, 30)
                            }
                          />
                          <ButtonBase
                            sx={{
                              height: "50%",
                              width: "100%",
                              cursor: "default",
                            }}
                            disableRipple
                            onClick={() =>
                              handleSelectDateAndTime(datesArray[index], 0, 45)
                            }
                          />
                        </>
                      ) : (
                        <Box
                          height="100%"
                          display="flex"
                          flexDirection="column"
                          position="relative"
                        >
                          {getOverlappingEvents(eventsInSlot).map(
                            (eventGroup, _) => {
                              const totalOverlap = eventGroup.length;
                              return eventGroup.map((event, idx) => {
                                const eventStartMinutes = Math.max(
                                  0,
                                  differenceInMinutes(
                                    event.startTime,
                                    timeSlotStart
                                  )
                                );
                                const eventEndMinutes = Math.min(
                                  60,
                                  differenceInMinutes(
                                    event.endTime,
                                    timeSlotStart
                                  )
                                );
                                const eventDurationMinutes =
                                  eventEndMinutes - eventStartMinutes;

                                const showTitle = isEventStartingInThisBox(
                                  event.startTime,
                                  date,
                                  innerIndex
                                );

                                return (
                                  <Box
                                    key={event.id}
                                    position="absolute"
                                    top={`${(eventStartMinutes / 60) * 100}%`}
                                    height={`${
                                      (eventDurationMinutes / 60) * 100
                                    }%`}
                                    width={
                                      totalOverlap === 1
                                        ? "100%"
                                        : `${100 / totalOverlap}%`
                                    } // Full width if no overlap
                                    left={
                                      totalOverlap === 1
                                        ? "0"
                                        : `${(idx / totalOverlap) * 100}%`
                                    } // Adjust position only if overlap
                                    bgcolor={event.color}
                                    p={0.5}
                                    overflow="hidden"
                                    zIndex={9}
                                  >
                                    <Typography fontSize="0.5rem" color="#fff">
                                      {showTitle ? event.title : undefined}
                                    </Typography>
                                  </Box>
                                );
                              });
                            }
                          )}
                          <>
                            <ButtonBase
                              sx={{
                                height: "25%",
                                width: "100%",
                                cursor: "default",
                              }}
                              disableRipple
                              onClick={() =>
                                handleSelectDateAndTime(
                                  datesArray[index],
                                  innerIndex,
                                  0
                                )
                              }
                            />
                            <ButtonBase
                              sx={{
                                height: "25%",
                                width: "100%",
                                cursor: "default",
                                borderBottom: "1px solid #ebebeb66",
                              }}
                              disableRipple
                              onClick={() =>
                                handleSelectDateAndTime(
                                  datesArray[index],
                                  innerIndex,
                                  15
                                )
                              }
                            />
                            <ButtonBase
                              sx={{
                                height: "25%",
                                width: "100%",
                                cursor: "default",
                              }}
                              disableRipple
                              onClick={() =>
                                handleSelectDateAndTime(
                                  datesArray[index],
                                  innerIndex,
                                  30
                                )
                              }
                            />
                            <ButtonBase
                              sx={{
                                height: "25%",
                                width: "100%",
                                cursor: "default",
                              }}
                              disableRipple
                              onClick={() =>
                                handleSelectDateAndTime(
                                  datesArray[index],
                                  innerIndex,
                                  45
                                )
                              }
                            />
                          </>
                        </Box>
                      )}
                    </Box>
                  );
                } else {
                  return (
                    <Box
                      key={uuidv4()}
                      borderTop={
                        eventsInSlot
                          .map((event) =>
                            isEventInBoxTimeSlot(
                              event.startTime,
                              event.endTime,
                              date,
                              innerIndex
                            )
                          )
                          .some((isIn) => isIn)
                          ? 0
                          : innerIndex === 12
                          ? "1px solid #ACACAC"
                          : "1px solid #EBEBEB"
                      }
                      borderLeft={index === 0 ? "1px solid #EBEBEB" : 0}
                      borderRight="1px solid #EBEBEB"
                      height={50}
                      borderBottom={
                        innerIndex === hours.length - 1
                          ? "1px solid #EBEBEB"
                          : 0
                      }
                      display="flex"
                      position="relative"
                      flexDirection="column"
                    >
                      {lodash.isEmpty(eventsInSlot) ? (
                        <>
                          <ButtonBase
                            sx={{
                              height: "50%",
                              width: "100%",
                              cursor: "default",
                            }}
                            disableRipple
                            onClick={() =>
                              handleSelectDateAndTime(
                                datesArray[index],
                                innerIndex,
                                0
                              )
                            }
                          />
                          <ButtonBase
                            sx={{
                              height: "50%",
                              width: "100%",
                              cursor: "default",
                              borderBottom: "1px solid #ebebeb66",
                            }}
                            disableRipple
                            onClick={() =>
                              handleSelectDateAndTime(
                                datesArray[index],
                                innerIndex,
                                15
                              )
                            }
                          />
                          <ButtonBase
                            sx={{
                              height: "50%",
                              width: "100%",
                              cursor: "default",
                            }}
                            disableRipple
                            onClick={() =>
                              handleSelectDateAndTime(
                                datesArray[index],
                                innerIndex,
                                30
                              )
                            }
                          />
                          <ButtonBase
                            sx={{
                              height: "50%",
                              width: "100%",
                              cursor: "default",
                            }}
                            disableRipple
                            onClick={() =>
                              handleSelectDateAndTime(
                                datesArray[index],
                                innerIndex,
                                45
                              )
                            }
                          />
                        </>
                      ) : (
                        <Box
                          height="100%"
                          display="flex"
                          flexDirection="column"
                          position="relative"
                        >
                          {getOverlappingEvents(eventsInSlot).map(
                            (eventGroup, _) => {
                              const totalOverlap = eventGroup.length;
                              return eventGroup.map((event, idx) => {
                                const eventStartMinutes = Math.max(
                                  0,
                                  differenceInMinutes(
                                    event.startTime,
                                    timeSlotStart
                                  )
                                );
                                const eventEndMinutes = Math.min(
                                  60,
                                  differenceInMinutes(
                                    event.endTime,
                                    timeSlotStart
                                  )
                                );
                                const eventDurationMinutes =
                                  eventEndMinutes - eventStartMinutes;
                                const showTitle = isEventStartingInThisBox(
                                  event.startTime,
                                  date,
                                  innerIndex
                                );

                                return (
                                  <Box
                                    key={event.id}
                                    position="absolute"
                                    top={`${(eventStartMinutes / 60) * 100}%`}
                                    height={`${
                                      (eventDurationMinutes / 60) * 100
                                    }%`}
                                    width={
                                      totalOverlap === 1
                                        ? "100%"
                                        : `${100 / totalOverlap}%`
                                    } // Full width if no overlap
                                    left={
                                      totalOverlap === 1
                                        ? "0"
                                        : `${(idx / totalOverlap) * 100}%`
                                    } // Adjust position only if overlap
                                    bgcolor={event.color}
                                    p={0.5}
                                    overflow="hidden"
                                    zIndex={9}
                                  >
                                    <Typography fontSize="0.5rem" color="#fff">
                                      {showTitle ? event.title : undefined}
                                    </Typography>
                                  </Box>
                                );
                              });
                            }
                          )}
                          <>
                            <ButtonBase
                              sx={{
                                height: "25%",
                                width: "100%",
                                cursor: "default",
                              }}
                              disableRipple
                              onClick={() =>
                                handleSelectDateAndTime(
                                  datesArray[index],
                                  innerIndex,
                                  0
                                )
                              }
                            />
                            <ButtonBase
                              sx={{
                                height: "25%",
                                width: "100%",
                                cursor: "default",
                                borderBottom: "1px solid #ebebeb66",
                              }}
                              disableRipple
                              onClick={() =>
                                handleSelectDateAndTime(
                                  datesArray[index],
                                  innerIndex,
                                  15
                                )
                              }
                            />
                            <ButtonBase
                              sx={{
                                height: "25%",
                                width: "100%",
                                cursor: "default",
                              }}
                              disableRipple
                              onClick={() =>
                                handleSelectDateAndTime(
                                  datesArray[index],
                                  innerIndex,
                                  30
                                )
                              }
                            />
                            <ButtonBase
                              sx={{
                                height: "25%",
                                width: "100%",
                                cursor: "default",
                              }}
                              disableRipple
                              onClick={() =>
                                handleSelectDateAndTime(
                                  datesArray[index],
                                  innerIndex,
                                  45
                                )
                              }
                            />
                          </>
                        </Box>
                      )}
                    </Box>
                  );
                }
              })}
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default WeeklyMachinePlan;

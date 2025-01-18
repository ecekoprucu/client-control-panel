import { Box, ButtonBase, Grid2, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { CustomerCard } from "@/views/Dashboard/components/Calendar/CustomerCard";

export const Calendar = () => {
  const [baseDate, setBaseDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([
    {
      reservation_id: 1,
      guest_name: "Alice Johnson",
      check_in: "2025-01-19",
      check_out: "2025-02-15",
      room_type: "Deluxe Suite",
      number_of_guests: 2,
      price_per_night: 250,
      status: "Confirmed",
    },
    {
      reservation_id: 2,
      guest_name: "Michael Smith",
      check_in: "2025-01-19",
      check_out: "2025-02-05",
      room_type: "Standard Room",
      number_of_guests: 1,
      price_per_night: 100,
      status: "Cancelled",
    },
    {
      reservation_id: 3,
      guest_name: "Emma Wilson",
      check_in: "2025-01-20",
      check_out: "2025-01-25",
      room_type: "King Room",
      number_of_guests: 2,
      price_per_night: 150,
      status: "Confirmed",
    },
    {
      reservation_id: 4,
      guest_name: "Liam Brown",
      check_in: "2025-05-10",
      check_out: "2025-05-15",
      room_type: "Double Room",
      number_of_guests: 3,
      price_per_night: 180,
      status: "Pending",
    },
    {
      reservation_id: 5,
      guest_name: "Olivia Davis",
      check_in: "2025-06-01",
      check_out: "2025-06-06",
      room_type: "Family Suite",
      number_of_guests: 4,
      price_per_night: 300,
      status: "Confirmed",
    },
    {
      reservation_id: 6,
      guest_name: "Noah Miller",
      check_in: "2025-07-01",
      check_out: "2025-07-04",
      room_type: "Standard Room",
      number_of_guests: 2,
      price_per_night: 120,
      status: "Checked In",
    },
    {
      reservation_id: 7,
      guest_name: "Sophia Martinez",
      check_in: "2025-08-10",
      check_out: "2025-08-12",
      room_type: "Suite",
      number_of_guests: 2,
      price_per_night: 220,
      status: "Confirmed",
    },
    {
      reservation_id: 8,
      guest_name: "Mason White",
      check_in: "2025-09-05",
      check_out: "2025-09-10",
      room_type: "Queen Room",
      number_of_guests: 3,
      price_per_night: 180,
      status: "Cancelled",
    },
    {
      reservation_id: 9,
      guest_name: "Isabella Garcia",
      check_in: "2025-10-15",
      check_out: "2025-10-18",
      room_type: "Deluxe Room",
      number_of_guests: 2,
      price_per_night: 200,
      status: "Pending",
    },
    {
      reservation_id: 10,
      guest_name: "William Anderson",
      check_in: "2025-11-01",
      check_out: "2025-11-03",
      room_type: "Economy Room",
      number_of_guests: 1,
      price_per_night: 80,
      status: "Confirmed",
    },
    {
      reservation_id: 11,
      guest_name: "Mia Thomas",
      check_in: "2025-11-20",
      check_out: "2025-11-25",
      room_type: "Penthouse Suite",
      number_of_guests: 2,
      price_per_night: 500,
      status: "Confirmed",
    },
    {
      reservation_id: 12,
      guest_name: "Ethan Wilson",
      check_in: "2025-12-10",
      check_out: "2025-12-15",
      room_type: "Standard Room",
      number_of_guests: 1,
      price_per_night: 90,
      status: "Pending",
    },
    {
      reservation_id: 13,
      guest_name: "Ava Harris",
      check_in: "2025-12-20",
      check_out: "2025-12-25",
      room_type: "Luxury Suite",
      number_of_guests: 3,
      price_per_night: 350,
      status: "Confirmed",
    },
    {
      reservation_id: 14,
      guest_name: "James Clark",
      check_in: "2026-01-01",
      check_out: "2026-01-03",
      room_type: "Standard Room",
      number_of_guests: 2,
      price_per_night: 110,
      status: "Checked In",
    },
    {
      reservation_id: 15,
      guest_name: "Charlotte Lopez",
      check_in: "2026-01-15",
      check_out: "2026-01-20",
      room_type: "Deluxe Room",
      number_of_guests: 4,
      price_per_night: 200,
      status: "Pending",
    },
    {
      reservation_id: 16,
      guest_name: "Lucas Hall",
      check_in: "2026-02-01",
      check_out: "2026-02-10",
      room_type: "King Room",
      number_of_guests: 1,
      price_per_night: 150,
      status: "Confirmed",
    },
    {
      reservation_id: 17,
      guest_name: "Amelia Young",
      check_in: "2026-03-05",
      check_out: "2026-03-07",
      room_type: "Suite",
      number_of_guests: 2,
      price_per_night: 250,
      status: "Cancelled",
    },
    {
      reservation_id: 18,
      guest_name: "Elijah King",
      check_in: "2026-04-01",
      check_out: "2026-04-03",
      room_type: "Queen Room",
      number_of_guests: 2,
      price_per_night: 180,
      status: "Confirmed",
    },
    {
      reservation_id: 19,
      guest_name: "Harper Wright",
      check_in: "2026-05-15",
      check_out: "2026-05-20",
      room_type: "Penthouse Suite",
      number_of_guests: 5,
      price_per_night: 550,
      status: "Checked In",
    },
    {
      reservation_id: 20,
      guest_name: "Alexander Baker",
      check_in: "2026-06-10",
      check_out: "2026-06-15",
      room_type: "Family Suite",
      number_of_guests: 4,
      price_per_night: 320,
      status: "Confirmed",
    },
    {
      reservation_id: 21,
      guest_name: "Evelyn Scott",
      check_in: "2026-07-01",
      check_out: "2026-07-05",
      room_type: "Economy Room",
      number_of_guests: 2,
      price_per_night: 85,
      status: "Cancelled",
    },
    {
      reservation_id: 22,
      guest_name: "Daniel Green",
      check_in: "2026-08-01",
      check_out: "2026-08-07",
      room_type: "Standard Room",
      number_of_guests: 2,
      price_per_night: 120,
      status: "Pending",
    },
    {
      reservation_id: 23,
      guest_name: "Luna Adams",
      check_in: "2026-09-10",
      check_out: "2026-09-12",
      room_type: "Luxury Suite",
      number_of_guests: 3,
      price_per_night: 400,
      status: "Confirmed",
    },
    {
      reservation_id: 24,
      guest_name: "Henry Gonzalez",
      check_in: "2026-10-05",
      check_out: "2026-10-10",
      room_type: "Deluxe Room",
      number_of_guests: 2,
      price_per_night: 210,
      status: "Confirmed",
    },
    {
      reservation_id: 25,
      guest_name: "Grace Carter",
      check_in: "2026-11-01",
      check_out: "2026-11-05",
      room_type: "Queen Room",
      number_of_guests: 2,
      price_per_night: 180,
      status: "Pending",
    },
  ]);

  const { i18n, t } = useTranslation();

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

  const changeSelectedWeek = useCallback((direction: string) => {
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
  console.log(Math.floor(reservations.length / 2), reservations.length);
  return (
    <Box>
      <Box display="flex" gap={3}>
        <ButtonBase onClick={() => changeSelectedWeek("prev")}>
          <ChevronLeft
            fontSize="medium"
            sx={{
              color: "#888888",
            }}
          />
        </ButtonBase>
        <Box alignItems="center" gap={1} display="flex">
          <Typography fontSize="1.5rem" color="#515151" fontWeight={700}>
            {t("views.dashboard.calendar.this_week")}:
          </Typography>
          <Typography fontSize="1.225rem" color="#515151" fontWeight={400}>
            {currentWeekText}
          </Typography>
        </Box>
        <ButtonBase onClick={() => changeSelectedWeek("next")}>
          <ChevronRight
            fontSize="medium"
            sx={{
              color: "#888888",
            }}
          />
        </ButtonBase>
      </Box>
      <Grid2 container spacing={0}>
        {datesArray.map((date, index) => (
          <Grid2
            key={index}
            pb={2}
            borderBottom="1px solid #EBEBEB"
            size={{
              xs: 12 / 7,
            }}
          >
            <Box display="flex" justifyContent="center">
              <ButtonBase
                onClick={() => setSelectedDate(date)}
                sx={{
                  ":focus": {
                    outline: "none",
                  },
                }}
              >
                <Box
                  py={1}
                  px={2.5}
                  borderRadius="50%"
                  bgcolor={
                    isSameDay(selectedDate, date)
                      ? "rgba(41, 34, 139, 0.8)"
                      : "transparent"
                  }
                >
                  <Typography
                    fontSize="0.551rem"
                    textAlign="center"
                    fontWeight={500}
                    color={isSameDay(selectedDate, date) ? "#FFF" : "#222222"}
                  >
                    {date.toLocaleDateString(i18n.language, {
                      weekday: "short",
                    })}
                  </Typography>
                  <Typography
                    fontSize="1.225rem"
                    textAlign="center"
                    fontWeight={700}
                    color={isSameDay(selectedDate, date) ? "#FFF" : "#222222"}
                  >
                    {date.toLocaleDateString(i18n.language, {
                      day: "numeric",
                    })}
                  </Typography>
                </Box>
              </ButtonBase>
            </Box>
          </Grid2>
        ))}
      </Grid2>
      <Grid2 container maxHeight="30vh" overflow="auto" spacing={0}>
        {reservations
          .filter((reservation) =>
            isSameDay(reservation.check_in, selectedDate)
          )
          .map((reservation) => (
            <Grid2 size={{ xs: 6 }}>
              <CustomerCard
                reservation={reservation}
                setReservations={setReservations}
              />
            </Grid2>
          ))}
      </Grid2>
    </Box>
  );
};

import { Reservation } from "@/views/Dashboard/components/Calendar/types";
import { Box, ButtonBase, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Close } from "@mui/icons-material";

type CustomerCard = {
  reservation: Reservation;
  setReservations: Dispatch<SetStateAction<Reservation[]>>;
};

export const CustomerCard = ({
  reservation,
  setReservations,
}: CustomerCard) => {
  return (
    <Box position="relative">
      <Typography fontSize="0.85rem">{reservation.guest_name}</Typography>
      <ButtonBase
        sx={{
          position: "absolute",
          top: -2,
          right: 0,
        }}
        onClick={() =>
          setReservations((prevReservations) =>
            prevReservations.filter(
              (res) => res.reservation_id !== reservation.reservation_id
            )
          )
        }
      >
        <Close />
      </ButtonBase>
    </Box>
  );
};

import { Reservation } from "@/views/Dashboard/components/Calendar/types";
import { Box, ButtonBase, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Close } from "@mui/icons-material";
import { enumColors } from "@/views/Dashboard/components/Calendar/enums";

type CustomerCard = {
  reservation: Reservation;
  setReservations: Dispatch<SetStateAction<Reservation[]>>;
  handleOpenCustomerDialog: (data: Reservation) => void;
};

export const CustomerCard = ({
  reservation,
  setReservations,
  handleOpenCustomerDialog,
}: CustomerCard) => {
  return (
    <Box
      borderRadius={1}
      p={1}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bgcolor={enumColors[reservation.status as keyof typeof enumColors]}
      onClick={() => handleOpenCustomerDialog(reservation)}
      sx={{
        cursor: "pointer",
      }}
    >
      <Typography fontSize="0.85rem" color="#FFF" fontWeight={600}>
        {reservation.guest_name}
      </Typography>
      <ButtonBase
        sx={{
          color: "#FFF",
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

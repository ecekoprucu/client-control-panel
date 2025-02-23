import { Reservation } from "@/views/Dashboard/components/Calendar/types";
import { Close } from "@mui/icons-material";
import {
  ButtonBase,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

type CustomerDialog = {
  reservation: Reservation | null;
  onClose: () => void;
};

export const CustomerDialog = ({ reservation, onClose }: CustomerDialog) => {
  return (
    <>
      <DialogTitle display="flex" justifyContent="space-between">
        <Typography fontWeight={600}>
          {reservation?.guest_name ?? "-"}
        </Typography>
        <ButtonBase onClick={onClose}>
          <Close />
        </ButtonBase>
      </DialogTitle>
      <DialogContent>
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight={600}>Check In:</Typography>
            <Typography>{reservation?.check_in}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight={600}>Check Out:</Typography>
            <Typography>{reservation?.check_out}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight={600}>Room Type:</Typography>
            <Typography>{reservation?.room_type}</Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </>
  );
};

export type Reservation = {
  reservation_id: number;
  guest_name: string;
  check_in: string;
  check_out: string;
  room_type: string;
  number_of_guests: number;
  status: string;
};

export type CustomerDialogInfo = {
  isOpen: boolean;
  data: null | Reservation;
};

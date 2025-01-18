export type Reservation = {
  reservation_id: number;
  guest_name: string;
  check_in: string;
  check_out: string;
  room_type: string;
  number_of_guests: number;
  price_per_night: number;
  status: string;
};

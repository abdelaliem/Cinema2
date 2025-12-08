export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  return `${hours}:${minutes}`;
};

export const calculateTotalPrice = (seats, pricePerSeat) => {
  return (seats.length * pricePerSeat).toFixed(2);
};

export const groupSeatsByRow = (seats) => {
  const grouped = {};
  seats.forEach((seat) => {
    if (!grouped[seat.row]) {
      grouped[seat.row] = [];
    }
    grouped[seat.row].push(seat);
  });
  return grouped;
};

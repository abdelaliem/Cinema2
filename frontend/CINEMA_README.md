# Cinema Booking Frontend

A modular React application for a cinema ticket booking system. Users can browse movies, select showtimes, pick seats, and complete their bookings.

## Project Structure

```
src/
├── api/
│   └── client.js              # Axios client with interceptors
├── components/
│   ├── MovieCard.js           # Individual movie card
│   ├── MovieList.js           # Movies grid/list
│   ├── ShowtimeSelector.js    # Showtime selection
│   ├── SeatSelector.js        # Seat selection with visual grid
│   ├── CheckoutForm.js        # Booking confirmation form
│   └── ...
├── context/
│   └── BookingContext.js      # Global booking state management
├── pages/
│   └── Home.js                # Main booking page
├── services/
│   ├── movieService.js        # Movie API calls
│   └── bookingService.js      # Booking API calls
├── styles/
│   ├── Home.css               # Home page styles
│   ├── MovieCard.css          # Movie card styles
│   ├── MovieList.css          # Movie list styles
│   ├── ShowtimeSelector.css   # Showtime selector styles
│   ├── SeatSelector.css       # Seat selector styles
│   └── CheckoutForm.css       # Checkout form styles
├── utils/
│   └── helpers.js             # Utility functions
├── App.js
├── App.css
└── index.js
```

## Features

- **Movie Browsing**: Display all available movies with posters and details
- **Showtime Selection**: Choose preferred date and time for the movie
- **Seat Booking**: Interactive seat selection with visual feedback
- **Booking Confirmation**: Fill user details and confirm booking
- **State Management**: Context API for global booking state
- **Responsive Design**: Mobile-friendly UI
- **API Integration**: Axios client with token authentication support

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

### 3. Start the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints Expected

The backend should provide the following endpoints:

### Movies

- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/movies/:id/showtimes` - Get showtimes for a movie

### Showtimes & Seats

- `GET /api/showtimes/:id/seats` - Get seats for a showtime
- `GET /api/halls/:id/seats` - Get seats for a hall

### Bookings

- `POST /api/bookings` - Create a new booking
- `GET /api/users/:id/bookings` - Get user bookings
- `DELETE /api/bookings/:id` - Cancel a booking

## Component Flow

1. **MovieList** - User sees available movies
2. **ShowtimeSelector** - User picks a showtime
3. **SeatSelector** - User selects seats
4. **CheckoutForm** - User enters details and confirms
5. **Confirmation** - Booking is created and user is notified

## State Management (Context)

The `BookingContext` manages:

- Selected movie
- Selected showtime
- Selected seats (array of seat IDs)
- Current booking step (movies/showtimes/seats/checkout)
- Functions to add/remove seats

## Styling

- Uses CSS modules and utility styles
- Responsive grid layout for movies
- Interactive seat selection grid
- Bootstrap-friendly color scheme
- Smooth animations and transitions

## Technologies Used

- **React 18** - UI library
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **Context API** - State management
- **CSS** - Styling

## Notes

- Ensure backend is running on `http://localhost:8000`
- Update `REACT_APP_API_URL` if backend is on different port/host
- Token-based authentication is supported via localStorage
- All API responses should follow consistent JSON structure

## Future Enhancements

- User authentication/login
- Payment integration
- Booking history
- Ticket PDF generation
- Email confirmations
- Admin dashboard
- Cancellation policies

import { bookingText } from "./Booking.data";
import BookingForm from "./BookingForm";
import BookingTitle from "./BookingTitle";

const Booking = () => {
  return (
    <div data-testid="booking" className="space-y-4">
      <h1>Jak do nas się zapisać</h1>

      <section className="space-y-2">
        <BookingTitle
          title={bookingText[0]?.title ?? ""}
          text={bookingText[0]?.text ?? ""}
        />
      </section>

      <section className="space-y-2">
        <BookingForm />
      </section>
    </div>
  );
};

export default Booking;

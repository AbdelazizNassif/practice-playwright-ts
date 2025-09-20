import { APIRequestContext } from "@playwright/test";
// import bookingBody from "../bodies/booking-test-body.json"; // typed as `any` by default
import { Booking, BookingDates } from "../pojo-bodies/Booking";

export class BookingRequests {
  readonly request: APIRequestContext;
  readonly token: string;

  constructor(request: APIRequestContext, token: string) {
    this.request = request;
    this.token = token;
  }

  async createBooking( booking: Booking) {
    const res = await this.request.post("/booking", {
      headers: {
        "Content-Type": "application/json",
      },
      data: booking,
    });
    return res;
  }

    async updateBooking( bookingId: number, updatedBooking: Booking) {
    const res = await this.request.put("/booking/" + bookingId, {
      headers: {
        "Content-Type": "application/json",
        'Cookie' : 'token=' + this.token
      },
      data: updatedBooking,
    });
    return res;
  }

  
    async deleteBooking( bookingId: number, updatedBooking: Booking) {
    const res = await this.request.delete("/booking/" + bookingId, {
      headers: {
        "Content-Type": "application/json",
        'Cookie' : 'token=' + this.token
      }
    });
    return res;
  }

  async getAllBookings() {
    const res = await this.request.get("/booking", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }
}

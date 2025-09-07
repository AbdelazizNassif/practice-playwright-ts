import {
  APIRequestContext,
} from "@playwright/test";
import bookingBody from '../bodies/booking-test-body.json'; // typed as `any` by default


export class BookingRequests {

  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createBooking() {
    const res = await this.request.post("/booking", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      },
    });
    return res;
  }
  async createBooking2() {
          const res = await this.request.post("/booking", {
      headers: {
        "Content-Type": "application/json",
      },
      data: bookingBody,
    });
    console.log('book bod is:' + bookingBody)
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

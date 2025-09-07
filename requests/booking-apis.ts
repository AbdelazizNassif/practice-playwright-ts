import {
  APIRequestContext,
  expect,
  type Locator,
  type Page,
} from "@playwright/test";

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

  async getAllBookings() {
    const res = await this.request.get("/booking", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }
}

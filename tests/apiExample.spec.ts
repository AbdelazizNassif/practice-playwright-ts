import { test, expect, type Page } from "@playwright/test";
import { BookingRequests } from "../requests/booking-apis";
let token: any;
let newBookingId: any;
// classes
let bookingReqs: BookingRequests;

test.describe.configure({ mode: "serial" });
test("precondition: Auth", async ({ request }) => {
  const res = await request.post("/auth", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username: "admin",
      password: "password123",
    },
  });
  console.log(await res.headers());
  console.log(await res.json());
  console.log(await res.status());
  const resAsJson = await res.json();
  token = resAsJson.token;
  console.log(`token is: ${token}`);
});

test("create booking", async ({ request }) => {
  let bookingReqs = new BookingRequests(request);
  const res = await bookingReqs.createBooking();
  console.log(await res.headers());
  console.log(await res.json());
  console.log(await res.status());
  const resAsJson = await res.json();
  await expect(resAsJson.bookingid).not.toBeNull();
  newBookingId = resAsJson.bookingid;
});
test("get all bookings", async ({ request }) => {
  let bookingReqs = new BookingRequests(request);

  const res = await bookingReqs.getAllBookings();
  console.log(await res.headers());
  console.log(await res.json());
  console.log(await res.status());
  const allBookings: string[] = await res.json();
  expect(Array.isArray(allBookings)).toBe(true);
  console.log(allBookings);
  expect(allBookings).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ bookingid: newBookingId }),
    ])
  );
});

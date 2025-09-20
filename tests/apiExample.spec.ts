import { test, expect, type Page } from "@playwright/test";
import { BookingRequests } from "../requests/booking-requests";
import { Booking, BookingDates } from "../pojo-bodies/Booking";
import { AuthenticateRequests } from "../requests/auth-requests";

let token: any;
let newBookingId: any;
// classes
let bookingReqs: BookingRequests;
let authenticateReqs: AuthenticateRequests;
let fname: string = "automated fname " + new Date().getTime();
let updatedFname: string = "automated updated " + new Date().getTime();
let lname: string = "automated lname " + new Date().getTime();
let totalPrice: number = 5000;
let hasDeposite: boolean = false;
let bookingDates: BookingDates = new BookingDates("2018-01-01", "2019-01-01");
let additionalNeeds: string = "breakfast";

test.describe.configure({ mode: "serial" });
test.beforeAll("precondition: Auth", async ({ request }) => {
  authenticateReqs = new AuthenticateRequests(request);
  const res = await authenticateReqs.authenticate();
  const resAsJson = await res.json();
  token = resAsJson.token;
});

test("create booking - get body using serialization", async ({ request }) => {
  const booking = new Booking(
    fname,
    lname,
    totalPrice,
    hasDeposite,
    bookingDates,
    additionalNeeds
  );
  let bookingReqs = new BookingRequests(request, token);
  const res = await bookingReqs.createBooking(booking);
  const resAsJson = await res.json();
  await expect(resAsJson.bookingid).not.toBeNull();
  await expect(resAsJson.booking.firstname).toEqual(fname);
  newBookingId = resAsJson.bookingid;
});

test("update booking - update body using serialization", async ({
  request,
}) => {
  const booking = new Booking(
    updatedFname,
    lname,
    totalPrice,
    hasDeposite,
    bookingDates,
    additionalNeeds
  );
  let bookingReqs = new BookingRequests(request, token);
  const res = await bookingReqs.updateBooking(newBookingId, booking);
  const resAsJson = await res.json();
  await expect(resAsJson.bookingid).not.toBeNull();
  await expect(resAsJson.firstname).toEqual(updatedFname);
});
test("get all bookings", async ({ request }) => {
  let bookingReqs = new BookingRequests(request, token);
  const res = await bookingReqs.getAllBookings();
  const allBookings: string[] = await res.json();
  expect(Array.isArray(allBookings)).toBe(true);
  expect(allBookings).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ bookingid: newBookingId }),
    ])
  );
});

test.afterAll("test deleting booking", async ({ request }) => {
  let bookingReqs = new BookingRequests(request, token);
  const deleteRes = await bookingReqs.deleteBooking(newBookingId, token);
  expect(deleteRes.status()).toEqual(201);
  const getAllBookingsRes = await bookingReqs.getAllBookings();
  const allBookings: string[] = await getAllBookingsRes.json();
  expect(Array.isArray(allBookings)).toBe(true);
  expect(allBookings).toEqual(
    expect.arrayContaining([
      expect.not.objectContaining({ bookingid: newBookingId }),
    ])
  );
});

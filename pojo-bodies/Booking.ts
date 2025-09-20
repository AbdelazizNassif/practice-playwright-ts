export class BookingDates {
  checkin: string;
  checkout: string;

  constructor(checkin: string, checkout: string) {
    this.checkin = checkin;
    this.checkout = checkout;
  }
}

export class Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;

  constructor(
    firstname: string,
    lastname: string,
    totalprice: number,
    depositpaid: boolean,
    bookingdates: BookingDates,
    additionalneeds: string
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.totalprice = totalprice;
    this.depositpaid = depositpaid;
    this.bookingdates = bookingdates;
    this.additionalneeds = additionalneeds;
  }
}
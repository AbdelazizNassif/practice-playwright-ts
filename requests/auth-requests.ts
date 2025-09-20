import { APIRequestContext } from "@playwright/test";
// import bookingBody from "../bodies/booking-test-body.json"; // typed as `any` by default

export class AuthenticateRequests {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async authenticate( ) {
  const res = await this.request.post("/auth", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username: "admin",
      password: "password123",
    },
  });
    return res;
  }


}

export interface EmailTask {
  email: string;
}

export interface VerifyEmailTask extends EmailTask {
  token: string;
}

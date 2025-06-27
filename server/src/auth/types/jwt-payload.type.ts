export type JwtPayloadType = {
  id: string;
  role: string;
  sessionId: string;
  iat: number;
  exp: number;
};

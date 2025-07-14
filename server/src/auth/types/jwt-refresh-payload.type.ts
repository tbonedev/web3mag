import { Uuid } from 'src/common/types/common.type';

export type JwtRefreshPayloadType = {
  sessionId: Uuid;
  hash: string;
  iat: number;
  exp: number;
};

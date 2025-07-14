import { Branded } from 'src/common/types/types';

export type Token = Branded<
  {
    accessToken: string;
    refreshToken: string;
    tokenExpires: number;
  },
  'token'
>;

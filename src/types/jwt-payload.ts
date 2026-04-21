export interface JwtPayload {
  username: string | undefined;
  iat?: number;
  exp?: number;
}

export interface LoginValues {
  authen: string;
  username: string;
  password: string;
}
export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  data: {
    accessToken: string;
    expiresAt: number;
    expiresIn: number;
    refreshToken: string;
    tokenType: string;
    user: Record<string, unknown>;
  };
}

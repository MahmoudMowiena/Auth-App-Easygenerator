export type LoginFormInputs = {
  email: string;
  password: string;
};

export type SignupFormInputs = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export type AuthResponse = {
  access_token: string;
};

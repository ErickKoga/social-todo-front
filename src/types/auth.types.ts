export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface IAuthenticate {
  email: string;
  password: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

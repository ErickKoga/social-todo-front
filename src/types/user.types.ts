export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IGetUser {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
}

export interface IDeleteUser {
  id: string;
}

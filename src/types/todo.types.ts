export interface ICreateTodo {
  ownerId: string;
  title: string;
  description: string;
  completed: string;
}

export interface IGetTodo {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  completed: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IDeleteTodo {
    id: string;
  }

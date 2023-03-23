export interface ITodo {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface CreateTodoFormValues {
  title: string;
  description?: string;
}

export interface ICreateTodo {
  ownerId: string;
  title: string;
  description?: string;
}

export interface IUpdateTodo {
  title?: string;
  description?: string;
  completed?: boolean;
}

export enum PathsOfRoutes {
  AUTH = "/",
  HOME = "/home",
  REPORT = "/report",
  NOTFOUND = "/:pathMatch(.*)*",
}

export enum IconNames {
  LOADING = "loading",
  MENU = "menu",
  CALENDAR = "calendar",
  CALENDARCHECK = "calendarCheck",
  CHECK = "check",
  TRASH = "trash",
  PLUS = "plus",
  HOME = "home",
  REPORT = "report",
  ARROWDOWN = "arrowDown",
}

export interface IUser {
  id: string;
  externalId: string;
  deletedTodos: number;
  todos: string[];
}

export enum TodoState {
  "Pending" = "Pending",
  "In Progress" = "In Progress",
  "Completed" = "Completed",
}

export interface ITodo {
  id: string;
  title: string;
  description?: string;
  state: TodoState;
  created: string;
  dateOfCompleted?: string;
  user: string;
}

export type NewTodo = Pick<ITodo, "title" | "description">;

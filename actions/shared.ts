export type ActionState<T = undefined> = {
  status: "idle" | "success" | "error";
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
};

export const initialActionState: ActionState = {
  status: "idle"
};

export function actionSuccess<T>(message: string, data?: T): ActionState<T> {
  return {
    status: "success",
    message,
    data
  };
}

export function actionError(message: string, errors?: Record<string, string>): ActionState {
  return {
    status: "error",
    message,
    errors
  };
}

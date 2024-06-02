import { createAction, props } from "@ngrx/store";
import { Student } from "src/modal/student.modal";

export const addStudent = createAction('[Student] Add Task', props<{ student: Student }>());
export const updateStudent = createAction('[Student] Update Task', props<{ student: Student }>());
export const deleteStudent = createAction('[Student] Delete Task', props<{ id: number }>());
import { createAction, props } from "@ngrx/store";
import { Student } from "src/modal/student.modal";

export const getDataSuccess = createAction('[Student] Get Data Success', props<{ students: Student[] }>());
export const addStudent = createAction('[Student] Add Student', props<{ student: Student }>());
export const updateStudent = createAction('[Student] Update Student', props<{ student: Student }>());
export const deleteStudent = createAction('[Student] Delete Student', props<{ id: number }>());
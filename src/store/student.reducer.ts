import { createReducer, on } from "@ngrx/store";
import { Student } from "src/modal/student.modal";
import { addStudent, deleteStudent, getDataSuccess, updateStudent } from "./student.action";

export interface AppState {
    students: Student[];
}

export const initialState: AppState = {
    students: [{id:1, name:'Ritu', gender: 'F'}]
};

const _studentReducer = createReducer(
    initialState,
    on(addStudent, (state, { student }) => ({
        ...state,
        students: [...state.students, student]
    })),
    on(updateStudent, (state, {student}) => ({
        ...state,
        students: state.students.map(s =>s.id === student.id ? student : s)
    })),
    on(deleteStudent, (state, {id}) => ({
        ...state,
        students: state.students.filter(s => s.id !== id)
    })),
    on(getDataSuccess, (state, { students }) => ({
        ...state,
        students
      }))
)

export function studentReducer(state: any, action: any) {
    return _studentReducer(state, action);
  }
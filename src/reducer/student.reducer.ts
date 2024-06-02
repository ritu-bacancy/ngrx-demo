import { createReducer, on } from "@ngrx/store";
import { addStudent, deleteStudent, updateStudent } from "src/action/student.action";
import { Student } from "src/modal/student.modal";

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
    }))
)

export function studentReducer(state: any, action: any) {
    return _studentReducer(state, action);
  }
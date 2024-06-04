import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Student } from 'src/modal/student.modal';
import { getDataSuccess } from './student.action';

@Injectable()
export class StudentEffects {

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadStudents$ = createEffect(() => this.actions$.pipe(
    ofType(getDataSuccess),
    switchMap(() => this.http.get('https://gorest.co.in/public/v2/users')
      .pipe(
        map((response: any) => response.map((user:any, index:any) => ({
          id: index + 1,
          name: user.name,
          gender: user.gender
        }))),
        map((students: Student[]) => getDataSuccess({ students })),
        catchError(() => of({ type: '[Student] Get Data Failure' }))
      ))
    
    )
  );
}

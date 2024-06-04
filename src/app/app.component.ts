import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addStudent, deleteStudent, getDataSuccess, updateStudent,  } from 'src/store/student.action';
import { Student } from 'src/modal/student.modal';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map } from 'rxjs';
import { AppState } from 'src/store/student.reducer';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrx-demo';
  studentName:string = '';
  gender:string = '';
  studentArray: Student[] = [];
  studentId:number=0;

  constructor(private store: Store<AppState>, private http: HttpClient){}

  ngOnInit() {
    // this.getData();
    this.store.select('students').subscribe((event:any) => {
      this.studentArray = event.students;
    })

    // this.store.select('students')
    //   .pipe(
    //     map((state:any) => state.students),
    //     distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    //   )
    //   .subscribe((students) => {
    //     console.log("State changed, updating studentArray");
    //     this.studentArray = students;
    //   });
  }

  getData(){
   this.store.dispatch(getDataSuccess({students: []}))
  }
  
  add() {
    const newStudent: Student = {
      id: this.studentArray.length+1,
      name: this.studentName,
      gender: this.gender
    }
    this.store.dispatch(addStudent({ student: newStudent }));  }

    update() {
      const updateData = {
        id: this.studentId,
        name: this.studentName,
        gender: this.gender
      }

      this.store.dispatch(updateStudent({ student: updateData }));  
      this.hideModal();
    }

    openModal(id:any) {
      const modalElement = document.getElementById('studentModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        this.studentId = id;
        const studentData:any = this.studentArray.find(s => s.id === id);
        this.studentName = studentData?.name;
        this.gender = studentData.gender;
      }
    }

    hideModal() {
      const modalElement = document.getElementById('studentModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          this.studentName = '';
          this.gender = '';
          modal.hide();
        }
      }
    }

    delete(student:Student) {
      const index = this.studentArray.indexOf(student);
      console.log("index...", index);
      this.store.dispatch(deleteStudent({id: student.id}));
    }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addStudent, deleteStudent, updateStudent,  } from 'src/action/student.action';
import { Student } from 'src/modal/student.modal';
import { AppState } from 'src/reducer/student.reducer';
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

  constructor(private store: Store<AppState>){
    this.store.select('students').subscribe((event:any) => {
      console.log("students..", event.students);
      this.studentArray = event.students;
    })
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

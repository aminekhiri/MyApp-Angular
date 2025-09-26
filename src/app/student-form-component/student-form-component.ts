import { S } from '@angular/cdk/keycodes';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../student-service';
import id from '@angular/common/locales/extra/id';
import { LoggingService } from '../logging-service';

@Component({
  selector: 'app-student-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './student-form-component.html',
  styleUrl: './student-form-component.scss'
})
export class StudentFormComponent {

  svc = inject(StudentService)
  logging = inject(LoggingService);



  readonly form = new FormGroup({
    firstname: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    date: new FormControl('', { nonNullable: true }),
    filiere: new FormControl('', { nonNullable: true }),
    promo: new FormControl(2025, { nonNullable: true }),
    paye: new FormControl(0, { nonNullable: true }),
  });


  submit(): void {
    console.log(this.form.value);
    this.svc.add(
      this.form.value.name ?? '',
      this.form.value.paye ?? 0,
      this.form.value.date ? new Date(this.form.value.date) : new Date(),
      this.form.value.firstname ?? '',
      this.form.value.filiere ?? '',
      this.form.value.promo ?? 2025,
    );
    this.logging.log(`Nouvel étudiant ajouté: ${this.form.value.firstname} ${this.form.value.name} - Filière: ${this.form.value.filiere}`, 'StudentList');
  }

}

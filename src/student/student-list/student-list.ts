import { Component, signal , effect, inject } from '@angular/core';
import { StudentCard } from '../student-card/student-card';
import { StudentClass } from '../student-class';
import { StudentService } from '../../app/student-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggingService } from '../../app/logging-service';
import { StudentStore } from '../../app/student.store';

@Component({
  selector: 'app-student-list',
  imports: [StudentCard, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.scss']
})
export class StudentList {

  //ancienne liste d'étudiants avant qu'on utilise le service
  students = [
    {
      student: new StudentClass(
        1,
        'Amine',
        'Khiri',
        'DaMS',
        4,
        5000,
        new Date(),
        false
      ),

    },
    {
      student: new StudentClass(
        2,
        'Sarah',
        'Martin',
        'Informatique',
        3,
        4500,
        new Date('2024-09-15'),
        false
      ),
    },
    {
      student: new StudentClass(
        3,
        'Thomas',
        'Dubois',
        'Marketing',
        2,
        3800,
        new Date('2020-01-20'),
        false
      ),
    },
    
  ];  

  onDelete(index: number) {
    // Au lieu de supprimer, on cache l'étudiant
    this.students[index].student.hidden = true;
    this.count.update( c => c - 1);
    const deletedStudent = this.students[index].student;
    this.studentDeleted.set(deletedStudent);

  }
  studentDeleted = signal<StudentClass | null>(null);


  // count = signal(this.students.length)


  constructor() {
    effect(() => {
      console.log("Nombre d'étudiants et étudiantes : " + this.count());
      if (this.studentDeleted()) {
        console.log(`Étudiant ou étudiante supprimée : ${this.studentDeleted()!.firstname} ${this.studentDeleted()!.name}`);

      }
    });
  }


  readonly svc = inject(StudentService)  
  count = signal(this.svc.students().length)


  // add(name: string, date: number, firstname: string, filiere: string, promo: number, paye: number): void {
  //   if (!name || !date || !firstname || !filiere || !promo || !paye) return
  //   this.svc.add({
  //     id: this.svc.students().length + 1,
  //     name,
  //     date: new Date(date),
  //     firstname,
  //     filiere,
  //     promo,
  //     paye,
  //     hidden: false
  //   })
  //   this.count.update( c => c + 1);
  //   // Log l'ajout de l'étudiant
  //   this.logging.log(`Nouvel étudiant ajouté: ${firstname} ${name} - Filière: ${filiere}`, 'StudentList');
  // }
  
  promote(id: number): void {
    const s = this.svc.findById(id)
    if (s) {
      this.svc.update({ id, date: new Date(s.date.getTime() + 1) });
    }
  }

  removeStudent(id: number): void {
    const student = this.svc.findById(id)
    if (student) {
      // Log la suppression avant de supprimer
      this.logging.log(`Étudiant supprimé: ${student.firstname} ${student.name}`, 'StudentList');
      this.svc.remove(id)
      this.count.update( c => c - 1);
    }
  }

  logging = inject(LoggingService);

  logAllStudents(): void {
    for(let student of this.svc.students()) {
      this.logging.log(`Student: ${student.firstname} ${student.name}`, 'StudentList');
    }
  }


  store = inject(StudentStore);


  //on recoit les infos du form  depuis le output
  
  







}

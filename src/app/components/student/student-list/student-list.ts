import { Component, signal, effect, inject } from '@angular/core';
import { StudentCard } from '../student-card/student-card';
import { StudentClass } from '../../../models/student-class';
import { Student } from '../../../models/student';
import { StudentService } from '../../../services/student-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoggingService } from '../../../services/logging-service';
import { StudentStore } from '../../../stores/student.store';
import { StudentFormComponent } from '../student-form-component/student-form-component';
import { CounterComponent } from '../counter-component/counter-component';
import { LogViewerComponent } from '../../log-viewer-component/log-viewer-component';

@Component({
  selector: 'app-student-list',
  imports: [StudentCard, MatToolbarModule, MatButtonModule, MatIconModule, StudentFormComponent, CounterComponent, LogViewerComponent],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.scss']
})
export class StudentList {

  //ancienne liste d'étudiants avant qu'on utilise le service
  // students = [
  //   {
  //     student: new StudentClass(
  //       1,
  //       'Amine',
  //       'Khiri',
  //       'DaMS',
  //       4,
  //       5000,
  //       new Date(),
  //       false
  //     ),

  //   },
  //   {
  //     student: new StudentClass(
  //       2,
  //       'Sarah',
  //       'Martin',
  //       'Informatique',
  //       3,
  //       4500,
  //       new Date('2024-09-15'),
  //       false
  //     ),
  //   },
  //   {
  //     student: new StudentClass(
  //       3,
  //       'Thomas',
  //       'Dubois',
  //       'Marketing',
  //       2,
  //       3800,
  //       new Date('2020-01-20'),
  //       false
  //     ),
  //   },
    
  // ];  

  // onDelete(index: number) {
  //   // Au lieu de supprimer, on cache l'étudiant
  //   // this.students[index].student.hidden = true;
  //   this.count.update( c => c - 1);
  //   // const deletedStudent = this.students[index].student;
  //   // this.studentDeleted.set(deletedStudent);

  // }
  studentDeleted = signal<StudentClass | null>(null);


  // count = signal(this.students.length)


  constructor() {
    effect(() => {
      console.log("Nombre d'étudiants et étudiantes : " + this.count());
      if (this.studentDeleted()) {
        console.log(`Étudiant ou étudiante supprimée : ${this.studentDeleted()!.firstname} ${this.studentDeleted()!.name}`);
      }
    });

    // Effect pour synchroniser le count avec le service
    effect(() => {
      this.count.set(this.svc.students().length);
    });

    // Effect pour synchroniser selectedId quand selectedStudent change
    effect(() => {
      const student = this.selectedStudent();
      this.selectedId.set(student ? student.id : null);
      console.log('Student sélectionné:', student);
    });
  }


  readonly svc = inject(StudentService)  
  count = signal(this.svc.students().length)
  
  // Signal pour contrôler l'affichage du formulaire
  showForm = signal(false)
  
  // Signaux pour la sélection d'étudiants
  selectedStudent = signal<Student | null>(null)
  selectedId = signal<number | null>(null)


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

  // Méthode appelée par le composant parent pour ajouter un étudiant
  addStudent(studentDto: Student) {
    this.svc.add(studentDto.name, studentDto.paye, studentDto.date, studentDto.firstname, studentDto.filiere, studentDto.promo);
    
    // Logger l'ajout
    this.logging.log(`Nouvel étudiant ajouté: ${studentDto.firstname} ${studentDto.name} - Filière: ${studentDto.filiere}`, 'StudentList');
    
    console.log('Étudiant ajouté à la liste:', studentDto);
  }

  // Méthodes pour gérer l'affichage du formulaire
  toggleForm() {
    this.showForm.update(show => !show);
    // Si on ouvre le formulaire, réinitialiser la sélection
    if (this.showForm()) {
      this.selectedStudent.set(null);
      
    }
  }

  // Méthode appelée quand l'étudiant est soumis depuis le formulaire intégré
  onStudentSubmitted(studentDto: Student) {
    if (this.selectedStudent()) {
      // Mode édition : mettre à jour l'étudiant existant
      this.updateStudent(studentDto);
    } else {
      // ajouter un nouvel étudiant
      this.addStudent(studentDto);
    }
    // Masquer le formulaire et réinitialiser la sélection après soumission
    this.showForm.set(false);
    this.selectedStudent.set(null);
  }

  // Méthode appelée quand une carte d'étudiant est cliquée
  onStudentSelected(studentId: number) {
    const student = this.svc.findById(studentId);
    if (student) {
      this.selectedStudent.set(student);
      // Afficher le formulaire en mode édition
      this.showForm.set(true);
      console.log('Student sélectionné pour édition:', student);
    }
  }

  // Méthode pour mettre à jour un étudiant
  updateStudent(studentDto: Student) {
    const selectedStudent = this.selectedStudent();
    if (selectedStudent) {
      // Conserver l'ID original
      const updatedStudent = { ...studentDto, id: selectedStudent.id };
      
      // Mettre à jour via le service (en supposant qu'il y a une méthode update)
      this.svc.update(updatedStudent);
      
      // Logger la modification
      this.logging.log(`Étudiant modifié: ${updatedStudent.firstname} ${updatedStudent.name}`, 'StudentList');
      
      console.log('Étudiant mis à jour:', updatedStudent); // l'etudiant
    }
  }

}

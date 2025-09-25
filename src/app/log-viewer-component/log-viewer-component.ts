import { Component, inject } from '@angular/core';
import { LoggingService } from '../logging-service';
import { StudentService } from '../student-service';

@Component({
  selector: 'app-log-viewer-component',
  imports: [],
  templateUrl: './log-viewer-component.html',
  styleUrl: './log-viewer-component.scss'
})
export class LogViewerComponent {

  readonly svc = inject(LoggingService);
  readonly studentService = inject(StudentService);

  constructor() {
    // Enregistrer tous les étudiants qui sont dans la liste d'etudiants 
    this.logAllStudents();
  }

    //ajoute les logs de tous les étudiants dans le service de logging
  logAllStudents(): void {
    for (let student of this.studentService.students()) {
      this.svc.log(`Étudiant: ${student.firstname} ${student.name} - Filière: ${student.filiere}`, 'StudentList');
    }
  }

}

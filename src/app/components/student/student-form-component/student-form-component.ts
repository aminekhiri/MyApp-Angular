import { Component, output, input, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-student-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './student-form-component.html',
  styleUrl: './student-form-component.scss'
})
export class StudentFormComponent {

  // Input pour recevoir un étudiant à éditer
  studentToEdit = input<Student | null>(null);

  readonly form = new FormGroup({

    firstname: new FormControl('', { 
      nonNullable: true ,
      validators: [Validators.required, Validators.minLength(3)]
    }),

    name: new FormControl('', { 
      nonNullable: true , 
      validators: [Validators.required, Validators.minLength(3)]
    }),

    date: new FormControl('', { nonNullable: true }),
    filiere: new FormControl('', { 
      nonNullable: true ,
      validators: [Validators.required]
    }),
    
    promo: new FormControl(2025, { nonNullable: true}),
    paye: new FormControl(0, { nonNullable: true , validators: [Validators.min(0)]}), //on veut que ce soit un nombre positif
  });

  // Output qui émet un StudentDto vers le parent qui est StudentList
  studentSubmit = output<Student>();

  constructor() {
    // Effect pour pré-remplir le formulaire quand un étudiant est reçu quand on selectionne sa carte
    effect(() => {
      const student = this.studentToEdit();
      if (student) { //si on a un étudiant à éditer alors on préremplit le formulaire avec les informations de l'étudiant à éditer
        this.form.patchValue({
          firstname: student.firstname,
          name: student.name,
          date: student.date.toISOString().split('T')[0], // Format pour input date et split c'est pour ne garder que la partie date
          filiere: student.filiere,
          promo: student.promo,
          paye: student.paye
        });
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      
      // Créer le StudentDto à partir des données du formulaire pour l'envoyer au parent (StudentList) qui va l'ajouter à la liste avec add grace a l'output
      const studentDto: Student = {
        id: 0, // L'ID sera assigné par le service dans tout les cas mais on le met à cause de la structure de Student (interface)
        firstname: formValue.firstname || '',
        name: formValue.name || '',
        date: new Date(formValue.date || Date.now()),
        filiere: formValue.filiere || '',
        promo: formValue.promo || 2025,
        paye: formValue.paye || 0
      };

      // Émettre le StudentDto vers le composant parent qui est StudentList
      this.studentSubmit.emit(studentDto);
      
      
      // Réinitialiser le formulaire apres inscription ou modification
      this.form.reset({
        firstname: '',
        name: '',
        date: '',
        filiere: '',
        promo: 2025,
        paye: 0
      });
    }
  }

    

  
}
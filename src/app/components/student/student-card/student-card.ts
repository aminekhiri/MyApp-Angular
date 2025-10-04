import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { StudentClass } from '../../../models/student-class';
import { Student } from '../../../models/student';
import { StudentService } from '../../../services/student-service';


@Component({
  selector: 'app-student-card',
  imports: [UpperCasePipe, DatePipe],
  templateUrl: './student-card.html',
  styleUrls: ['./student-card.scss']
})
export class StudentCard {
  firstname = input<string>(); //le input fait que studentCard (enfant) va attendre les informations que StudentList(parent) va lui donner
  name = input<string>();
  filiere = input<string>();
  promo = input<number>();
  paye = input<number>();
  date = input<Date>();
  id = input<number>(); // ID de l'étudiant
  isSelected = input<boolean>(false); // Indique si la carte est sélectionnée
  //la carte elle meme ne gere pas son etat ( on m'a demandé de me mettre en rouge et bleu donc je le fait)
  
  remove = output<void>(); //le output fait que studentCard (enfant) va envoyer une information à StudentList (parent)
  select = output<number>(); // Émet l'ID de l'étudiant sélectionné
  
  onDelete() { 
    this.remove.emit();
  }

  onCardClick() {
      const studentId = this.id();
      if (studentId) {
      this.select.emit(studentId);
    }
  }

}

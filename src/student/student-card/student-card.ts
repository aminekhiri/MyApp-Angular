import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import {StudentClass } from './../student-class';
import { Student } from '../student';
import { StudentService } from '../../app/student-service';


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
  
  remove = output<void>(); //le output fait que studentCard (enfant) va envoyer une information à StudentList (parent)
  
  onDelete() { 
    this.remove.emit();
  }

  removeStudent(id: number) {
    this.remove.emit();
  }

  svc = new StudentService();
  // student = new StudentClass("this.firstname", "this.name", "this.filiere", this.promo, this.paye, this.date, false);

}

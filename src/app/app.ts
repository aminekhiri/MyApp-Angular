import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloStudent } from '../student/hello-student/hello-student';
import { StudentCard } from '../student/student-card/student-card';
import { UpperCasePipe } from '@angular/common';
import { StudentList } from '../student/student-list/student-list';
import { CounterComponent } from '../student/counter-component/counter-component';
import { LogViewerComponent } from './log-viewer-component/log-viewer-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HelloStudent, StudentCard, StudentList, CounterComponent, LogViewerComponent], //on a crée en standalone donc les composants sont indépedants
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('my-app');


}

import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HomeComponent } from './components/home/home-component/home-component';
import { AboutComponent } from './components/about/about-component/about-component';
import { StudentList } from './components/student/student-list/student-list';
import { HelloStudent } from './components/student/hello-student/hello-student';
import { StudentCard } from './components/student/student-card/student-card';
import { CounterComponent } from './components/student/counter-component/counter-component';
import { LogViewerComponent } from './components/log-viewer-component/log-viewer-component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HomeComponent, AboutComponent, StudentList, HelloStudent, StudentCard, CounterComponent, LogViewerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('my-app');
}

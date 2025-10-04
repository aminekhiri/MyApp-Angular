import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { AsyncPipe, Location } from '@angular/common';
import { StudentCard } from '../student-card/student-card';


@Component({
  selector: 'app-student-detail-component',
  imports: [AsyncPipe, StudentCard],
  templateUrl: './student-detail-component.html',
  styleUrl: './student-detail-component.scss'
})
export class StudentDetailComponent {

  route = inject(ActivatedRoute)
  
  id$ = this.route.paramMap.pipe(
    map(params => params.get('id'))
  );


  location = inject(Location);
  router = inject(Router);

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/default-route']);
    }
  }
    


}
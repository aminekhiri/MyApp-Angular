import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home-component/home-component';
import { AboutComponent } from './components/about/about-component/about-component';
import { StudentList } from './components/student/student-list/student-list';
import { NotFoundComponent } from './components/not-found-component/not-found-component';
import { CounterComponent } from './components/student/counter-component/counter-component';
import { StudentDetailComponent } from './components/student/student-detail-component/student-detail-component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Route par défaut - Home
    { path: 'about', component: AboutComponent }, // Page À propos
    { path: 'students', component: StudentList }, // Page des étudiants
    { path: 'counter', component: CounterComponent }, // Page du compteur
    { path: 'students/:id', component: StudentDetailComponent }, // Détail de l'étudiant


    //l'ordre est important parce que la route de redirection va etre faite pour tt routes non défini avant elle
    { path: '**', redirectTo: '' }, // Redirection pour routes inexistantes vers la page d'accueil
    // { path: '**', component: NotFoundComponent } c'est une autre façon de gérer les routes non trouvées avec une "erreur 404"


];

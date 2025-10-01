import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home-component/home-component';
import { AboutComponent } from './components/about/about-component/about-component';
import { StudentList } from './components/student/student-list/student-list';
import { NotFoundComponent } from './components/not-found-component/not-found-component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Route par défaut - Home
    { path: 'about', component: AboutComponent }, // Page À propos
    { path: 'students', component: StudentList }, // Page des étudiants
    { path: '**', redirectTo: '' }, // Redirection pour routes inexistantes vers la page d'accueil
    // { path: '**', component: NotFoundComponent } c'est une autre façon de gérer les routes non trouvées avec une "erreur 404"

];

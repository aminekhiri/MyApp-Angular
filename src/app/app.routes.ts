import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home-component/home-component';
import { AboutComponent } from './components/about/about-component/about-component';
import { StudentList } from './components/student/student-list/student-list';
import { NotFoundComponent } from './components/not-found-component/not-found-component';
import { CounterComponent } from './components/student/counter-component/counter-component';
import { StudentDetailComponent } from './components/student/student-detail-component/student-detail-component';
import { authGuard } from './guard/auth-guard';
import { ForbiddenComponent } from './components/forbidden-component/forbidden-component';
import { PostListComponent } from './components/post-list-component/post-list-component';
import { PostFormComponent } from './components/post-form-component/post-form-component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Accueil' }, // Route par défaut - Home
    { path: 'about', component: AboutComponent, title: 'À propos' , canActivate: [authGuard] }, // Page À propos
    { path: 'students', component: StudentList , title: 'Liste des étudiants' }, // Page des étudiants
    { path: 'counter', component: CounterComponent , title: 'Compteur' }, // Page du compteur
    { path: 'students/:id', component: StudentDetailComponent , title: 'Détail de l\'étudiant' }, // Détail de l'étudiant
    { path: 'forbidden-component', component: ForbiddenComponent, title: 'Accès interdit' }, // Page d'accès interdit
    { path: 'posts', component: PostListComponent, title: 'Liste des articles' },
    //l'ordre est important parce que la route de redirection va etre faite pour tt routes non défini avant elle
    { path: '**', redirectTo: '' }, // Redirection pour routes inexistantes vers la page d'accueil
    // { path: '**', component: NotFoundComponent } c'est une autre façon de gérer les routes non trouvées avec une "erreur 404"


];

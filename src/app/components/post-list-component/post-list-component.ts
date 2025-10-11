import { HttpClient, httpResource } from '@angular/common/http';
import { Component, computed, inject, signal} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { Post } from '../../models/post';
import { PostFormComponent } from '../post-form-component/post-form-component';
import { on } from '@ngrx/signals/events';
import { PostService } from '../../services/post-service';


@Component({
  selector: 'app-post-list-component',
  imports: [JsonPipe, PostFormComponent],
  templateUrl: './post-list-component.html',
  styleUrl: './post-list-component.scss'
})
export class PostListComponent {

  http = inject(HttpClient);


  // avec http
  // au debut on avait fait comme ca mais on a change pour httpResource parce que 
  // c'est plus simple parce que c'est plus moderne
      // post$ = this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');

      // //on recupere les donnees de l'api qu'on converti en signal mais il est en readonly donc on peut pas le modifier
      // postGET = toSignal(this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts'), { initialValue: [] as Post[] });

      // //c'est la partie du signal ou on rajoute des articles donc on peut le modifier
      // postNew = signal<Post[]>([]);

      // //c'ets la concaténation des deux signaux et c'ets celui qu'on va afficher et maintenant lui se modifie tt seul grace au postNew
      // posts = computed(() => {
      //   return [...this.postNew(), ...this.postGET() ?? []];
      // });


      // onPostSubmitted(newPost: Post) {
      //   this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', newPost)
      //   .subscribe(createdPost => {
      //     this.postNew.update(arr => [...arr, createdPost])
      //   })
      // }

  postsvc = inject(PostService);

  onPostSubmitted(newPost: Post) {
    this.postsvc.add(newPost);
  } 



  // //avec resource
  // readonly postsResource = httpResource<Post[]>(() => 'https://jsonplaceholder.typicode.com/posts');

  // postNew = signal<Post[]>([]);

  // posts = computed(() => {
  //   return [...this.postNew(), ...this.postsResource.value() ?? []];
  // });


  // onPostSubmitted(newPost: Post) {
  //   // Ajouter le nouveau post en tête de liste
  //   this.postNew.update(posts => [newPost, ...posts]);
  // }


}

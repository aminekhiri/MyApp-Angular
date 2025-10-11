import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {



  http = inject(HttpClient);

  // avec http
  // au debut on avait fait comme ca mais on a change pour httpResource parce que 
  // c'est plus simple parce que c'est plus moderne
  post$ = this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');

  //on recupere les donnees de l'api qu'on converti en signal mais il est en readonly donc on peut pas le modifier
  postGET = toSignal(this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts'), { initialValue: [] as Post[] });
  
  //c'est la partie du signal ou on rajoute des articles donc on peut le modifier
  postNew = signal<Post[]>([]);

  //c'ets la concaténation des deux signaux et c'ets celui qu'on va afficher et maintenant lui se modifie tt seul grace au postNew
  posts = computed(() => {
    return [...this.postNew(), ...this.postGET() ?? []];
  });

  add(post: Post): void {
    this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', post)
    .subscribe(createdPost => {
      this.postNew.update(arr => [...arr, createdPost])
    });

  }




}



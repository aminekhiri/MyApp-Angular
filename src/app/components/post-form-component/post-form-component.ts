import { Component, effect, inject, input, output, signal } from '@angular/core';
import { Post } from '../../models/post';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './post-form-component.html',
  styleUrl: './post-form-component.scss'
})
export class PostFormComponent {

  posts = signal<Post[]>([]) // état local
  http = inject(HttpClient);



  readonly form = new FormGroup({
    userId: new FormControl(1, { 
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)]
    }),

    title: new FormControl('', { 
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),

    body: new FormControl('', { 
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)]
    })
  });

  // Output qui émet un Post vers le parent
  postSubmit = output<Post>();


  submit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;

      const maxId = this.posts().length > 0  // Vérifie si la liste n'est pas vide
      ? Math.max(...this.posts().map(s => s.id)) //ca permet de recuperer le plus grand id dans la liste
      : 0; // Si la liste est vide, commencer à 0
      
      // Créer le Post à partir des données du formulaire
      const postDto: Post = {
        id: maxId + 1, 
        userId: formValue.userId || 1,
        title: formValue.title || '',
        body: formValue.body || ''
      };

      // Émettre le Post vers le composant parent
      this.postSubmit.emit(postDto);


      
      // Réinitialiser le formulaire après soumission
      //ou apres avoir cliqué sur le bouton reinitialiser
      this.form.reset({
        userId: 1,
        title: '',
        body: ''
      });
    }
  }

}

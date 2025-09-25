import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-counter-component',
  imports: [],
  templateUrl: './counter-component.html',
  styleUrl: './counter-component.scss'
})
export class CounterComponent {

  count = signal(0);
  dcount = computed(() => this.count() * 2);
  tcount = computed(() => this.count()*3);

  increment(){
    this.count.update( c => c + 1);
  }

  reset(){
    this.count.set(0);
  }


  username = signal('Amine');

  constructor() {
    effect(() => {
      console.log('Utilisateur courant : ' + this.username());
    });
  }

  changeUsername(){

    this.username.set('Bob')
  }

}

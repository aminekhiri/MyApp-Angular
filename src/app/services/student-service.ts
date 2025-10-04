import { Injectable } from '@angular/core';
import { Student as StudentDto } from '../models/student';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly _students = signal<StudentDto[]>([
    { id: 1, firstname: 'Alice', name: 'Smith', filiere: 'DaMS', promo: 4, paye: 1000, date: new Date('2022-09-01')
  },
  { id: 2, firstname: 'Bob', name: 'Johnson', filiere: 'DaMS', promo: 3, paye: 1200, date: new Date('2021-09-01')
  },
  ])
  readonly students = this._students.asReadonly() // Contrat public : lecture seule

  add(name: string, paye: number, date: Date, firstname: string, filiere: string, promo: number): void {
    // Générer un ID unique basé sur le plus grand ID existant + 1
    const maxId = this._students().length > 0  // Vérifie si la liste n'est pas vide
      ? Math.max(...this._students().map(s => s.id)) //ca permet de recuperer le plus grand id dans la liste
      : 0; // Si la liste est vide, commencer à 0
    
    const student: StudentDto = {
      id: maxId + 1, // ID unique parce que on ajoute 1 au plus grand id existant dans la liste
      name,
      paye,
      date,
      firstname,
      filiere,
      promo
    };
    this._students.update(list => [...list, student])
  }
  remove(id: number): void {
    this._students.update(list => list.filter(s => s.id !== id))
    
  }
  removeAll(): void {
    this._students.set([])
  }


  update(partial: Partial<StudentDto> & { id: number }): void {
    this._students.update(list =>
    list.map(s => (s.id === partial.id ? { ...s, ...partial } : s))
    )
  }

  
  findById(id: number): StudentDto | undefined {
    return this._students().find(s => s.id === id)
  }
}

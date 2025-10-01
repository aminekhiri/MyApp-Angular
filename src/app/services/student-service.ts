import { Injectable } from '@angular/core';
import { Student as StudentDto } from '../models/student';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly _students = signal<StudentDto[]>([
  {
    id: 1, firstname: 'Alice', name: 'Smith', filiere: 'DaMS', promo: 2, paye: 1000, date: new Date('2022-09-01'),
    hidden: false
  },
  { id: 2, firstname: 'Bob', name: 'Johnson', filiere: 'DaMS', promo: 3, paye: 1200, date: new Date('2021-09-01'),
    hidden: false
  },
  ])
  readonly students = this._students.asReadonly() // Contrat public : lecture seule

  add(name: string, paye: number, date: Date, firstname: string, filiere: string, promo: number): void {
    const student: StudentDto = {
      id: Math.random(), // Générer un ID aléatoire
      name,
      paye,
      date,
      firstname,
      filiere,
      promo,
      hidden: false
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

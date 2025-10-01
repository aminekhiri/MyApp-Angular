import { signalStore, withState, withMethods, patchState } from "@ngrx/signals";
import { Student } from "../models/student";
import { StudentState } from "./student-state";

// Type helper pour les mises à jour partielles d'état
type PartialStateUpdater<T> = (state: T) => Partial<T>;

// Fonctions de mise à jour d'état
function patchAddStudent(student: Student): PartialStateUpdater<{ students: Student[] }> {
    return (state) => ({ 
        students: [...state.students, student] 
    });
}

function patchRemoveStudent(student: Student): PartialStateUpdater<{ students: Student[] }> {
    return (state) => ({ 
        students: state.students.filter((item: Student) => item.id !== student.id) 
    });
}

export const StudentStore = signalStore(
    { providedIn: 'root' },

    withState<StudentState>({ students: [] }), // état initial

    withMethods((store: any) => ({ // retourne un objet contenant les méthodes
        // construit ainsi l'API publique du store
        addStudent(s: Student) {
            patchState(store, patchAddStudent(s));
        },

        removeStudent(id: number) {
            patchState(store, patchRemoveStudent({ id } as Student));
        }
    }))
)
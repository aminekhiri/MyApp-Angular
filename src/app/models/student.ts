export interface Student {
    id: number
    firstname: string
    name: string
    filiere: string
    promo: number
    paye: number
    date: Date
}

type StudentPartial = Partial<Student>
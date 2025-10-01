export interface Student {
    id: number
    firstname: string
    name: string
    filiere: string
    promo: number
    paye: number
    date: Date
    hidden: boolean
}

type StudentPartial = Partial<Student>
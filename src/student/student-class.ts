export class StudentClass {
        
        constructor(
            public id: number,
            public firstname : string,
            public name : string,
            public filiere : string,
            public promo : number,
            public paye : number,
            public date : Date,
            public hidden: boolean,
        ) {
        }

        anneeInscrit(): string {
            const year = this.date.getFullYear();

            if(year<2023){
                return 'alumni'
            }
            else if (year == 2024 || year == 2023 ) {
                return 'étudiant'
            }
            else {
                return 'nouvel inscrit'
            }

        }


}

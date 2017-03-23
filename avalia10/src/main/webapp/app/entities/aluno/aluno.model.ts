import { Turma } from '../turma';
export class Aluno {
    constructor(
        public id?: number,
        public matricula?: string,
        public nome?: string,
        public email?: string,
        public turma?: Turma,
    ) {
    }
}

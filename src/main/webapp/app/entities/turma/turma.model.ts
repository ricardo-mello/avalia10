import { Modulo } from '../modulo';
import { Aluno } from '../aluno';
export class Turma {
    constructor(
        public id?: number,
        public dataInicio?: any,
        public dataFim?: any,
        public modulo?: Modulo,
        public alunos?: Aluno,
    ) {
    }
}

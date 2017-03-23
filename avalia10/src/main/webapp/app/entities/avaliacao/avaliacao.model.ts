import { Aluno } from '../aluno';
import { Modulo } from '../modulo';
import { Turma } from '../turma';
import { Professor } from '../professor';
import { Questao } from '../questao';
export class Avaliacao {
    constructor(
        public id?: number,
        public codigo?: string,
        public objetivo?: string,
        public dataInicio?: any,
        public dataTermino?: any,
        public textoEmail?: string,
        public aluno?: Aluno,
        public modulo?: Modulo,
        public turma?: Turma,
        public professor?: Professor,
        public questoes?: Questao,
    ) {
    }
}

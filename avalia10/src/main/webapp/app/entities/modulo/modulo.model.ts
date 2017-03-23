import { Bloco } from '../bloco';
import { Professor } from '../professor';
import { Turma } from '../turma';
export class Modulo {
    constructor(
        public id?: number,
        public descricao?: string,
        public bloco?: Bloco,
        public professor?: Professor,
        public turmas?: Turma,
    ) {
    }
}

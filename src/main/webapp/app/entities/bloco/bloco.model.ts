import { Curso } from '../curso';
import { Modulo } from '../modulo';
export class Bloco {
    constructor(
        public id?: number,
        public descricao?: string,
        public curso?: Curso,
        public modulos?: Modulo,
    ) {
    }
}

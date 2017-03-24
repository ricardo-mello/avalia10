import { Bloco } from '../bloco';
export class Curso {
    constructor(
        public id?: number,
        public descricao?: string,
        public blocos?: Bloco,
    ) {
    }
}

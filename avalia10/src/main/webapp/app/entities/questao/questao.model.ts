import { Avaliacao } from '../avaliacao';
import { Resposta } from '../resposta';
export class Questao {
    constructor(
        public id?: number,
        public texto?: string,
        public ordem?: number,
        public dataExclusao?: any,
        public avaliacao?: Avaliacao,
        public resposta?: Resposta,
    ) {
    }
}

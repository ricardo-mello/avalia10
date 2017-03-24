
const enum RespostaEnum {
    'NAO_CONCORDO_T',
    'NAO_CONCORDO_P',
    'INDIFERENTE',
    'CONCORDO_P',
    'CONCORDO_T',
    'SEM_AVALIACAO'

};
export class Resposta {
    constructor(
        public id?: number,
        public tipo?: RespostaEnum,
    ) {
    }
}

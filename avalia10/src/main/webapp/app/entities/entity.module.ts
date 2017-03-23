import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Avalia10AlunoModule } from './aluno/aluno.module';
import { Avalia10AvaliacaoModule } from './avaliacao/avaliacao.module';
import { Avalia10BlocoModule } from './bloco/bloco.module';
import { Avalia10CursoModule } from './curso/curso.module';
import { Avalia10ModuloModule } from './modulo/modulo.module';
import { Avalia10ProfessorModule } from './professor/professor.module';
import { Avalia10QuestaoModule } from './questao/questao.module';
import { Avalia10RespostaModule } from './resposta/resposta.module';
import { Avalia10TurmaModule } from './turma/turma.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Avalia10AlunoModule,
        Avalia10AvaliacaoModule,
        Avalia10BlocoModule,
        Avalia10CursoModule,
        Avalia10ModuloModule,
        Avalia10ProfessorModule,
        Avalia10QuestaoModule,
        Avalia10RespostaModule,
        Avalia10TurmaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Avalia10EntityModule {}

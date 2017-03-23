import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Avalia10SharedModule } from '../../shared';

import {
    QuestaoService,
    QuestaoPopupService,
    QuestaoComponent,
    QuestaoDetailComponent,
    QuestaoDialogComponent,
    QuestaoPopupComponent,
    QuestaoDeletePopupComponent,
    QuestaoDeleteDialogComponent,
    questaoRoute,
    questaoPopupRoute,
} from './';

let ENTITY_STATES = [
    ...questaoRoute,
    ...questaoPopupRoute,
];

@NgModule({
    imports: [
        Avalia10SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        QuestaoComponent,
        QuestaoDetailComponent,
        QuestaoDialogComponent,
        QuestaoDeleteDialogComponent,
        QuestaoPopupComponent,
        QuestaoDeletePopupComponent,
    ],
    entryComponents: [
        QuestaoComponent,
        QuestaoDialogComponent,
        QuestaoPopupComponent,
        QuestaoDeleteDialogComponent,
        QuestaoDeletePopupComponent,
    ],
    providers: [
        QuestaoService,
        QuestaoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Avalia10QuestaoModule {}

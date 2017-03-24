import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Avalia10SharedModule } from '../../shared';

import {
    ProfessorService,
    ProfessorPopupService,
    ProfessorComponent,
    ProfessorDetailComponent,
    ProfessorDialogComponent,
    ProfessorPopupComponent,
    ProfessorDeletePopupComponent,
    ProfessorDeleteDialogComponent,
    professorRoute,
    professorPopupRoute,
} from './';

let ENTITY_STATES = [
    ...professorRoute,
    ...professorPopupRoute,
];

@NgModule({
    imports: [
        Avalia10SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProfessorComponent,
        ProfessorDetailComponent,
        ProfessorDialogComponent,
        ProfessorDeleteDialogComponent,
        ProfessorPopupComponent,
        ProfessorDeletePopupComponent,
    ],
    entryComponents: [
        ProfessorComponent,
        ProfessorDialogComponent,
        ProfessorPopupComponent,
        ProfessorDeleteDialogComponent,
        ProfessorDeletePopupComponent,
    ],
    providers: [
        ProfessorService,
        ProfessorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Avalia10ProfessorModule {}

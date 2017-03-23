import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Avalia10SharedModule } from '../../shared';

import {
    CursoService,
    CursoPopupService,
    CursoComponent,
    CursoDetailComponent,
    CursoDialogComponent,
    CursoPopupComponent,
    CursoDeletePopupComponent,
    CursoDeleteDialogComponent,
    cursoRoute,
    cursoPopupRoute,
} from './';

let ENTITY_STATES = [
    ...cursoRoute,
    ...cursoPopupRoute,
];

@NgModule({
    imports: [
        Avalia10SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CursoComponent,
        CursoDetailComponent,
        CursoDialogComponent,
        CursoDeleteDialogComponent,
        CursoPopupComponent,
        CursoDeletePopupComponent,
    ],
    entryComponents: [
        CursoComponent,
        CursoDialogComponent,
        CursoPopupComponent,
        CursoDeleteDialogComponent,
        CursoDeletePopupComponent,
    ],
    providers: [
        CursoService,
        CursoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Avalia10CursoModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Avalia10SharedModule } from '../../shared';

import {
    BlocoService,
    BlocoPopupService,
    BlocoComponent,
    BlocoDetailComponent,
    BlocoDialogComponent,
    BlocoPopupComponent,
    BlocoDeletePopupComponent,
    BlocoDeleteDialogComponent,
    blocoRoute,
    blocoPopupRoute,
} from './';

let ENTITY_STATES = [
    ...blocoRoute,
    ...blocoPopupRoute,
];

@NgModule({
    imports: [
        Avalia10SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BlocoComponent,
        BlocoDetailComponent,
        BlocoDialogComponent,
        BlocoDeleteDialogComponent,
        BlocoPopupComponent,
        BlocoDeletePopupComponent,
    ],
    entryComponents: [
        BlocoComponent,
        BlocoDialogComponent,
        BlocoPopupComponent,
        BlocoDeleteDialogComponent,
        BlocoDeletePopupComponent,
    ],
    providers: [
        BlocoService,
        BlocoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Avalia10BlocoModule {}

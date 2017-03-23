import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Avalia10SharedModule } from '../../shared';

import {
    RespostaService,
    RespostaPopupService,
    RespostaComponent,
    RespostaDetailComponent,
    RespostaDialogComponent,
    RespostaPopupComponent,
    RespostaDeletePopupComponent,
    RespostaDeleteDialogComponent,
    respostaRoute,
    respostaPopupRoute,
} from './';

let ENTITY_STATES = [
    ...respostaRoute,
    ...respostaPopupRoute,
];

@NgModule({
    imports: [
        Avalia10SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RespostaComponent,
        RespostaDetailComponent,
        RespostaDialogComponent,
        RespostaDeleteDialogComponent,
        RespostaPopupComponent,
        RespostaDeletePopupComponent,
    ],
    entryComponents: [
        RespostaComponent,
        RespostaDialogComponent,
        RespostaPopupComponent,
        RespostaDeleteDialogComponent,
        RespostaDeletePopupComponent,
    ],
    providers: [
        RespostaService,
        RespostaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Avalia10RespostaModule {}

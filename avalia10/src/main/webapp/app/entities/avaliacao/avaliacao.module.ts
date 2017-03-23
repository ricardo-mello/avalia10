import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Avalia10SharedModule } from '../../shared';

import {
    AvaliacaoService,
    AvaliacaoPopupService,
    AvaliacaoComponent,
    AvaliacaoDetailComponent,
    AvaliacaoDialogComponent,
    AvaliacaoPopupComponent,
    AvaliacaoDeletePopupComponent,
    AvaliacaoDeleteDialogComponent,
    avaliacaoRoute,
    avaliacaoPopupRoute,
} from './';

let ENTITY_STATES = [
    ...avaliacaoRoute,
    ...avaliacaoPopupRoute,
];

@NgModule({
    imports: [
        Avalia10SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AvaliacaoComponent,
        AvaliacaoDetailComponent,
        AvaliacaoDialogComponent,
        AvaliacaoDeleteDialogComponent,
        AvaliacaoPopupComponent,
        AvaliacaoDeletePopupComponent,
    ],
    entryComponents: [
        AvaliacaoComponent,
        AvaliacaoDialogComponent,
        AvaliacaoPopupComponent,
        AvaliacaoDeleteDialogComponent,
        AvaliacaoDeletePopupComponent,
    ],
    providers: [
        AvaliacaoService,
        AvaliacaoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Avalia10AvaliacaoModule {}

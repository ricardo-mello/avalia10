import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Avaliacao } from './avaliacao.model';
import { AvaliacaoService } from './avaliacao.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-avaliacao',
    templateUrl: './avaliacao.component.html'
})
export class AvaliacaoComponent implements OnInit, OnDestroy {
avaliacaos: Avaliacao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private avaliacaoService: AvaliacaoService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['avaliacao']);
    }

    loadAll() {
        this.avaliacaoService.query().subscribe(
            (res: Response) => {
                this.avaliacaos = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAvaliacaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Avaliacao) {
        return item.id;
    }



    registerChangeInAvaliacaos() {
        this.eventSubscriber = this.eventManager.subscribe('avaliacaoListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

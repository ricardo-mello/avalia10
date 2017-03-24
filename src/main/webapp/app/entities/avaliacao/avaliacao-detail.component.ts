import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Avaliacao } from './avaliacao.model';
import { AvaliacaoService } from './avaliacao.service';

@Component({
    selector: 'jhi-avaliacao-detail',
    templateUrl: './avaliacao-detail.component.html'
})
export class AvaliacaoDetailComponent implements OnInit, OnDestroy {

    avaliacao: Avaliacao;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private avaliacaoService: AvaliacaoService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['avaliacao']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.avaliacaoService.find(id).subscribe(avaliacao => {
            this.avaliacao = avaliacao;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

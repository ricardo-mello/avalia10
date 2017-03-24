import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Resposta } from './resposta.model';
import { RespostaService } from './resposta.service';

@Component({
    selector: 'jhi-resposta-detail',
    templateUrl: './resposta-detail.component.html'
})
export class RespostaDetailComponent implements OnInit, OnDestroy {

    resposta: Resposta;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private respostaService: RespostaService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['resposta', 'respostaEnum']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.respostaService.find(id).subscribe(resposta => {
            this.resposta = resposta;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

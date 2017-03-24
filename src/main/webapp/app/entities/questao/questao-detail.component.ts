import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Questao } from './questao.model';
import { QuestaoService } from './questao.service';

@Component({
    selector: 'jhi-questao-detail',
    templateUrl: './questao-detail.component.html'
})
export class QuestaoDetailComponent implements OnInit, OnDestroy {

    questao: Questao;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private questaoService: QuestaoService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['questao']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.questaoService.find(id).subscribe(questao => {
            this.questao = questao;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

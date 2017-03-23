import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Bloco } from './bloco.model';
import { BlocoService } from './bloco.service';

@Component({
    selector: 'jhi-bloco-detail',
    templateUrl: './bloco-detail.component.html'
})
export class BlocoDetailComponent implements OnInit, OnDestroy {

    bloco: Bloco;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private blocoService: BlocoService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['bloco']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.blocoService.find(id).subscribe(bloco => {
            this.bloco = bloco;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

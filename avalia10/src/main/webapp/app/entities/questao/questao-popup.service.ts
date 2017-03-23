import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Questao } from './questao.model';
import { QuestaoService } from './questao.service';
@Injectable()
export class QuestaoPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private questaoService: QuestaoService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.questaoService.find(id).subscribe(questao => {
                if (questao.dataExclusao) {
                    questao.dataExclusao = {
                        year: questao.dataExclusao.getFullYear(),
                        month: questao.dataExclusao.getMonth() + 1,
                        day: questao.dataExclusao.getDate()
                    };
                }
                this.questaoModalRef(component, questao);
            });
        } else {
            return this.questaoModalRef(component, new Questao());
        }
    }

    questaoModalRef(component: Component, questao: Questao): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.questao = questao;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}

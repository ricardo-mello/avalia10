import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { QuestaoComponent } from './questao.component';
import { QuestaoDetailComponent } from './questao-detail.component';
import { QuestaoPopupComponent } from './questao-dialog.component';
import { QuestaoDeletePopupComponent } from './questao-delete-dialog.component';

import { Principal } from '../../shared';


export const questaoRoute: Routes = [
  {
    path: 'questao',
    component: QuestaoComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.questao.home.title'
    }
  }, {
    path: 'questao/:id',
    component: QuestaoDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.questao.home.title'
    }
  }
];

export const questaoPopupRoute: Routes = [
  {
    path: 'questao-new',
    component: QuestaoPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.questao.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'questao/:id/edit',
    component: QuestaoPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.questao.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'questao/:id/delete',
    component: QuestaoDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.questao.home.title'
    },
    outlet: 'popup'
  }
];

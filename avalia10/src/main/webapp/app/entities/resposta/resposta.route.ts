import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { RespostaComponent } from './resposta.component';
import { RespostaDetailComponent } from './resposta-detail.component';
import { RespostaPopupComponent } from './resposta-dialog.component';
import { RespostaDeletePopupComponent } from './resposta-delete-dialog.component';

import { Principal } from '../../shared';


export const respostaRoute: Routes = [
  {
    path: 'resposta',
    component: RespostaComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.resposta.home.title'
    }
  }, {
    path: 'resposta/:id',
    component: RespostaDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.resposta.home.title'
    }
  }
];

export const respostaPopupRoute: Routes = [
  {
    path: 'resposta-new',
    component: RespostaPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.resposta.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'resposta/:id/edit',
    component: RespostaPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.resposta.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'resposta/:id/delete',
    component: RespostaDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.resposta.home.title'
    },
    outlet: 'popup'
  }
];

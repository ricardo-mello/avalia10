import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { AvaliacaoComponent } from './avaliacao.component';
import { AvaliacaoDetailComponent } from './avaliacao-detail.component';
import { AvaliacaoPopupComponent } from './avaliacao-dialog.component';
import { AvaliacaoDeletePopupComponent } from './avaliacao-delete-dialog.component';

import { Principal } from '../../shared';


export const avaliacaoRoute: Routes = [
  {
    path: 'avaliacao',
    component: AvaliacaoComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.avaliacao.home.title'
    }
  }, {
    path: 'avaliacao/:id',
    component: AvaliacaoDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.avaliacao.home.title'
    }
  }
];

export const avaliacaoPopupRoute: Routes = [
  {
    path: 'avaliacao-new',
    component: AvaliacaoPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.avaliacao.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'avaliacao/:id/edit',
    component: AvaliacaoPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.avaliacao.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'avaliacao/:id/delete',
    component: AvaliacaoDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.avaliacao.home.title'
    },
    outlet: 'popup'
  }
];

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { BlocoComponent } from './bloco.component';
import { BlocoDetailComponent } from './bloco-detail.component';
import { BlocoPopupComponent } from './bloco-dialog.component';
import { BlocoDeletePopupComponent } from './bloco-delete-dialog.component';

import { Principal } from '../../shared';


export const blocoRoute: Routes = [
  {
    path: 'bloco',
    component: BlocoComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.bloco.home.title'
    }
  }, {
    path: 'bloco/:id',
    component: BlocoDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.bloco.home.title'
    }
  }
];

export const blocoPopupRoute: Routes = [
  {
    path: 'bloco-new',
    component: BlocoPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.bloco.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'bloco/:id/edit',
    component: BlocoPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.bloco.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'bloco/:id/delete',
    component: BlocoDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.bloco.home.title'
    },
    outlet: 'popup'
  }
];

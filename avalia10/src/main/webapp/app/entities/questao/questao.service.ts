import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Questao } from './questao.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class QuestaoService {

    private resourceUrl = 'api/questaos';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(questao: Questao): Observable<Questao> {
        let copy: Questao = Object.assign({}, questao);
        copy.dataExclusao = this.dateUtils
            .convertLocalDateToServer(questao.dataExclusao);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(questao: Questao): Observable<Questao> {
        let copy: Questao = Object.assign({}, questao);
        copy.dataExclusao = this.dateUtils
            .convertLocalDateToServer(questao.dataExclusao);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Questao> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.dataExclusao = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.dataExclusao);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private convertResponse(res: any): any {
        let jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].dataExclusao = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].dataExclusao);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}

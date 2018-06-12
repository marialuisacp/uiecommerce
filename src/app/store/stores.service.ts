/*
 *
 *		UI E-commerce
 *		--------------------------
 *		StoresService: Service para pegar o endereco das lojas
 *
 *		Desenvolvido por: maria.luisa 
 *		marialuisaufmg[at]gmail.com
 *
 *
 */

import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { StoresComponent } from './stores.component';

@Injectable()
export class StoresService{
	stores: any[];
	options: any;
	url: string;

	constructor(private _http: Http) {
		this.url = 'assets/data/stores.json';
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS') ;
		headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
		headers.append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method");
		this.options = new RequestOptions({headers: headers});
	}

	getStores(){
		if(this.stores == undefined){
			return this._http
				.get(this.url, this.options)
				.toPromise()
				.then(
					res => {
						console.log(res);
						this.stores = res.json();
						return this.stores;
					}
				);
		}else{ 
			return new Promise((resolve, reject) => {
				resolve(this.stores);
			})
		}
	}
}
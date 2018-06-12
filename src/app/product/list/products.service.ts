/*
 *
 *		UI E-commerce
 *		--------------------------
 *		ProductsService: Service para consumir o json de produtos
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

import { Product } from '../item/product.model';
import { ProductComponent } from '../item/product.component';

@Injectable()
export class ProductsService{
	products: Product[]; 

	constructor(private _http: Http) {
		
	}

	getProducts(){
		if(this.products == undefined){
			return this._http
				.get('assets/data/products.json')
				.toPromise()
				.then(
					res => {
						this.products = res.json();
						return this.products;
					}
				);
		}else{ 
			return new Promise((resolve, reject) => {
				resolve(this.products);
			})
		}
	}

	getProductById(id){
		return this._http
		.get('assets/data/products.json')
		.toPromise()
		.then(
			res => {
				this.products = res.json();
				return this.products[id];
			}
		);
	}
}
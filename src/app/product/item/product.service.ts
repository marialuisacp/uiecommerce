/*
 *
 *		UI E-commerce
 *		--------------------------
 *		ProductService: Service para adicionar e ler os comentarios
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
export class ProductService{
	comments: any[];
	urlApi = 'http://uiecommerce.herokuapp.com/api/';
	urlNewComment = this.urlApi + 'add_comment';
	urlComments = this.urlApi + 'comments/';
	
	newComment = {
		"prod_id": 0,
		"user_id": -1,
		"u_name": null,
		"person": "Usuário não identificado",
		"photo": "avatar.png",
		"text": "",
		"like": 0,
		"deslike": 0
	};
	
	addComment(com, prod_id) {

		this.newComment.prod_id = prod_id;
		this.newComment.text = com;
		console.log(this.newComment.text);

		var json = JSON.stringify(this.newComment);
		var params = 'json=' + json;
		var cabe = new Headers();
		cabe.append('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.urlNewComment, this.newComment)
					.subscribe(
						res => {
							console.log(res);
						},
						err => {
							console.log("Error occured");
						}
		);
	}

	constructor(private _http: Http) {
		
	}

	getcomments(id){
		if(this.comments == undefined){
			return this._http
				.get(this.urlComments + id)
				.toPromise()
				.then(
					res => {
						this.comments = res.json();
						return this.comments;
					}
				);
		}else{ 
			return new Promise((resolve, reject) => {
				resolve(this.comments);
			})
		}
	}
}
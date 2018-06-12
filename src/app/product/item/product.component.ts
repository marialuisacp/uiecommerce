/*
 *
 *		UI E-commerce
 *		--------------------------
 *		ProductComponent: Componente de um produto
 *
 *		Desenvolvido por: maria.luisa 
 *		marialuisaufmg[at]gmail.com
 *
 *
 */

import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Product } from './product.model';
import { ProductsService } from '../list/products.service';
import { ProductService } from './product.service';

@Component({
	templateUrl: './product.component.html',
	styleUrls:  ['../../app.component.scss', './product.component.scss'],
	providers: [ ProductsService, ProductService ]
})

export class ProductComponent {
	
	public product: Product;
	public comments: any;
	public id: number;
	public txtComment: string;

	constructor(private route: ActivatedRoute, private router: Router, private _http: Http, private productsService: ProductsService, private productService: ProductService, private spinnerService: Ng4LoadingSpinnerService) {
		this.comments = [];
		this.product = new Product();
		this.product.name = '';
		this.product.photo = 'item_01.png';
		this.product.description = '';
		this.product.price = 0;
		this.txtComment = "";
		this.id = +this.route.snapshot.params['id'];
		productsService.getProductById(this.id).then(res=>{
			this.product = res;
		});

		this.getCommentsById(this.id);
	}

	addComment(){
		this.comments.push({
			person: 'Usuário não identificado',
			photo: 'avatar.png',
			text: this.txtComment
		});
		this.productService.addComment(this.txtComment, this.id);
		this.txtComment = "";
	}
	
	getCommentsById(id){
		this.spinnerService.show();
		this.productService.getcomments(id).then(res => {
			this.spinnerService.hide();
			console.log(res);
			this.comments = res;
		});
	}
}

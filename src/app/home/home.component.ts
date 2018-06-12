/*
 *
 *		UI E-commerce
 *		--------------------------
 *		HomeComponent: Componente da home	
 *
 *		Desenvolvido por: maria.luisa 
 *		marialuisaufmg[at]gmail.com
 *
 *
 */

import { DomSanitizer } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { Router, RouterLink } from '@angular/router';

import { Product } from '../product/item/product.model';
import { ProductComponent } from '../product/item/product.component';
import { ProductsService } from '../product/list/products.service';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['../app.component.scss', './home.component.scss'],
	providers: [ ProductsService ]
})

export class HomeComponent {
	
	numberHome = 7;
	allProducts: any;
	filters: Product[];
	typeOrder = 0;
	category = '';

	constructor(private router: Router, private _http: Http, private sanitizer: DomSanitizer, private productsService: ProductsService){
		productsService.getProducts().then(res=>{
			this.allProducts = res;
			
		});
	}

	goToProduct(id){
		let url = '/product/' + (id).toString();
		this.router.navigate([url]);
	}
}

/*
 *
 *		UI E-commerce
 *		--------------------------
 *		ListProductsComponent: Componente da lista de um produto
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

import { Product } from '../item/product.model';
import { ProductComponent } from '../item/product.component';
import { ProductsService } from './products.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
	templateUrl: './products.component.html',
	styleUrls: ['../../app.component.scss', './products.component.scss'],
	providers: [ ProductsService ]
})

export class ListProductsComponent {
	
	public term: string;
	public allProducts: any;
	filters: Product[];
	typeOrder = 0;
	category = '';

	constructor(private router: Router, private _http: Http, private sanitizer: DomSanitizer, private productsService: ProductsService, private spinnerService: Ng4LoadingSpinnerService){
		this.spinnerService.show();
		productsService.getProducts().then(res=>{
			this.spinnerService.hide();
			this.allProducts = res;
		});
	}

	filterProducts(p: Product[]): Product[]{
		if(p != undefined){
			if(this.category != "" && this.category != "all"){
				this.filters = [];
				p.forEach(item => {
					if(item.category == this.category){
						this.filters.push(item);
					}
				});
				return this.filters;
			}
		}
		return p;
	}

	oderByName	(n1, n2) {if (n1.name < n2.name) return -1; else if(n1.name > n2.name) return 1; else return 0; }
	oderByPrice(n1, n2) {if (n1.price < n2.price) return -1; else if(n1.price > n2.price) return 1; else return 0; }
	oderByNameDecrease(n1, n2) {if (n1.name < n2.name) return 1; else if(n1.name > n2.name) return -1; else return 0; }
	oderByPriceDecrease(n1, n2) {if (n1.price < n2.price) return 1; else if(n1.price > n2.price) return -1; else return 0; }

	orderChanged(e){
		if(this.typeOrder == 1)
			this.allProducts.sort(this.oderByPrice);
		if(this.typeOrder == 2)
			this.allProducts.sort(this.oderByPriceDecrease);
		if(this.typeOrder == 3)
			this.allProducts.sort(this.oderByName);
		if(this.typeOrder == 4)
			this.allProducts.sort(this.oderByNameDecrease);
	}

	categoryChanged(e){
		this.filterProducts(this.allProducts);
	}

	goToProduct(id){
		let url = '/product/' + (id).toString();
		this.router.navigate([url]);
	}
}

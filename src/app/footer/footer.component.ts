/*
 *
 *		UI E-commerce
 *		--------------------------
 *		FooterComponent: Componente do rodape	
 *
 *		Desenvolvido por: maria.luisa 
 *		marialuisaufmg[at]gmail.com
 *
 *
 */


import { Component, ViewChild, ElementRef } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { Router, RouterLink, ActivatedRoute } from '@angular/router';


@Component({
	selector: 		'app-footer',
	templateUrl: 	'./footer.component.html',
	styleUrls: ['../app.component.scss', './footer.component.scss'],
	providers: 		[]
})

export class FooterComponent {

	@ViewChild('footer') el:ElementRef;

	constructor(private route: ActivatedRoute, private router: Router, private _http: Http) {

	}
}

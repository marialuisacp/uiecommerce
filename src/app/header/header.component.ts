/*
 *
 *		M-App 				:: minha primeira aplicação em Angular 4
 *		--------------------------
 *		Componente do projeto	:: leitura dos dados via json
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

@Component({
	selector: 		'app-header',
	templateUrl: 	'./header.component.html',
	styleUrls: 	['../app.component.scss','./header.component.scss'],
	providers: 		[]
})

export class HeaderComponent {

	constructor(private route: ActivatedRoute, private router: Router, private _http: Http) {

	}

}

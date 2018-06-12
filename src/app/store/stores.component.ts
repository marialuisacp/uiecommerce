/*
 *
 *		UI E-commerce
 *		--------------------------
 *		StoresComponent: Componente de exibicao das lojas
 *
 *		Desenvolvido por: maria.luisa 
 *		marialuisaufmg[at]gmail.com
 *
 *
 */

import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, NgModel, NgForm } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { NgIf } from '@angular/common';  
import { CommonModule } from '@angular/common';  
import { HostListener } from '@angular/core';

import { GoogleMapsAPIWrapper } from '@agm/core';
import { AgmMap } from '@agm/core';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { TimerObservable } from "rxjs/observable/TimerObservable";

import { DomSanitizer } from '@angular/platform-browser';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { Router, RouterLink } from '@angular/router';

import { StoresService } from './stores.service';

@Component({
	templateUrl: './stores.component.html',
	styleUrls: ['../app.component.scss', './stores.component.scss'],
	providers: [ StoresService ]
})

export class StoresComponent implements OnInit{
	
	public stores: any;
	public typeOrder = 0;
	public itemSelected: any;
	public category = '';
	public zoom = 0;
	public latitude = 0;
	public longitude = 0;
	public customStyle = [{"elementType": "geometry", "stylers": [{"color": "#f5f5f5"} ] }, {"elementType": "labels.icon", "stylers": [{"visibility": "off"} ] }, {"elementType": "labels.text.fill", "stylers": [{"color": "#616161"} ] }, {"elementType": "labels.text.stroke", "stylers": [{"color": "#f5f5f5"} ] }, {"featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{"color": "#bdbdbd"} ] }, {"featureType": "poi", "elementType": "geometry", "stylers": [{"color": "#eeeeee"} ] }, {"featureType": "poi", "elementType": "labels.text.fill", "stylers": [{"color": "#757575"} ] }, {"featureType": "poi.park", "elementType": "geometry", "stylers": [{"color": "#e5e5e5"} ] }, {"featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{"color": "#9e9e9e"} ] }, {"featureType": "road", "elementType": "geometry", "stylers": [{"color": "#ffffff"} ] }, {"featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{"color": "#757575"} ] }, {"featureType": "road.highway", "elementType": "geometry", "stylers": [{"color": "#dadada"} ] }, {"featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{"color": "#616161"} ] }, {"featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{"color": "#9e9e9e"} ] }, {"featureType": "transit.line", "elementType": "geometry", "stylers": [{"color": "#e5e5e5"} ] }, {"featureType": "transit.station", "elementType": "geometry", "stylers": [{"color": "#eeeeee"} ] }, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#c9c9c9"} ] }, {"featureType": "water", "elementType": "labels.text.fill", "stylers": [{"color": "#9e9e9e"} ] } ];

	constructor(private router: Router, private _http: Http, private sanitizer: DomSanitizer, private storeService: StoresService){
		storeService.getStores().then(res=>{
			this.stores = res;
		});
	}

	ngOnInit() {
		this.zoom = 12;
		this.latitude = -23.726088;
		this.longitude = -46.700813;
	}

	private itemClick(m, index){
		this.itemSelected = m;
		console.log(m);
		this.latitude = m.latLong[0];
		this.longitude = m.latLong[1];
		this.zoom = 17;
	}
}

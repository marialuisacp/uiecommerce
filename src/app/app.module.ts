import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from "@angular/router";
import { APP_BASE_HREF, Location } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/item/product.component';
import { ListProductsComponent } from './product/list/products.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { StoresComponent } from './store/stores.component';

import { ProductsService } from './product/list/products.service';

const appRoutes: Routes = [
	{ 	path: '', redirectTo: 'home', pathMatch: 'full' },
	{ 	path: 'product/:id', component: ProductComponent },
	{ 	path: 'products', component: ListProductsComponent },
	{ 	path: 'stores', component: StoresComponent },
	{ 	path: 'home', component: HomeComponent },
	{	path: '**', component: AppComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		HeaderComponent,
		ListProductsComponent,
		ProductComponent,
		FooterComponent,
		StoresComponent
	],
	imports: [
		RouterModule.forRoot(
			appRoutes,
			{ 
				enableTracing: true,
				useHash: false
			}
		),
		BrowserModule,
		HttpModule,
		Ng2SearchPipeModule,
		FormsModule,
		FormsModule,
		CommonModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyABY_N-4BUhdLzaX_L6ItYtquA3SuCzGxY',
			libraries: ["places"]
		}),
		Ng4LoadingSpinnerModule.forRoot()
	],
	providers: [ProductsService, { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' }],
	bootstrap: [AppComponent]
})

export class AppModule { }

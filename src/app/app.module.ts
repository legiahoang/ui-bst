import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing';
import {HttpModule, JsonpModule} from '@angular/http';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {NgxAdminLteModule} from 'ngx-admin-lte';
import {
	ModalModule,
	BsModalService,
	PaginationModule,
	TooltipModule
} from 'ngx-bootstrap';
import {DataTableModule} from "angular2-datatable";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdDialogModule, MdButtonModule} from '@angular/material';
import {AppComponent} from './app.component';
import {SecureComponent} from './layout/secure';
import {ScopeModule} from './secure/scope'
import {CompanyComponent} from './secure/company';
import {ActivityModule} from './secure/activity';
import {AlertDialog} from './secure/dialog';
import {ListRoleComponent, EditRoleComponent} from './secure/role';
import {ListUserComponent, EditUserComponent, CreateUserComponent} from './secure/user';

@NgModule({
	declarations: [
		AppComponent,
		SecureComponent,
		ListRoleComponent,
		EditRoleComponent,
		ListUserComponent,
		EditUserComponent,
		CreateUserComponent,
		CompanyComponent,
		AlertDialog
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule, JsonpModule,
		AngularMultiSelectModule,
		NgxAdminLteModule,
		ModalModule.forRoot(),
		PaginationModule.forRoot(),
		TooltipModule.forRoot(),
		DataTableModule,
		BrowserAnimationsModule,
		MdDialogModule,
		MdButtonModule,
		ScopeModule,
		ActivityModule
	],
	providers: [BsModalService],
	bootstrap: [AppComponent],
	entryComponents: [
		AlertDialog,
		EditRoleComponent, CreateUserComponent, EditUserComponent
	]
})
export class AppModule {
}

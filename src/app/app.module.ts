import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule, MatGridListModule, MatDialogModule, MAT_DIALOG_DATA, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CountryInfoComponent } from './country-info/country-info.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CountryService } from './services/country.service';
import { DataShareService } from './services/data-share.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryInfoComponent,
    NotFoundComponent,
    CountriesListComponent
  ],
  entryComponents: [
    CountryInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      // {
      //   path: 'country/:countryCode',
      //   component: CountryInfoComponent
      // },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]),
    BrowserAnimationsModule,
    // NgbModule.forRoot()
  ],
  providers: [
    CountryService,
    DataShareService,
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

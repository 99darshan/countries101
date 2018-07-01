import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { CountryService } from '../services/country.service';
import { CountriesListComponent } from '../countries-list/countries-list.component';
import { CountryInfoComponent } from '../country-info/country-info.component';
import { Overlay } from '@angular/cdk/overlay';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public searchTerm  = '';
  public searchedCountry = [];
  isSearched = false;

  constructor(private router: Router,
              private _overlay: Overlay,
              private service: CountryService,
              private _toast: MatSnackBar,
              public matDialog: MatDialog) {

  }

  ngOnInit() {
  }

  public onSearchInputChange(event: any): void {
    console.log(event.target.value);
    this.searchTerm = event.target.value;
  }

  public onSearchButtonClick(event: any): void {
    console.log('on clicked called');
    // clear searched entry
    // console.log(this.data.name);
    this.service.fetchCountries(this.searchTerm)
                .subscribe(
                  (response) => {
                    // set searchTerm to empty so that it will be cleared from the input field
                    this.searchTerm = '';
                    console.log('response inside: ' + response.json());
                    this.searchedCountry = response.json();
                    this.isSearched = true;
                    // NOTE: REST country api will return with 404 status code if no countries are found
                    // hence control shouldn't reach inside this code block, in place just for fail safe
                    if (this.searchedCountry.length === 0 && this.isSearched) {
                      this.router.navigate(['**']);
                    }
                    // If only one country is found for the search term show the country info dialog
                    if (this.searchedCountry.length === 1 && this.isSearched) {
                      // show dialog of country info
                      const matDialogRef = this.matDialog.open(CountryInfoComponent, {
                        width: '100vw',
                        panelClass: 'custom-mat-dialog-container',
                        data: { country: this.searchedCountry[0] }
                      });
                      this.displayToastMessage(`${this.searchedCountry.length} Country found.`, 'Close');
                      // this.router.navigate(['country', this.searchedCountry[0].alpha2Code]);
                      // this.router.navigateByUrl('country/ne');
                    }

                    // if more than 1 country is returned by API, then country-list component is rendered from view
                    if (this.searchedCountry.length > 1 && this.isSearched) {
                      this.displayToastMessage(`${this.searchedCountry.length} Countries found.`, 'Close');
                    }
                },
                (error: AppError) => {
                  console.log(error);
                  if (error instanceof NotFoundError) {
                    this.displayToastMessage(`No countries found for "${this.searchTerm}"`, 'Close');
                    this.router.navigate(['**']);
                  } else {
                    this.displayToastMessage('Unexpected Error Occured!', 'Close');
                  }
                });
  }

  private displayToastMessage(message: string, action: string) {
    this._toast.open(message, action, {
      duration: 1500,
      panelClass: 'custom-snackbar'
    });
  }

}

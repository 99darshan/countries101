import { Component, OnInit, Input, Inject } from '@angular/core';
import { DataShareService } from '../services/data-share.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogRef, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
// import * as countries from '../../data/countries.json';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.css']
})
export class CountryInfoComponent implements OnInit {
  // @Input() searchedCountry: object;
  hasSameNativeName = false;
  latitude = 0;
  longitude = 0;
  // This is a local copy of data of all countries response from rest countries
  countriesJson = require('../../data/countries.json');
  borderCountries = [];
  // public country = [];
  constructor(// private dataShareService: DataShareService,
              // private _route: ActivatedRoute,
              private _matDialog: MatDialog,
              private _matDialogRef: MatDialogRef<CountryInfoComponent>,
              private _matIconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    // this.countriesJson = require('../../data/countries.json');

    // this._route.paramMap.subscribe((params: ParamMap) => {
    //   // this.country = this.dataShareService.searchedData;
    //   const countryCode = params.get('countryCode');

    //   this.country = this.dataShareService.searchedData.filter((con) => {
    //     console.log(con.alpha2Code + '------' + countryCode);
    //     return con.alpha2Code === countryCode;
    //   });
    // });

    this.hasSameNativeName = this.data.country.name === this.data.country.nativeName;
    this.latitude = this.data.country.latlng[0];
    this.longitude = this.data.country.latlng[1];
    this.determineBorderCountries(this.data.country.borders);
    console.log(this.latitude + '---' + this.longitude);
  }

  // takes alpha3Code of each border country as input
  // and retrieves all data for each border countries and stores in borderCountries array
  // adds svg flag of all borders to angular material addSvgIcon, so that svg can be used as icons
  private determineBorderCountries(bordersAlpha3Code: Array<string>) {
    bordersAlpha3Code.forEach(code => {
      console.log('code: ' + code);
      this.countriesJson.forEach(con => {
        if (con.alpha3Code === code) {
          this.borderCountries.push(con);
        }
      });
      // const matchedCon = this.countriesJson.find(con => con.bordersAlpha3Code === code);
      // this.borderFlags.push(matchedCon.flag);
    });
    this.borderCountries.forEach(con => console.log('border flags:  ' + con.flag));

    // convert svg flags to icons
    this.convertFlagSvgToIcons(this.borderCountries);
  }

  private convertFlagSvgToIcons(countries) {
    countries.forEach(con => {
      this._matIconRegistry.addSvgIcon(con.alpha2Code, this._domSanitizer.bypassSecurityTrustResourceUrl(con.flag));
      // this._matIconRegistry.addSvgIcon(con.alpha2Code, con.flag);
    });
  }

  public onFlagClick(event: any, country: any): void {
    // TODO: check if country is not a blank object

    // close the existing dialog
    this._matDialogRef.close();

    // open new dialog
    const matDialogRef = this._matDialog.open(CountryInfoComponent, {
      width: '100vw',
      panelClass: 'custom-mat-dialog-container',
      data: { country: country }
    });
  }

  // TODO: if searchData in dataShareService is null or empty redirect to homepage
  // TODO: verify if the routed alpha2Code matches with the country, else show 404

}

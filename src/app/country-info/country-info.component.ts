import { Component, OnInit, Input, Inject } from '@angular/core';
import { DataShareService } from '../services/data-share.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
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
  borderFlags = [];
  // public country = [];
  constructor(// private dataShareService: DataShareService,
              // private _route: ActivatedRoute,
              private _matDialog: MatDialog,
              private _matDialogRef: MatDialogRef<CountryInfoComponent>,
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
    this.determineBorderFlags(this.data.country.borders);
    console.log(this.latitude + '---' + this.longitude);
  }

  determineBorderFlags(bordersAlpha3Code: Array<string>) {
    bordersAlpha3Code.forEach(code => {
      console.log('code: ' + code);
      this.countriesJson.forEach(con => {
        if (con.alpha3Code === code) {
          this.borderFlags.push(con);
        }
      });
      // const matchedCon = this.countriesJson.find(con => con.bordersAlpha3Code === code);
      // this.borderFlags.push(matchedCon.flag);
    });
    console.log('border flag determiner called');
    this.borderFlags.forEach(con => console.log(con.flag));
  }

  onFlagClick(event: any, country: any): void {
    // TODO: check if country is not a blank object

    // close the existing dialog
    this._matDialogRef.close();

    // open new dialog
    const matDialogRef = this._matDialog.open(CountryInfoComponent, {
      height: '80vh',
      width: '100vw',
      data: { country: country }
    });
  }

  // TODO: if searchData in dataShareService is null or empty redirect to homepage
  // TODO: verify if the routed alpha2Code matches with the country, else show 404

}

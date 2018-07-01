import { Component, OnInit, Inject, Input } from '@angular/core';
import {DataShareService} from '../services/data-share.service';
import { MatDialog, MatDialogRef, matDialogAnimations } from '@angular/material/dialog';
import { CountryInfoComponent } from '../country-info/country-info.component';



@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})
export class CountriesListComponent implements OnInit {
  @Input() countries: any;
  // inject data passed in to the dialog
  constructor(
              private _dataService: DataShareService,
              public matDialog: MatDialog) { }

  // countries = [];
  ngOnInit() {
    // this.countries = this._dataService.searchedData;
    // this.countries.forEach(con => console.log(con.name));
  }

  onCountryClick(country) {
    console.log('country clicked: ' + country.alpha2Code);
    this.matDialog.open(CountryInfoComponent, {
      width: '100vw',
      panelClass: 'custom-mat-dialog-container',
      data: {country: country}
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CountryService } from '../services/country.service';
// import * as countries from '../../data/countries.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public searchTerm  = '';
  public data = require('../../data/countries.json');
  public searchedCountry = [];
  isSearched = false;

  constructor(private router: Router,
              private service: CountryService) {

  }


  ngOnInit() {
  }

  public onSearchInputChange(event: any): void {
    console.log(event.target.value);
    this.searchTerm = event.target.value;
  }

  public onSearchButtonClick(event: any): void {
    console.log(this.data);
    // console.log(this.data.name);

    this.service.fetchCountries(this.searchTerm)
                .subscribe((response) => {
                  console.log('response: ' + response);
                  this.searchedCountry = response.json();
                });

    console.log(this.searchedCountry);
    console.log('length of searched items: ' + this.searchedCountry.length);

    // this.searchedCountry = this.data.filter(con =>
    //   con.name === this.searchTerm
    // );

    this.isSearched = true;

    // navigate to 404 if no country is found
    if (this.searchedCountry.length === 0 && this.isSearched) {
      this.router.navigate(['**']);
    }

    // If only one country is found for the search term
    // navigate to that country info route
    if (this.searchedCountry.length === 1 && this.isSearched) {
      this.router.navigate(['country', this.searchedCountry[0].alpha2Code]);
      // this.router.navigateByUrl('country/ne');
    }
  }
}

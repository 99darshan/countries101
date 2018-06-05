import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // fetch countries by name, here {name} specifies the search term
  // https://restcountries.eu/rest/v2/name/{name}?fullText=true
  private baseUrl = 'https://restcountries.eu/rest/v2/name/';

  constructor(private http: Http) { }

  fetchCountries(country) {
    this.baseUrl += country + '?fullText=false';
    console.log(this.baseUrl);
    return this.http.get(this.baseUrl);
  }

}

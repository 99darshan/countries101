import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = '';

  constructor(private http: Http) { }

  fetchCountries(country) {
    // fetch countries by name, here {name} specifies the search term
    // https://restcountries.eu/rest/v2/name/{name}?fullText=true
    this.baseUrl = 'https://restcountries.eu/rest/v2/name/' + country + '?fullText=false';
    console.log(this.baseUrl);
    return this.http.get(this.baseUrl);
  }

}

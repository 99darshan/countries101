import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

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
    return this.http.get(this.baseUrl)
      // .pipe(map(response => response.json))
      .pipe( catchError(this.handleErrors) // not call the function, just pass in the reference
        // catchError((err: Response) => {
        // if (err.status === 404) {
        //   return throwError(new NotFoundError());
        // }
        // return throwError(new AppError(err));
        // })
      );
  }

  private handleErrors(err: Response) {
    // TODO: add BadRequestError for 400 status, similary for 500
    if (err.status === 404) {
      return throwError(new NotFoundError());
    }
    return throwError(new AppError(err));
  }
}

import { Component, OnInit, Input, Inject } from '@angular/core';
import { DataShareService } from '../services/data-share.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.css']
})
export class CountryInfoComponent implements OnInit {
  // @Input() searchedCountry: object;

  public country = [];
  constructor(private dataShareService: DataShareService,
              private _route: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // since ngOnIt is instantiated only once when the compnonet is first loaded
    // activatedRoute should be used to call the ngOnit on param Change
    // this._route.params.forEach(() => {
    //   console.log('info-onit-param change called');
    //   this.dataShareService.searchedData.forEach((c) => {
    //     console.log(c.name);
    //   });
    //   this.country = this.dataShareService.searchedData;
    // });

    this._route.paramMap.subscribe((params: ParamMap) => {
      // this.country = this.dataShareService.searchedData;
      const countryCode = params.get('countryCode');

      this.country = this.dataShareService.searchedData.filter((con) => {
        console.log(con.alpha2Code + '------' + countryCode);
        return con.alpha2Code === countryCode;
      });
    }); 
  }

  // TODO: if searchData in dataShareService is null or empty redirect to homepage
  // TODO: verify if the routed alpha2Code matches with the country, else show 404

}

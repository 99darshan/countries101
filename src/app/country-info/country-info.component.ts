import { Component, OnInit, Input } from '@angular/core';
import { DataShareService } from '../services/data-share.service';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.css']
})
export class CountryInfoComponent implements OnInit {
  // @Input() searchedCountry: object;

  private country = [];
  constructor(private dataShareService: DataShareService) { }

  ngOnInit() {
    this.country = this.dataShareService.searchedData;
    console.log('country-info init: ' + this.dataShareService.searchedData);
    // console.log('country-info name: ' + this.country[0].name + this.dataShareService[0].name);
  }

  // TODO: if searchData in dataShareService is null or empty redirect to homepage
  // TODO: verify if the routed alpha2Code matches with the country, else show 404

}

import { Component } from '@angular/core';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss'],
})
export class CountryTableComponent {
  public countries!: Country[];

  constructor(private service: CountryService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.countries = data;
    });
  }

  public editaCountry(country: Country) {
    let newCountry = { ...country };
    this.service.countrySelect(newCountry);
  }

  public delete(country: Country) {
    this.service.delete(country).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.countries = data;
      });
    });
  }
}

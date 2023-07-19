import { Component } from '@angular/core';
import { Country } from 'src/app/country/models/country';
import { Speedway } from '../../models/speedway';
import { SpeedwayService } from '../../services/speedway.service';
import { CountryService } from 'src/app/country/services/country.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private service: SpeedwayService, private countryService: CountryService) {}

  public countries!: Country[];

  public country = {} as Country;

  public speedways!: Speedway[];

  public speedway = {} as Speedway;

  ngOnInit(): void {
    this.service.emitEvent.subscribe({
      next: (res: any) => {
        this.speedway = res[0];
      },
    });
    this.countryService.listAll().subscribe((data) => {
      this.countries = data;
    });
  }

  public getSpeedwayByName() {
    this.service.getSpeedwayByName(this.speedway.name).subscribe((data) => {
      this.speedways = data;
    })
  }

  public getSpeedwayByCountry(country: Country){
    this.service.getSpeedwayByCountry(country).subscribe((data) => {
      this.speedways = data;
    })
  }

  public cancela(){
    this.speedway = {} as Speedway;
    this.getSpeedwayByCountry(this.country)
  }

}

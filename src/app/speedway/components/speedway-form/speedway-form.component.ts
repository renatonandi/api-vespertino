import { Component, OnInit } from '@angular/core';
import { SpeedwayService } from '../../services/speedway.service';
import { Speedway } from '../../models/speedway';
import { Country } from 'src/app/country/models/country';
import { CountryService } from 'src/app/country/services/country.service';

@Component({
  selector: 'app-speedway-form',
  templateUrl: './speedway-form.component.html',
  styleUrls: ['./speedway-form.component.scss']
})
export class SpeedwayFormComponent implements OnInit {
  constructor(private service: SpeedwayService, private countryService: CountryService) { }
  public busca: boolean = false;

  public countries!: Country[];
  public country: Country = {} as Country;

  public speedways!: Speedway[];
  public speedway: Speedway = {} as Speedway;

  public cancel: boolean = false;

  public buttonCancel() {
    if (this.speedway.name == '' || this.speedway.size == null) {
      return true
    }
    return false
  }

  public buscar(){
    return this.busca = !this.busca;
  }

  ngOnInit(): void {
    this.countryService.listAll().subscribe((data) => {
      this.countries = data;
    });

    this.service.emitEvent.subscribe({
      next: (res: Speedway) => {
        this.speedway = res;
        let country = this.countries.find((country) => this.speedway.country.id === country.id )
        if(country !== undefined){
          this.speedway.country = country;
        }
      },
    });

  }

  public getSpeedwayByName() {
    this.service.getSpeedwayByName(this.speedway.name).subscribe((data) => {
      this.speedways = data;
    })
  }

  public cancela(){
    this.speedway = {} as Speedway;
  }

  public saveSpeedway() {
    if (this.speedway.id) {
      this.service.update(this.speedway).subscribe((data) => {
        this.speedway = {} as Speedway;
      })
    } else {
      this.service.insert(this.speedway).subscribe((data) => {
        this.speedway = {} as Speedway;
      })
    }
  }


}

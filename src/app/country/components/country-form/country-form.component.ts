import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent implements OnInit{
  constructor(private service: CountryService) {}
  
  public countries!: Country[];

  public country = {} as Country;


  ngOnInit(): void {
    this.service.emitEvent.subscribe({
      next: (res: any) => {
        this.country = res[0];
      },
    });
  }
  public cancela(){
    this.country = {} as Country;
  }

  public getCountryByName() {
    this.service.getCountryByName(this.country.name).subscribe((data) => {
      this.countries = data;
    })
  }

  public saveCountry(){
    if(this.country.id){
      this.service.update(this.country).subscribe((data) => {
        this.country = {} as Country;
      })
    }else{
      this.service.insert(this.country).subscribe((data) => {
        this.country = {} as Country;
      })
    }
  }

}

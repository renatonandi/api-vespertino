import { Component, OnInit } from '@angular/core';
import { SpeedwayService } from '../../services/speedway.service';
import { Speedway } from '../../models/speedway';
import { Country } from 'src/app/country/models/country';

@Component({
  selector: 'app-speedway-table',
  templateUrl: './speedway-table.component.html',
  styleUrls: ['./speedway-table.component.scss']
})
export class SpeedwayTableComponent implements OnInit{
  constructor(private service: SpeedwayService) { }

  public speedways!: Speedway[];

  
  ngOnInit(): void {
    this.service.listAll().subscribe((data)=> {
      this.speedways = data;
    });
  }

  public editaSpeedway(speedway: Speedway){
    const newSpeedway: Speedway = { ...speedway };
    this.service.speedwaySelect(newSpeedway);
  }

  public delete(speedway: Speedway){
    this.service.delete(speedway).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.speedways = data;
      })
    })
  }

}

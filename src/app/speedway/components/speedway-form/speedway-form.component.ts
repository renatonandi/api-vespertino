import { Component, OnInit } from '@angular/core';
import { SpeedwayService } from '../../services/speedway.service';
import { Speedway } from '../../models/speedway';

@Component({
  selector: 'app-speedway-form',
  templateUrl: './speedway-form.component.html',
  styleUrls: ['./speedway-form.component.scss']
})
export class SpeedwayFormComponent implements OnInit{
  constructor(private service: SpeedwayService) {}

  public speedways!: Speedway[];

  public speedway = {} as Speedway;



  ngOnInit(): void {
    this.service.emitEvent.subscribe({
      next: (res: any) => {
        this.speedway = res[0];
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

  public saveSpeedway(){
    if(this.speedway.id){
      this.service.update(this.speedway).subscribe((data) => {
        this.speedway = {} as Speedway;
      })
    }else{
      this.service.insert(this.speedway).subscribe((data) => {
        this.speedway = {} as Speedway;
      })
    }
  }

}

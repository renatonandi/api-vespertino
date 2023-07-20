import { Component } from '@angular/core';
import { SpeedwayService } from '../../services/speedway.service';

@Component({
  selector: 'app-speedway',
  templateUrl: './speedway.component.html',
  styleUrls: ['./speedway.component.scss']
})
export class SpeedwayComponent {
  public botao: boolean = false;

constructor(private service: SpeedwayService) { }

public botaoBusca(){
  this.botao = !this.botao;
  this.service.botaoBusca();
}

}

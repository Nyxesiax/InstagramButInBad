import { Component, OnInit } from '@angular/core';
import { PicturesService } from 'src/app/Service/pictures.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private picturesService: PicturesService) { }

  ngOnInit() {
  }

  get pictures() {
    return this.picturesService.pictures;
  }
}

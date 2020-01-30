import { Component, OnInit } from '@angular/core';
import { PicturesService } from 'src/app/Service/pictures.service';
import { Pictures } from 'src/app/models/pictures';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private picturesService: PicturesService) {
  }

  ngOnInit() {
  }

  // PicArray aus Service für HTML als fake property bereitstellen
  get pictures() {

    return this.picturesService.pictures();
  }
}

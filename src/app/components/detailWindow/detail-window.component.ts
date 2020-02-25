import { Component, OnInit } from '@angular/core';
import {Pictures} from '../../models/pictures';
import {PicturesService} from '../../Service/pictures.service';

@Component({
  selector: 'app-detail-window',
  templateUrl: './detail-window.component.html',
  styleUrls: ['./detail-window.component.css']
})
export class DetailWindowComponent implements OnInit {

  constructor(private picturesService: PicturesService) { }

  ngOnInit() {
  }

  /*get picture() {
    return this.picturesService.showSinglePicture();
  }*/

}

import { Component, OnInit } from '@angular/core';
import { PicturesService } from 'src/app/Service/pictures.service';
import { UploadImage } from 'src/app/models/upload-image';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  tags: string;
  description: string;
  timestamp: Date;


  base64textString: string;

  constructor(
    public pictureservice: PicturesService
  ) { }
  public url: string;



  ngOnInit() {
  }

  fileSelect(event) {
    const files = event.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._convertFileToBase64.bind(this);
      reader.readAsBinaryString(file);

    }
  }

  _convertFileToBase64(readerEvt) {
    // file to string
    const binaryString = readerEvt.target.result;
    // Encode string to base64
    this.base64textString = btoa(binaryString);
    console.log('Upload Image Base64: ', this.base64textString);
  }

  upload() {

    // Objekt für Upload erstellen
    const img = new UploadImage();

    // Objekt mit Daten füllen
    img.tags = this.tags;
    img.url = this.base64textString;
    img.description = this.description;
    img.likes = 0;
    img.timestamp = new Date(Date.now());
    this.timestamp = img.timestamp;
    this.url = img.url;

    // Save in Firestore
    this.pictureservice.upload(img);

    // HTML Felder leeren
    this.tags = '';
    this.base64textString = '';
    this.description = '';

  }

}

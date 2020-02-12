import { Injectable } from '@angular/core';
import {UsersService} from './users.service';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(public userService: UsersService) { }
}

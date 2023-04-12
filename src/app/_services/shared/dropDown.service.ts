import { Injectable } from '@angular/core';
import { DataService } from '../Data.service';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { DropdownApi } from 'src/app/_models/setup/Dropdown';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {
  
    constructor( private router: Router, private http: HttpClient,private DataService: DataService,) {
    }

    GetDistrict() {
      return this.http.get<DropdownApi>(`${environment.apiUrl}/DropDown/GetDistrictsLOV`)
      .pipe(map(res =>{
        return res;
      }));
    }
    
    GetCountries() {
      return this.http.get<DropdownApi>(`${environment.apiUrl}/DropDown/GetCountriesLOV`)
      .pipe(map(res =>{
        return res;
      }));
    }
    GetNatonality() {
      return this.http.get<DropdownApi>(`${environment.apiUrl}/DropDown/GetCountriesLOV`)
      .pipe(map(res =>{
        return res;
      }));
    }
    GetCities() {
      return this.http.get<DropdownApi>(`${environment.apiUrl}/DropDown/GetCitiesLOV`)
      .pipe(map(res =>{
        return res;
      }));
    }
            
      
    GetProfession() {
      return this.http.get<DropdownApi>(`${environment.apiUrl}/DropDown/GetProfessionsLOV`)
      .pipe(map(res =>{
        return res;
      }));
    }

    GetManufacturers() {
      return this.http.get<DropdownApi>(`${environment.apiUrl}/DropDown/GetManufacturersLOV`)
      .pipe(map(res =>{
        return res;
      }));
    }
    GetProducts() {
      return this.http.get<DropdownApi>(`${environment.apiUrl}/DropDown/GetProductsLOV`)
      .pipe(map(res =>{
        return res;
      }));
    }
    GetProductUnits() {
      return this.http.get<DropdownApi>(`${environment.apiUrl}/DropDown/GetProductUnitsLOV`)
      .pipe(map(res =>{
        return res;
      }));
    }
        


}
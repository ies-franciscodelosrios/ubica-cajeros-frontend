import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DTO_CashierByRadius_Request } from '../model/DTO_CashierByRadius_Request';
import { ICashier } from '../model/ICashier';

@Injectable({
  providedIn: 'root'
})
export class CashierService {
  
  private url:string = "http://localhost:8080/api/cashiers";

  constructor(private http:HttpClient) { 
      
  }

  getAll():Observable<ICashier[]>{
    return this.http.get<ICashier[]>(this.url);
  }

  get(id:number):Observable<ICashier>{
    return this.http.get<ICashier>(this.url+'/'+id);
  }

  create(cashier:ICashier):Observable<ICashier>{
    return this.http.post<ICashier>(this.url, cashier);
  }

  update(cashier:ICashier):Observable<ICashier>{
    return this.http.put<ICashier>(this.url, cashier);
  }

  remove(id:number):Observable<ICashier>{
    return this.http.delete<ICashier>(this.url+'/'+id);
  }

  getCashiersByRadius(client,lat,lng,distance):Observable<any>{
    if(!client || !lat || !lng || !distance || distance <=0 ){
      throw new Error("Error en datos");
    };

    let data:DTO_CashierByRadius_Request={
      client:client,
      lat:lat,
      lng:lng,
      distance:distance
    }
    const endpoint =environment.api.url+environment.api.endpoint.cashiersbyradius;
    console.log(data)
    return this.http.post(endpoint, data, {
               headers: { 'Content-Type': 'application/json' }
            });
  }

  getCashiersByRadiusDefault(client,lat,lng):Observable<any>{
    if(!client || !lat || !lng){
      throw new Error("Error en datos");
    };

    let data:DTO_CashierByRadius_Request={
      client:client,
      lat:lat,
      lng:lng,
    }
    const endpoint =environment.api.url+environment.api.endpoint.cashiersbydefaultradius;
    console.log(data)
    return this.http.post(endpoint, data, {
               headers: { 'Content-Type': 'application/json' }
            });
  }

  getCashiersByCP(cp):Observable<any>{
    if(!cp || cp < 0 ){
      throw new Error("Error en datos");
    };

    const endpoint =environment.api.url+environment.api.endpoint.cashiersbycp;

    return this.http.get(endpoint+"/"+cp, {
               headers: { 'Content-Type': 'application/json' }
            });
  }
}

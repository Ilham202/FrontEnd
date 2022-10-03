import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  token = localStorage.getItem('token');

  header = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
  requestOptions = { headers: this.header };
  url = 'http://localhost:5001/comparetwosheets';

  constructor(private http: HttpClient) {
  }

  upload(file1: File,file2:File): Observable<HttpEvent<any>> {
    
    const formData: FormData = new FormData();

    formData.append('Summary', file1);
    formData.append('ESA',file2);
    const req = new HttpRequest('POST', `http://localhost:5001/comparetwosheets`, formData, {
      headers:this.header,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  export(){
    return this.http.get(`http://localhost:5001/excelexport`,{observe:'response',responseType:'blob',headers:this.header,})
  }

}
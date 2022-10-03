import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse,HttpClient } from '@angular/common/http';
import { UploadFileService } from '../../services/upload-file.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 

interface Emp{
  empId:String;
  empName:String;
  fromDate:String;
  toDate:String;
  tsProjectBillableHours:Number;
  grandTotalFromSummary:Number;
  difference:Number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  @ViewChild('TABLE', { static: false }) 'TABLE': ElementRef;  
  title = 'Excel';  

  selectedFiles?: FileList;
  selectedFile?: FileList;
  currentFile?: File;
  currentFile2?: File;
  message = '';
  errorMsg = '';
  showVal=false;
  respData:Emp[]=[];
  

  constructor(
    private uploadService: UploadFileService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  selectFile2(event: any): void {
    this.selectedFile = event.target.files;
  }
  submit():void{
    this.errorMsg = '';

    if (this.selectedFiles && this.selectedFile) {
      const file: File | null = this.selectedFiles.item(0);
      const file2: File | null =this.selectedFile.item(0);

      if (file && file2) {
        this.currentFile = file;
        this.currentFile2 = file2;
        this.uploadService.upload(this.currentFile,this.currentFile2).subscribe(
       
          (data: any) => {
            this.respData=data.body;
            this.showVal=true;
            this.currentFile = undefined;
            this.currentFile2 = undefined;
          });
      }

      this.selectedFiles = undefined;
      this.selectedFile = undefined;
    }
  }
  
  onLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('uId');
    this.router.navigate(['/login']);
  }
  public ExportTOExcel():void{
    console.log("&&&&");
    this.uploadService.export()
    .subscribe(
      (response)=>{
        let fileName:string=response.headers.get('Content-Disposition')?.split(';')[1].split('=')[1]!;
        console.log(fileName);
        let blob:Blob=response.body as Blob;
        let a= document.createElement('a');
        a.download=fileName;
        a.href= window.URL.createObjectURL(blob);
        a.click();
        console.log(response);

      }
    );
   
  }


}

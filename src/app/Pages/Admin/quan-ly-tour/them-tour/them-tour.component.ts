import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { themTour } from '../../models/them-tour.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoiTac } from '../../models/doi-tac.model';
import { QuanLyTourService } from '../../services/quan-ly-tour.service';
import { DoiTacService } from '../../services/DoiTac/doi-tac.service';
import { ChangeEventArgs, DateTimePicker } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-them-tour',
  templateUrl: './them-tour.component.html',
  styleUrl: './them-tour.component.css'
})
export class ThemTourComponent implements OnInit, OnDestroy {
  submitted = false;
  //form group
  ThemTourForm: FormGroup = new FormGroup({
    idTour: new FormControl('123'),
    tenTour: new FormControl(''),
    loaiTour: new FormControl(''),
    phuongTienDiChuyen: new FormControl(''),
    moTa: new FormControl(''),
    soLuongNguoiLon: new FormControl(0),
    soLuongTreEm: new FormControl(0),
    thoiGianBatDau: new FormControl(''),
    thoiGianKetThuc: new FormControl(''),
    noiKhoiHanh: new FormControl(''),
    soChoConNhan: new FormControl(0),
    idDoiTac: new FormControl(''),
    giaTreEm: new FormControl(0),
    giaNguoiLon: new FormControl(0),
    ngayThem: new FormControl(new Date()),
    dichVuDiKem: new FormControl(''),
    tinhTrang: new FormControl('z')
  });



  private addTourSubscribtion?: Subscription;

 


  Text: string = '';
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount'
  };

  constructor(
    public domSanitizer: DomSanitizer,
    private quanLyTourService: QuanLyTourService,
    private router: Router,
    private toastr: ToastrService,
    private doiTacServices: DoiTacService
  ) {
   
  }

  onFieldTouched(fieldName: string): void {
    this.ThemTourForm.get(fieldName)?.markAsTouched();
  }

  ngOnDestroy(): void {
    this.addTourSubscribtion?.unsubscribe();
  }
  DoiTac: any[] = [];
  ngOnInit(): void {

    //lấy đối tác
    this.doiTacServices.getAllDoiTac().subscribe((data: DoiTac[]) => {
      this.DoiTac = data;
      console.log(this.DoiTac);

    })

    let datetimepicker: DateTimePicker = new DateTimePicker({
      placeholder: "Select DateTime",
      change: (args: ChangeEventArgs) => {
        const selectedDate = args.value as Date;
        const formattedDate = this.formatDate(selectedDate);
        var a = new Date(formattedDate).toISOString();
        this.ThemTourForm.get('thoiGianBatDau')?.setValue(a);
      }
    });
    datetimepicker.appendTo('#element');

    let datetimepicker2: DateTimePicker = new DateTimePicker({
      placeholder: "Select DateTime2",
      change: (args: ChangeEventArgs) => {
        const selectedDate = args.value as Date;
        const formattedDate = this.formatDate(selectedDate);
        var a = new Date(formattedDate).toISOString();
        this.ThemTourForm.get('thoiGianKetThuc')?.setValue(a);
      }
    });
    datetimepicker2.appendTo('#element2');
    }

    formatDate(date: Date): string {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth trả về giá trị từ 0 đến 11
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }


    get sanitizedText() {
      const moTaControl = this.ThemTourForm.get('moTa');
      return this.domSanitizer.bypassSecurityTrustHtml(moTaControl?.value || '');
    }
    

  get f(): { [key: string]: any } {
    return this.ThemTourForm.controls;
  }

  //thêm tour
  ThemTour() {
    console.log(this.ThemTourForm.value);
    
    // Bây giờ bạn có thể sử dụng tourData để thực hiện các thao tác tiếp theo
    this.addTourSubscribtion = this.quanLyTourService.themTourDuLich(this.ThemTourForm.value)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/quanlytour');
          // console.log(response);
          this.toastr.success('Thêm tour thành công', 'Thông báo', {
            timeOut: 1000,
          });
        }
      })


  }


  onFormSubmit() {

  }


  selectedFile: any[] = [];
  previewingFileImg: any[] = [];
  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
  
        const reader = new FileReader();
        reader.onload = (e) => {
          // Khởi tạo hoặc lấy FormArray 'imgSelected'
          let imgSelectedControl = this.ThemTourForm.get('imgSelected') as FormArray<any>;
          if (!imgSelectedControl) {
            imgSelectedControl = new FormArray<any>([]);
            this.ThemTourForm.addControl('imgSelected', imgSelectedControl);
          }
  
          // Thêm new FormControl vào FormArray và ép kiểu
          imgSelectedControl.push(new FormControl(e.target?.result as string));
          
          // Thêm chuỗi Base64 vào mảng previewingFileImg
          this.previewingFileImg.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
    console.log(this.previewingFileImg);
  }
  
  XoaImgPreviewing(index: number) {
    // Lấy FormArray 'imgSelected' và xóa FormControl tương ứng
    let imgSelectedControl = this.ThemTourForm.get('imgSelected') as FormArray<any>;
    if (imgSelectedControl) {
      imgSelectedControl.removeAt(index);
    }
  
    // Xóa khỏi mảng previewingFileImg
    this.previewingFileImg.splice(index, 1);
  }
  

  themTour(){

  }










































}














































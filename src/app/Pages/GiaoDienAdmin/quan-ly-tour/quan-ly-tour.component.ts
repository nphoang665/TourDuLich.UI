import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-quan-ly-tour',
  templateUrl: './quan-ly-tour.component.html',
  styleUrl: './quan-ly-tour.component.css'
})
export class QuanLyTourComponent {
  Text: string = '';
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount'
  };
  constructor(public domSanitizer: DomSanitizer) { }
  Test() {
    console.log(this.Text);

  }
}

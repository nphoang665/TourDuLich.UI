import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-them-tour',
  templateUrl: './them-tour.component.html',
  styleUrl: './them-tour.component.css'
})
export class ThemTourComponent {
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
  get sanitizedText() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.Text);
  }
}



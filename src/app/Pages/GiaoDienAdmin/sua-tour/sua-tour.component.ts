import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sua-tour',
  templateUrl: './sua-tour.component.html',
  styleUrl: './sua-tour.component.css'
})
export class SuaTourComponent {
  Text: string = '';
  IsDisplayPreviewDescription: boolean = false;

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
  Fn_Display_Description() {
    if (this.IsDisplayPreviewDescription === false) {
      this.IsDisplayPreviewDescription = true;
    }
    else {
      this.IsDisplayPreviewDescription = false;
    }
  }
}

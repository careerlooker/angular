import { Component, OnInit, ViewEncapsulation, Output,EventEmitter,Input } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class TextEditorComponent {

  @Input()description: any = '';
  @Output()jobDescription:EventEmitter<any>=new EventEmitter<any>();
  @Output()Company:EventEmitter<any>=new EventEmitter<any>();
  @Output()profesionalSummary:EventEmitter<any>=new EventEmitter<any>();
  
  constructor() { }
  public tools: object = {
    items: ['Undo', 'Redo', '|',

      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',

      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',

      'SubScript', 'SuperScript', '|',

      'LowerCase', 'UpperCase', '|',

      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',

      'Indent', 'Outdent', '|', 'CreateLink',

      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']

  };

    public quickTools: object = {
    image: [
      'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '-', 'Display', 'AltText', 'Dimension']

  };

  public iframe: object = { enable: true };
  public height: number = 300;
  public width:number=700;


  onSubmit(form: NgForm) {
  }
}







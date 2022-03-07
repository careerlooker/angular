import {Directive, ElementRef, HostBinding, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  dropDownMenu: HTMLElement;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    if ( this.dropDownButton.nativeElement.contains(event.target) ) {
      this.dropDownMenu.classList.toggle('show');
    } else {
      this.dropDownMenu.classList.remove('show');
    }
  }

  constructor(private dropDownButton: ElementRef) { }

  ngOnInit(): void {
    this.dropDownMenu = this.dropDownButton.nativeElement.querySelector('.dropdown-menu');
  }
}
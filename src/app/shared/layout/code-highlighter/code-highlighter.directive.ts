import {Directive, ElementRef} from '@angular/core';

import 'prismjs/';

@Directive({
  selector : '[cCode]'
})
export class CodeHighlighterDirective {

  constructor(public el: ElementRef) {
  }

  ngOnInit() {
    Prism.highlightElement(this.el.nativeElement, false);
  }

  public highlight() {
    Prism.highlightElement(this.el.nativeElement, false);
  }

}

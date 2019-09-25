import {Directive, HostListener, ElementRef, Renderer2, Output, EventEmitter, Input, OnChanges, OnInit} from '@angular/core';

@Directive({
  selector: '[appEditable]'
})
export class ContentEditableDirective implements OnInit, OnChanges{
  origModel: string;
  @Input('appEditable') model: any;
  @Output('contentBlur') update = new EventEmitter();
  getText = () => {
    console.log(this.elementRef);
    return this.elementRef.nativeElement.value;
  }

  constructor( private elementRef: ElementRef ) { }

  ngOnInit() {
    this.origModel = this.getText();
  }

  ngOnChanges(changes) {
    if (changes.model.isFirstChange()) { this.refreshView() }
  }

  setContentEditable(b: boolean) {
    this.elementRef.nativeElement.setAttribute('contenteditable', b);
  }

  @HostListener('click') click() {
    this.elementRef.nativeElement.setAttribute('contenteditable', 'true');
    this.elementRef.nativeElement.focus();
  }

  @HostListener('blur')
  emitChange() { // focus lost, emit if changed
    this.setContentEditable(false);
    const t = this.getText();
    if (this.origModel !== t) { this.update.emit(t); }
    this.origModel = t;
    console.log(t);
    return t;
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e) {
    if (e.which === 13) { // enter
      e.preventDefault();
      this.emitChange();
    } else if (e.which === 27) { // esc
      e.preventDefault();
      this.refreshView();
      this.setContentEditable(false);
    }
  }

  private refreshView() {
    this.elementRef.nativeElement.innerText = this.model;
  }

}

import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-replies-options',
  templateUrl: './replies-options.component.html',
  styleUrls: ['./replies-options.component.css']
})
export class RepliesOptionsComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() checked:string="";

  constructor() { }

  markAsChecked(option:string):void{
    this.checked = option;
    this.newItemEvent.emit(option);
  }

  ngOnInit(): void {
  }

}

import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.css'],
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'trnaslateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
         transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300)),
      // transition('highlighted => normal', animate(500))
    ]),
    trigger('wildState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'trnaslateX(0) scale(1)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
         transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
         transform: 'translateX(0px) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(500)),
      transition('shrunken <=> *', [
        style({
          backgroundColor: 'orange'
        }),
        animate(100, style({
          borderRadius: '50px'
        })),
        animate(500)
      ])
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'trnaslateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          opacity: 0,
          transform: 'translateX(+100px)'
        }))
      ]),
      // transition('highlighted => normal', animate(500))
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'trnaslateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            opacity: 0,
            transform: 'translateX(-100px)',
            offset: 0
          }),
          style({
            opacity: 0.5,
            transform: 'translateX(-50px)',
            offset: 0.3
          }),
          style({
            opacity: 1,
            transform: 'translateX(-20px)',
            offset: 0.8
          }),
          style({
            opacity: 1,
            transform: 'translateX(0px)',
            offset: 1
          }),
        ]))
      ]),
      transition('* => void', [
        animate(300, style({
          opacity: 0,
          transform: 'translateX(+100px)'
        }))
      ]),
      // transition('highlighted => normal', animate(500))
    ]),
  ]
})
export class AnimationsComponent implements OnInit {
  // animation is what happens between two states
  // void state element has not yet been added
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  constructor() {}

  ngOnInit() {}

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  onAnimate() {
    this.state === 'highlighted' ? this.state = 'normal' : this.state = 'highlighted';
    this.wildState === 'highlighted' ? this.wildState = 'normal' : this.wildState = 'highlighted';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }
}

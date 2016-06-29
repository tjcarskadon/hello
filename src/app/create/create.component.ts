import { Component, OnInit } from '@angular/core';
import { RecordService } from './services/record.service';

var Leap = require('leapjs');
require('leapjs-plugins/main/leap-plugins-0.1.11.js');
var t = require('leapjs-rigged-hand/build/leap.rigged-hand-0.1.7.js');
var LeapTrainer = require('lt/leaptrainer.js');



@Component({
  selector: 'create',
  template: require('./create.component.html'), 
  styles: [require('./create.component.css')], 
  providers: [RecordService]
})
export class Create implements OnInit {

  trainerCtrl;
  trainer;
  options = ['Record', 'Test', 'Save'];

  constructor(private recordService: RecordService) {
    
  }

  recordGesture(name) {
    this.recordService.record(this.trainer, name);
  }

  ngOnInit() {
    this.trainerCtrl = new Leap.Controller();
    this.trainer = new LeapTrainer.Controller({controller: this.trainerCtrl});
    console.log(this.trainerCtrl);
    this.trainerCtrl.on('connect', () => console.log('connected'));
    // trainerCtrl.connect();
    this.trainerCtrl.use('riggedHand').connect()
      .on('connect', () => {
        console.log('connected');
      });


    this.trainerCtrl.on('frame', function(frame) {
      if (frame.pointables.length) {
        console.log(document.getElementsByTagName('canvas'));
        // console.log(frame);
      }
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { RecordService } from './services/record.service';
import { AppState } from '../app.service';

@Component({
  selector: 'create',
  template: require('./create.component.html'), 
  styles: [require('./create.component.css')], 
  providers: [RecordService, AppState]
})
export class Create implements OnInit {

  trainerCtrl;
  trainer;
  context = this;
  options = [
  {name: 'Record', fn: this.recordGesture, context: this},
  {name: 'Test', fn: this.testGesture},
  {name: 'Save', fn: this.saveGesture}
  ];
  Leap;
  LeapTrainer;
  gestureName: string;

  constructor(private recordService: RecordService, private appState: AppState) {
    this.Leap = require('leapjs');
    this.appState._initRiggedHand();
    this.LeapTrainer = require('lt/leaptrainer.js');
  }

  recordGesture(name) {
    //TODO: handle no user input for gesture name
    this.context.recordService.record(this.context.trainer, this.context.gestureName);
  }

  testGesture(name) {
    console.log('test')
  }

  saveGesture(name) {
    console.log('save')
  }

  ngOnInit() {
    this.trainerCtrl = new this.Leap.Controller();
    this.trainer = new this.LeapTrainer.Controller({controller: this.trainerCtrl});
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

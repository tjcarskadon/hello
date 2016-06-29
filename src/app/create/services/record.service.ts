// import { Injectable } from '@angular/core';

// @Injectable()

// export class RecordService { 

  
// }

import { Injectable } from '@angular/core';
import { HmrState } from 'angular2-hmr';

@Injectable()
export class RecordService {
  constructor() {

  }

  record(trainer, name) {
    trainer.create(name.toUpperCase());
  }

  save() {

  }

  test() {

  }
}

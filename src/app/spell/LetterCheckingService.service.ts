import { Injectable } from '@angular/core';
import { AppState } from '../app.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppState } from '../app.service';

@Injectable()
export class LetterCheckingService {

  private letters = ['a', 'b', 'c', 'd', 'e', 'f', 'l', 'o', 's', 'u', 'w'];
  private url: string = '';

  getLetter() {
    return this.letters[Math.floor(Math.random() * 11)];
  }
  
  controller = this.appState._initLeapController();
  
  constructor(private appState: AppState,
              private http: Http) {
    this.controller.connect();
    this.watch();
  }

  watch() {
    this.controller.on ('frame', (frame) => {

      frame.hands.forEach((hand) => {
      console.log('inside frame');
        let data = [];
        let input = {};
        //input['target'] = this.targetLetter;
        input['rotated'] = hand.pinky.mcpPosition[1] - hand.indexFinger.mcpPosition[1];
        input['thumbExtended'] = hand.thumb.stabilizedTipPosition[2] - hand.indexFinger.mcpPosition[2]; //this could be wrong
        input['indexExtended'] = hand.indexFinger.extended;
        input['middleExtended'] = hand.middleFinger.extended;
        input['ringExtended'] = hand.ringFinger.extended;
        input['pinkyExtended'] = hand.pinky.extended;

        input['gh'] = hand.indexFinger.stabilizedTipPosition[0] - hand.middleFinger.stabilizedTipPosition[0];
        input['td'] = hand.thumb.stabilizedTipPosition[1] - hand.indexFinger.mcpPosition[1];
        input['md'] = hand.indexFinger.mcpPosition[1] - hand.middleFinger.stabilizedTipPosition[1];
        input['id'] = hand.middleFinger.mcpPosition[1] - hand.indexFinger.stabilizedTipPosition[1];
        input['tbr'] = hand.ringFinger.stabilizedTipPosition[0] - hand.thumb.stabilizedTipPosition[0];        
        input['ibm'] = hand.middleFinger.stabilizedTipPosition[1] - hand.indexFinger.stabilizedTipPosition[1];
        input['uvk'] = hand.indexFinger.stabilizedTipPosition[0] = hand.indexFinger.stabilizedTipPosition[0];
        input['vk'] = hand.ringFinger.stabilizedTipPosition[1] - hand.thumb.stabilizedTipPosition[1];
        input['xd'] = hand.middleFinger.stabilizedTipPosition[2] - hand.thumb.stabilizedTipPosition[2];
        input['x'] = hand.indexFinger.stabilizedTipPosition[1] - hand.indexFinger.pipPosition[1];
        input['f'] = hand.indexFinger.stabilizedTipPosition[1] - hand.thumb.stabilizedTipPosition[1];
        
        console.log(input);
      })
    })
  }

  sendInput(input): Observable<Response> {
    let body = JSON.stringify (input);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, body, options)
                .map(this.extractData)
                .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  sendInput() {
    
  }

}
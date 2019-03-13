import Proxy0 from './Proxy0';
import RespMesg from './RespMesg';

export default class Resp {
  constructor(respJsonData) {
    this.data = respJsonData.data;//Business Data
    this.done = respJsonData.done;//true: No Unknown Exception,false: has Unknown Exception
    if (Proxy0._.isPlainObject(respJsonData.mesg) && !Proxy0._.isEmpty(respJsonData.mesg)) { //Result Message Object, Required if done is false
      this.mesg = new RespMesg(respJsonData.mesg);
    }
  }

  getMesg() {
    return this.mesg;
  }

  getMessage() {
    return this.mesg ? this.mesg.getMessage() : undefined;
  }
}

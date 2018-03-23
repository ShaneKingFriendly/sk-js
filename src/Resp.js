import _ from 'lodash';
import RespMesg from './RespMesg';

export default class Resp {
  constructor(respJsonData) {
    this.data = respJsonData.data;//Business Data
    this.done = respJsonData.done;//true: No Unknown Exception,false: has Unknown Exception
    if (_.isPlainObject(respJsonData.mesg) && !_.isEmpty(respJsonData.mesg)) { //Result Message Object, Required if done is false
      this.mesg = new RespMesg(respJsonData.mesg);
    }
  }
}

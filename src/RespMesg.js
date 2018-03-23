import _ from 'lodash';
import Codes from './Codes';
import Mesgs from './Mesgs';

export default class RespMesg {
  static TYPE = {
    SUCCESS: 'Success', //Just prompt
    INFO: 'Info', //Just prompt
    WARNING: 'Warning', //Business continue, but must prompt
    ERROR: 'Error', //Unknown Exception(done == false), UI will prompt details; Business Stop(done == true), process by component
  };

  constructor(mesg) {
    this.type = mesg.type;//Message Type
    this.code = mesg.code;//Message Code or Message Content
    this.args = mesg.args;//Message Arguments, Array or Object, format by skFmtArr or skFmt
  }

  getMessage() {
    const msg = Mesgs.get(this.code);
    let rtn = this.code;
    if (Array.isArray(this.args)) {
      rtn = msg.skFmtArr(this.args.map(arg => {
        let tmpRtn = null;
        if (_.isPlainObject(arg) && arg.code && arg.id) {
          tmpRtn = Codes.get(arg.code).find(item => {
            return item.id === arg.id;
          });
          tmpRtn = tmpRtn ? tmpRtn.text : arg;
        } else {
          tmpRtn = arg;
        }
        return tmpRtn;
      }));
    } else if (_.isPlainObject(this.args) && !_.isEmpty(this.args)) {
      rtn = msg.skFmt(this.args);
    } else if (msg !== this.code) {
      rtn = msg;
    }
    return rtn;
  }

  getType() {
    return this.type;
  }
}

export default class Resp {
  constructor(respJsonData) {
    this.code = respJsonData.code;//-1:Unknown Exception;0:Successfully;1+:Known Exception
    this.data = respJsonData.data;//Business Data
    this.mesg = respJsonData.mesg;//Required if code is not 0
  }

  getMesg() {
    return this.mesg;
  }
}

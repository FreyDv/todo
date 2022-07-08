export class ValidMsgDto {
  id: number;
  msg: string;
  msFromUnix: number;

  constructor(id, msg, min) {
    this.id = id;
    this.msg = msg;
    this.msFromUnix = min;
  }
}

import {Pictures} from './pictures';
import {PicComment} from './pic.comment';

export class Post {
  // tslint:disable-next-line:max-line-length
  constructor(public owner: string, public picture: Pictures, public comments: PicComment[], public id?: string) {}
}

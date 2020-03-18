import {Pictures} from './pictures';
import {PicComment} from './pic.comment';

export class Post {
  constructor(public owner: string, public picture: Pictures, public comments: PicComment[], public id?: string) {}
}

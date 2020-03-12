import {Pictures} from './pictures';
import {PicComment} from './pic.comment';

export class Post {
  constructor(public picture: Pictures, public comments: PicComment[]) {}
}

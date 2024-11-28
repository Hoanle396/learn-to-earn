import { Meta } from '../classes/meta';

export interface IResponse<T> {
  meta?: Meta;
  data?: T | Array<T>;
}

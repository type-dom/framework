// 泛型接口
import { IJsonData, IJsonDataProp } from '../../interface';
import { Observer } from '../observer';

export interface IXProxy<T extends IJsonData> extends IJsonData {
  _target: T;
  __ob__?: Observer;
  // [propName: string]: string | number | boolean | IXProxy | IJsonData | undefined;
  [propName: string]:  T | Observer | IJsonDataProp | IXProxyHandler<T> | any;
}

export interface IXProxyHandler<T extends IJsonData> {
  /**
   * Handle the 'get' operation on the target object.
   * @param target The original object wrapped by the XProxy instance.
   * @param prop The name or Symbol of the property to get.
   * @param receiver
   * @returns The returned value after applying custom logic.
   */
  get?(target: T, prop: string, receiver?: (...rest: string[]) => void): IJsonDataProp;

  /**
   * Handle the 'set' operation on the target object.
   * @param target The original object wrapped by the XProxy instance.
   * @param prop The name or Symbol of the property to set.
   * @param value The new value to assign to the property.
   * @param receiver
   * @returns A Boolean indicating whether the set operation was successful.
   */
  set?(target: T, prop: string, value: IJsonDataProp, receiver?: (...rest: string[])=> void): boolean;

  /**
   * Handle the 'has' operation on the target object.
   * @param target
   * @param prop
   */
  deleteProperty?(target: T, prop: string): void;
}

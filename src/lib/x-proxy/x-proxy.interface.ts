import { XProxy } from './x-proxy.class';
// 泛型接口
export interface IXProxy<T> {
  _target: T;
  // [propName: string]: string | number | boolean | IXProxy | IXProxyConfig | undefined;
  // [propName: string]: T;
}

export interface IXProxyConfig {
  [propName: string]: IXProxyProp;
}

export type IXProxyProp = string | number | boolean | IXProxyConfig | IXProxyConfig[] | undefined;

export interface IXProxyHandler<T extends IXProxyConfig> {
  /**
   * Handle the 'get' operation on the target object.
   * @param target The original object wrapped by the XProxy instance.
   * @param prop The name or Symbol of the property to get.
   * @returns The returned value after applying custom logic.
   */
  get?(target: T, prop: string): IXProxyProp;

  /**
   * Handle the 'set' operation on the target object.
   * @param target The original object wrapped by the XProxy instance.
   * @param prop The name or Symbol of the property to set.
   * @param value The new value to assign to the property.
   * @returns A Boolean indicating whether the set operation was successful.
   */
  set?(target: T, prop: string, value: IXProxyProp): boolean;
}

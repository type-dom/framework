/**
 * TypeRoot是一个元素根节点抽象类
 * 作为前端项目的入口文件要继承根节点抽象类，并挂载到对应的 ID 上。
 */
import { TypeDiv } from '../type-element/type-html/div/div.abstract';
import { ITypeRoot, ITypeRootOption } from './type-root.interface';
/**
 * el 元素对象或ID；
 * parent 只有自己 TypeRoot
 */
export abstract class TypeRoot extends TypeDiv implements ITypeRoot {
  parent: TypeRoot;
  protected constructor(option: ITypeRootOption) {
    super();
    this.parent = this;
    if (option.el instanceof HTMLElement) {
      option.el.appendChild(this.dom);
    } else {
      const app = document.querySelector<Element>(option.el);
      if (app) {
        app.appendChild(this.dom);
      } else {
        throw Error('Can not find id . ');
      }
    }
  }
}

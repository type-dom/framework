import { camelToDash } from '@type-dom/utils';
import { XElement } from '../../components/x-element/x-element.class';
import { vHash } from '../type-element/type-element.abstract';
import { ITypeAttribute } from '../type-element/type-element.interface';
import { TypeHtml } from '../type-html/type-html.abstract';
import { TypeSvg } from '../type-svg/type-svg.abstract';

export class Attribute {
  private el: TypeHtml | TypeSvg | XElement;
  private obj: ITypeAttribute;

  constructor(el: TypeHtml | TypeSvg | XElement) {
    this.el = el;
    this.obj = {};
  }

  get<T>(key: string): T {
    return this.obj[key] as T;
  }

  getObj<T extends ITypeAttribute>(): T {
    return this.obj as T;
  }

  setObj<T extends ITypeAttribute>(attrObj?: T): void {
    for (const key in attrObj) {
      if (Object.hasOwnProperty.call(attrObj, key)) {
        // todo 如何优化
        const value = attrObj?.[key] as string | number;
        this.set(key, value);
      }
    }
  }

  addObj<T extends ITypeAttribute>(attrObj?: T): void {
    if (attrObj === undefined) {
      return;
    }
    for (const key in attrObj) {
      if (Object.hasOwnProperty.call(attrObj, key)) {
        const value = attrObj[key] as string | number;
        this.add(key, value);
      }
    }
  }

  /**
   * 重置属性
   * 清理原有属性，
   * @param attrObj
   */
  resetObj<T extends ITypeAttribute | undefined>(attrObj?: T): void {
    if (attrObj === undefined) {
      return;
    }
    this.clearObj();
    this.setObj(attrObj);
  }

  renderObj<T extends ITypeAttribute>(attrObj?: T): void {
    if (attrObj === undefined) {
      attrObj = this.obj as T;
    }
    for (const key in attrObj) {
      if (Object.hasOwnProperty.call(attrObj, key)) {
        const value = attrObj[key] as string | number;
        this.render(key, value);
      }
    }
  }

  removeObj<T extends ITypeAttribute>(attrObj?: T): void {
    if (attrObj === undefined) {
      return;
    }
    for (const key in attrObj) {
      if (Object.hasOwnProperty.call(attrObj, key)) {
        delete this.obj[key];
        this.el.dom?.removeAttribute(key);
      }
    }
  }

  clearObj(): void {
    // 需要专门清理一下DOM上的属性
    for (const attr in this.obj) {
      this.el.dom?.removeAttribute(attr);
      delete this.obj[attr];
    }
  }

  // 设置属性 dom 属性同步变化
  set(key: string, value?: string | number | boolean): void {
    this.add(key, value);
    this.render(key, value);
  }

  // 添加属性
  add(key: string, value?: string | number | boolean): void {
    this.getObj()[key] = value;
  }

  // 渲染属性
  //  todo 如何新的属性值和原来的属性值一样，要拦截掉。
  private render(key: string, value?: string | number | boolean): void {
    // dom渲染时， 驼峰转中划线连接
    if (
      key !== 'viewBox' &&
      key !== 'spreadMethod' &&
      key !== 'gradientUnits'
    ) {
      key = camelToDash(key);
    }
    if (!this.el.dom) {
      this.el.dom = document.createElement(this.el.nodeName);
    }
    const dom = this.el.dom;
    if (dom) {
      if (value === true) {
        if (dom.getAttribute(key) === '') {
          return;
        }
        dom.setAttribute(key, '');
      } else if (value === false) {
        if (!dom.getAttribute(key)) {
          return;
        }
        dom.removeAttribute(key);
      } else if (value === undefined) {
        // console.log('value is ', value);
        if (!dom.getAttribute(key)) {
          return;
        }
        dom.removeAttribute(key);
      } else {
        const val = value.toString();
        if (dom.getAttribute(key) === val) {
          return;
        }
        dom.setAttribute(key, val);
      }
    }
  }

  remove(key: string): void {
    delete this.obj[key];
    this.el.dom?.removeAttribute(key);
  }

  setName(value: string): void {
    this.addName(value);
    this.renderName(value);
  }

  addName(value: string | number): void {
    this.add('name', value);
  }

  renderName(value: string): void {
    this.render('name', value);
  }

  setId(id: string): void {
    this.addId(id);
    this.renderId(id);
  }

  addId(id: string | number): void {
    this.add('id', id);
  }

  renderId(id: string): void {
    this.render('id', id);
  }

  setClass(className: string): void {
    this.addClass(className);
    this.renderClass(className);
  }

  addClass(className: string): void {
    // 要先判断className是否已经存在
    if (this.getObj().class && this.getObj().class?.indexOf(className) === -1) {
      this.getObj().class += ' ' + className + '-' + vHash;
    } else {
      this.add('class', className + '-' + vHash);
    }
  }

  renderClass(className: string) {
    this.render('class', className);
  }

  removeClass(className: string): void {
    this.getObj().class && this.getObj().class?.replace(className, '');
    this.el.dom?.classList.remove(className);
  }
}

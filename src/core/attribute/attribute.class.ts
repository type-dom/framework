import { camelToDash, isArray, isString } from '@type-dom/utils';
import { XElement } from '../../components/x-element/x-element.class';
import { vHash } from '../type-element/type-element.abstract';
import { ITypeAttribute } from '../type-element/type-element.interface';
import { TypeHtml } from '../type-html/type-html.abstract';
import { TypeSvg } from '../type-svg/type-svg.abstract';
import { Computed, isRef, MaybeRef, Signal, unref, watch } from '@type-dom/signals';
import { isObject } from '../../use/utils';
import { IPrimitive } from '../../interface';

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

  setObj<T extends ITypeAttribute>(attrObj?: MaybeRef<T>): void {
    const obj = unref(attrObj);
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        // todo 如何优化
        const value = obj?.[key] as string | number;
        this.set(key, value);
      }
    }
  }

  addObj<T extends ITypeAttribute>(attrObj?: MaybeRef<T>): void {
    if (attrObj === undefined) {
      return;
    }
    const obj = unref(attrObj);
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const value = obj[key] as string | number;
        this.add(key, value);
      }
    }
  }

  /**
   * 重置属性
   * 清理原有属性，
   * @param attrObj
   */
  resetObj<T extends ITypeAttribute>(attrObj?: MaybeRef<T>): void {
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
  add(key: string, value?: string | number | boolean | Computed<string[]>): void {
    // if (key === 'class') {
    //   this.addClass(value as string | Computed<string[]>);
    // } else {
    this.getObj()[key] = value;
    // }
  }

  // 渲染属性
  //  todo 如何新的属性值和原来的属性值一样，要拦截掉。
  private render(key: string, value?: string | number | boolean
    | Signal<IPrimitive>
    | Computed<string | (string | Record<string, any>)[]>): void {
    // dom渲染时， 驼峰转中划线连接
    if (
      key !== 'viewBox' &&
      key !== 'spreadMethod' &&
      key !== 'gradientUnits'
    ) {
      key = camelToDash(key);
    }
    // if (!this.el.dom) {
    //   this.el.dom = document.createElement(this.el.props.nodeName || 'div');
    // }
    const dom = this.el.dom;
    if (dom) {
      if (value instanceof Computed) {
        // console.warn('value instanceof Computed . ');
        if (key === 'class') {
          const cls = value.get();
          if (isArray(cls)) {
            // todo 判断子元素是字符串还是对象。如果是对象，要拆解对象
            const kls: string[] = [];
            for (const item of cls) {
              if (isObject(item)) {
                for (const key in item) {
                  if (Object.hasOwnProperty.call(item, key)) {
                    const value = (item as any)[key];
                    if (value) {
                      kls.push(key);
                    }
                  }
                }
              } else if (typeof item === 'string' && item) {
                kls.push(item);
              }
            }
            this.render('class', kls.join(' '));
          }
          watch(value, (newValue) => {
            // console.warn('watch attribute class , newValue is ', newValue);
            if (isArray(newValue)) {
              // const classStr = newValue.filter(item => item !== '').join(' ');
              // dom.setAttribute('class', classStr);
              const kls: string[] = [];
              for (const item of newValue) {
                if (isObject(item)) {
                  for (const key in item) {
                    if (Object.hasOwnProperty.call(item, key)) {
                      const value = (item as any)[key];
                      if (value) {
                        kls.push(key);
                      }
                    }
                  }
                } else if (typeof item === 'string' && item) {
                  kls.push(item);
                }
              }
              this.render('class', kls.join(' '));
            } else {
              // console.warn('computed value is not array');
              dom.setAttribute('class', newValue);
            }
          });
        } else { // 非 class 属性
          const raw = value.get();
          if (value.get() === dom.getAttribute(key)) {
            return;
          } else if (isString(raw)) {
            dom.setAttribute(key, raw);
            watch(value, (newValue) => {
              // console.warn('watch attribute , newValue is ', newValue);
              if (isString(newValue)) {
                dom.setAttribute(key, newValue);
              } else {
                console.warn('computed value is not string');
              }
            });
          } else {
            //   todo raw 是字面量时，只有 class 属性才会有
          }
        }
        return;
      } else if (value instanceof Signal) {
        // console.warn('attribute value instanceof Signal . ');
        if (value.get() === dom.getAttribute(key)) {
          return;
        } else {
          dom.setAttribute(key, value.get()?.toString());
          watch(value, (newValue) => {
            // console.warn('watch attribute , newValue is ', newValue);
            dom.setAttribute(key, newValue?.toString() || '');
          });
        }
      } else if (value === true) {
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
    } else {
      throw Error('dom is undefined');
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

  addClass(className: string | Computed): void {
    // 要先判断className是否已经存在
    if (className instanceof Computed) {
      this.add('class', className);
    } else {
      const oldClass = this.getObj().class;
      if (typeof oldClass === 'string') {
        // console.warn('addClass string . className is ', className);
        // 如果已有的样式中已经包含了了该样式，则不再添加。
        if (oldClass.indexOf(className) !== -1) {
          return;
        }
        this.getObj().class += ' ' + className;
      } else {
        // console.warn('addClass other . className is ', className);
        this.add('class', className);
      }
    }
  }

  renderClass(className: string | Computed) {
    this.render('class', className);
    // if (className instanceof Computed) {
    //   const cls = className.get();
    //   if (isArray(cls)) {
    //     this.render('class', cls.join(' '));
    //   }
    //   // watch(className, (newValue) => {
    //   //   // console.warn('watch className, newValue is ', newValue);
    //   //   if (isArray(newValue)) {
    //   //     const classStr = newValue.filter(item => item !== '').join(' ');
    //   //     this.render('class', classStr);
    //   //   } else {
    //   //   }
    //   // });
    // } else {
    //   this.render('class', className);
    // }
  }

  // removeClass(className: string): void {
  //   this.getObj().class && this.getObj().class?.replace(className, '');
  //   this.el.dom?.classList.remove(className);
  // }
}

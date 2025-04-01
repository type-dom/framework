import {
  addClass,
  camelToDash,
  isArray,
  isString, isBoolean, isUndefined, removeClass, isNumber,
  IPrimitive
} from '@type-dom/utils';
import {
  MaybeRef,
  Ref,
  unref,
  isRef,
  effect, computed, toRaw, Computed, isSignal, isComputed
} from '@type-dom/signals';
import { XElement } from '../../components/x-element/x-element.class';
import { isObject } from '../../use/utils';

import { TypeHtml } from '../type-html/type-html.abstract';
import { TypeSvg } from '../type-svg/type-svg.abstract';
import type { ClassValue, ITypeAttribute } from './attribute.interface';

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

  addObj<T extends ITypeAttribute>(attrObj?: T): void {
    if (attrObj) {
      for (const key in attrObj) {
        if (Object.hasOwnProperty.call(attrObj, key)) {
          const value = attrObj[key];
          this.add(key, value);
        }
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
  add(key: string, value?: MaybeRef<IPrimitive | object | IPrimitive[]> | ClassValue): void {
    if (key === 'class') { // class特殊处理
      this.addClass(value as ClassValue);
    } else {
      this.getObj()[key] = value;
    }
  }

  // 渲染属性
  //  todo 如何新的属性值和原来的属性值一样，要拦截掉。
  private render(key: string, value?: MaybeRef<IPrimitive> | ClassValue): void {
    // dom渲染时， 驼峰转中划线连接
    if (
      key !== 'viewBox' &&
      key !== 'spreadMethod' &&
      key !== 'gradientUnits'
    ) {
      key = camelToDash(key);
    }
    if (key === 'class') {
      this.renderClass(value as ClassValue);
      return;
    }
    let dom = this.el.dom;
    if (!dom) {
      this.el.createDom(); // this.el不可能是 DocumentFragment;
      dom = this.el.dom;
    }
    if (dom) {
      // 非 class 属性
      // if (isRef(value)) {
      //   const oldRaw = toRaw(value);
      //   console.warn('key is ', key, ' oldRaw is ', oldRaw)
      // }
      effect(() => {
        const raw = toRaw(value as MaybeRef<IPrimitive>);
        // if (isRef(value)) {
        //   console.warn('key is ', key, ' value is ', value);
        //   console.warn('raw is ', raw);
        // }
        if (String(raw) === dom?.getAttribute(key)) {
          return;
        } else if (isString(raw)) {
          // (dom as any)[key] = raw; // SVGElement 中有问题；
          dom?.setAttribute(key, raw);
        } else if (raw === true) {
          // if (key === 'disabled') {
          //   console.warn('key is disabled . ')
          // }
          // console.warn('key is ' + key + ' . ')
          // console.warn('raw is true . ')
          if (dom?.getAttribute(key)) {
            return;
          }
          (dom as any)[key] = true;
          // dom.setAttribute(key, '');
        } else if (raw === false) {
          if (!dom?.getAttribute(key)) {
            return;
          }
          dom?.removeAttribute(key);
        } else if (raw === undefined || raw === null) {
          // console.log('value is ', value);
          if (!dom?.getAttribute(key)) {
            return;
          }
          dom.removeAttribute(key);
        } else if (isNumber(raw)) {
          const val = raw.toString();
          // (dom as any)[key] = val; // SVGElement 中有问题；
          dom?.setAttribute(key, val);
        } else {
          // console.warn('raw is not normal, is ', raw);
          const val = raw!.toString();
          if (dom?.getAttribute(key) === val) {
            return;
          }
          (dom as any)[key] = val;
          // dom.setAttribute(key, val);  // setAttribute方法存在问题
        }
      })
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

  // classValue如果是数组，则是累加样式；如果是字符串，则是替换样式。
  addClass(classValue: ClassValue): void {
    // 要先判断className是否已经存在
    let oldClass = this.obj.class;
    // todo undefined / false 是不是应该把class值清除掉 ？？
    if (isUndefined(classValue) || isBoolean(classValue)) {
      return;
    }
    if (isUndefined(oldClass)) {
      this.obj.class = classValue;
    } else if (isString(oldClass)) {
      if (isString(classValue)) {
        // console.warn('addClass string . className is ', className);
        // 如果已有的样式中已经包含了了该样式，则不再添加。
        if (oldClass.indexOf(classValue) !== -1) {
          return;
        }
        oldClass += ' ' + classValue;
        this.obj.class = oldClass;
      } else if (isArray(classValue)) {
        if (classValue.indexOf(oldClass) === -1) {
          classValue.unshift(oldClass);
        }
        this.obj.class = classValue;
      } else if (isSignal(classValue) || isComputed(classValue)) {
        // classValue.set([classValue.get() as string, oldClass as string])
        const compute = computed(() => [oldClass, classValue.get()]);
        this.obj.class = compute as Computed<ClassValue>;
      } else if (isObject(classValue)) { // Record<string, MaybeRef<boolean | unknown>>
        console.warn('addClass object . classValue is ', classValue);
        if (!Object.prototype.hasOwnProperty.call(classValue, oldClass)) {
          classValue[oldClass] = true;
        } else {
          if (isRef(classValue[oldClass])) {
            (classValue[oldClass] as Ref).set(true);
          } else {
            classValue[oldClass] = true;
          }
        }
        this.obj.class = classValue;
      } else {
        // console.log('classValue is ', classValue);
      }
    } else if (isArray(oldClass)) {
      if (isString(classValue)) {
        if (oldClass.indexOf(classValue) === -1) {
          oldClass.push(classValue);
        }
      } else if (isArray(classValue)) {
        classValue.forEach((item) => {
          // todo 完善逻辑判断
          if ((oldClass as Array<ClassValue>).indexOf(item) === -1) {
            (oldClass as Array<ClassValue>).push(item);
          }
        })
      } else if (isRef(classValue)) {
        // todo
        oldClass.push(classValue);
      } else if (isObject(classValue)) {
        oldClass.push(classValue);
      } else {
        // console.log('classValue is ', classValue);
      }
    } else if (isRef(oldClass)) {
      // todo 是否影响 响应式监听
      //    是否会有重复的 className
      this.obj.class = computed(() => [oldClass, classValue]) as Computed<ClassValue>;
    } else if (isObject(oldClass)) {
      this.obj.class = computed(() => [oldClass, classValue]) as Computed<ClassValue>;
    } else {
      // console.log('oldClass is ', oldClass);
    }
  }

  renderClass(classValue: ClassValue) {
    effect(() => {
      const kls = flattenClass(classValue);
      // console.error('kls is ', kls);
      // console.warn('watch attribute class , newValue is ', newValue);
      const dom = this.el.dom;
      if (!dom) {
        this.el.createDom();
      }
      // const classList = dom?.classList;
      // console.log('classList is ', classList);
      // todo 已有的样式应该如何处理 ？？？？
      addClass(dom, kls);
    });
  }

  removeClass(className: string): void {
    // this.getObj().class && this.getObj().class?.replace(className, '');
    // this.el.dom?.classList.remove(className);
    const dom = this.el.dom;
    if (dom) {
      removeClass(dom, className);
    }

  }
}

function flattenClass(obj: ClassValue, result: string[] = []): string[] {
  if (Array.isArray(obj)) {
    obj.forEach(item => flattenClass(item, result));
  } else if (isSignal(obj) || isComputed(obj)) {
    // console.error('flattenClass obj is ', obj);
    flattenClass(toRaw(obj), result);
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = toRaw(obj[key]);
        if (isString(value)) {
          value && result.push(key);
        } else if (isArray(value)) {
          value.forEach(item => flattenClass(item, result));
        } else if (value) {
          // 如果需要将布尔值或 undefined 转换为字符串，可以在这里处理
          // result.push(String(value));
          if (value) {
            key && result.push(key);
          }
        } else {
          // console.warn('class value is null or {} ,  is ', value);
        }
      }
    }
  } else {
    const value = toRaw(obj);
    if (isString(value)) {
      value && result.push(value);
    } else if (typeof value === 'boolean' || value === undefined) {
      // 如果需要将布尔值或 undefined 转换为字符串，可以在这里处理
      // result.push(String(value));
      // console.warn('class raw value is boolean or undefined , value is ',value)
    }
  }
  return result;
}

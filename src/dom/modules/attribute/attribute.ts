import {
  // addClass,
  // removeClass,
  camelToDash,
  isArray,
  isString,
  isBoolean,
  isUndefined,
  isNumber,
  IPrimitive,
  isObject,
} from '@type-dom/utils';
import { effect, computed, Computed } from '@type-dom/signals';
import { isRef, toRaw, isSignal, isComputed, unref, MaybeRef, Ref, } from '../../../reactivity';
import { createDom } from '../../../core/helpers/createDom';
import { TypeNode } from '../../../core/type-node/type-node.abstract';
import { onBeforeMount } from '../../../core/apiLifecycle';
import { TypeFragment } from '../../../core/components/type-fragment/type-fragment.abstract';
import { addDomClass, removeDomClass } from '../class';
import type { Attributes, ClassValue } from './attribute.interface';

export function getAttr<T>(el: TypeNode, key: string): T {
  return (el.attrObj as any)[key];
}
export function getAttrObj<T extends Attributes>(el: TypeNode): T {
  return el.attrObj as T;
}

export function setAttrObj<T extends Attributes>(el?: TypeNode, attrObj?: MaybeRef<T>): void {
  if (!el) return;
  if (attrObj) {
    if (el instanceof TypeFragment) {
      onBeforeMount(() => {
        el.childNodes.forEach(child => {
          setAttrObj(child, attrObj)
        });
      }, el);
    }
    const obj = unref(attrObj);
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        // todo 如何优化
        const value = (obj as any)[key] as MaybeRef<string | number>;
        setAttrProp(el, key, value);
      }
    }
  }
}

export function addAttrObj<T extends Attributes>(el?: TypeNode, attrObj?: T): void {
  if (!el) return;
  if (attrObj) {
    if (el instanceof TypeFragment) {
      onBeforeMount(() => {
        el.childNodes.forEach(child => {
          addAttrObj(child, attrObj)
        });
      }, el);
    }
    for (const key in attrObj) {
      if (Object.hasOwnProperty.call(attrObj, key)) {
        const value = (attrObj as any)[key] as MaybeRef<IPrimitive>;
        addAttrProp(el, key, value);
      }
    }
  }
}

/**
 * 重置属性
 * 清理原有属性，
 * @param el
 * @param attrObj
 */
export function resetAttrObj<T extends Attributes>(el: TypeNode, attrObj?: MaybeRef<T>): void {
  if (!el) return;
  if (attrObj === undefined) {
    return;
  }
  clearAttrObj(el);
  setAttrObj(el, attrObj);
}

export function renderAttrObj<T extends Attributes>(el?: TypeNode, attrObj?: T): void {
  if (!el) return;
  if (attrObj === undefined) {
    attrObj = el.attrObj as T;
  }
  for (const key in attrObj) {
    if (Object.hasOwnProperty.call(attrObj, key)) {
      const value = (attrObj as any)[key] as MaybeRef<IPrimitive> | ClassValue;
      renderAttrProp(el, key, value);
    }
  }
}

export function removeAttrObj<T extends Attributes>(el?: TypeNode, attrObj?: T): void {
  if (!el) return;
  if (attrObj === undefined) {
    return;
  }
  for (const key in attrObj) {
    if (Object.hasOwnProperty.call(attrObj, key)) {
      delete (el.attrObj as any)[key];
      if (el.dom instanceof Element) { // todo
        el.dom?.removeAttribute(key);
      }
    }
  }
}

export function clearAttrObj(el?: TypeNode): void {
  if (!el) return;
  // 需要专门清理一下DOM上的属性
  for (const attr in el.attrObj as any) {
    if (el.dom instanceof Element) {
      el.dom?.removeAttribute(attr);
    }
    delete (el.attrObj as any)[attr];
  }
}

// 设置属性 dom 属性同步变化
export function setAttrProp(el: TypeNode | undefined, key: string, value?: MaybeRef<string | number | boolean>): void {
  if (!el) return;
  if (el instanceof TypeFragment) {
    onBeforeMount(() => {
      el.childNodes.forEach(child => {
        setAttrProp(child, key, value)
      });
    }, el);
  }
  addAttrProp(el, key, value);
  renderAttrProp(el, key, value);
}

// 添加属性
export function addAttrProp(el: TypeNode | undefined, key: string, value?: MaybeRef<IPrimitive | object | IPrimitive[]> | ClassValue): void {
  if (!el) return;
  if (el instanceof TypeFragment) {
    onBeforeMount(() => {
      el.childNodes.forEach(child => {
        addAttrProp(child, key, value)
      });
    }, el);
  }
  if (key === 'class') { // class特殊处理
    addAttrClass(el, value as ClassValue);
  } else {
    (el.attrObj as any)[key] = value;
  }
}

// 渲染属性
//  todo 如何新的属性值和原来的属性值一样，要拦截掉。
export function renderAttrProp(el: TypeNode | undefined, key: string, value?: MaybeRef<IPrimitive> | ClassValue): void {
  if (!el) return;
  // dom渲染时， 驼峰转中划线连接
  if (
    key !== 'viewBox' &&
    key !== 'spreadMethod' &&
    key !== 'gradientUnits'
  ) {
    key = camelToDash(key);
  }
  if (key === 'class') {
    renderClass(el, value as ClassValue);
    return;
  }
  let dom = el.dom;
  if (!dom) {
    createDom(el); // el不可能是 DocumentFragment; ???
    dom = el.dom;
  }
  if (dom) {
    // 非 class 属性
    if (isRef(value)) {
      // const oldRaw = toRaw(value);
      // console.warn('key is ', key, ' oldRaw is ', oldRaw)
      effect(() => {
        const raw = toRaw(value as MaybeRef<IPrimitive>);
        // if (isRef(value)) {
        //   console.warn('key is ', key, ' value is ', value);
        //   console.warn('raw is ', raw);
        // }
        if (dom instanceof Element) {
          if (String(raw) === dom?.getAttribute(key)) {
            return;
          } else if (isString(raw)) {
            if (dom instanceof SVGElement) {
              //   nothing;
            } else {
              (dom as any)[key] = raw; // SVGElement 中有问题；
            }
            dom?.setAttribute(key, raw);
          } else if (raw === true) {
            // if (key === 'disabled') {
            //   console.warn('key is disabled . ')
            //   console.warn('raw is true . ')
            // }
            // console.warn('key is ' + key + ' . ')
            if (dom?.hasAttribute(key)) {
              return;
            }
            (dom as any)[key] = true;
            dom.setAttribute(key, '');
            // if (key === 'disabled') {
            //   // console.log('dom.disabled is ', dom.disabled)
            //   console.log('dom.disabled is ', dom.getAttribute(key))
            // }
          } else if (raw === false) {
            // console.warn('key is ' + key + ' . ');
            // console.warn('raw is false . ');
            // disabled dom?.getAttribute(key) result is ''
            if (!dom?.hasAttribute(key)) {
              return;
            }
            dom?.removeAttribute(key); // 同步 DOM 属性
            (dom as any)[key] = false; // 修改元素状态
          } else if (raw === undefined || raw === null) {
            // console.log('value is ', value);
            if (!dom?.hasAttribute(key)) {
              return;
            }
            dom.removeAttribute(key);
            (dom as any)[key] = raw;
          } else if (isNumber(raw)) {
            const val = raw.toString();
            // (dom as any)[key] = val; // SVGElement 中有问题；
            dom?.setAttribute(key, val);
          } else {
            // console.warn('raw is not normal, is ', raw);
            const val = raw.toString();
            if (dom?.getAttribute(key) === val) {
              return;
            }
            (dom as any)[key] = val;
            // dom.setAttribute(key, val);  // setAttribute方法存在问题
          }
        } else if (dom instanceof DocumentFragment) {
          // console.warn('dom is DocumentFragment . ');
        } else if (dom instanceof Text) {
          // console.warn('dom is Text . ');
        } else if (dom instanceof Comment) {
          // console.warn('dom is Comment, and is ', dom);
        } else  {
          console.warn('dom is not Element or DocumentFragment or Text or Comment， is ', dom);
        }
      })
    } else {
      const raw = value;
      if (dom instanceof Element) {
        if (String(raw) === dom?.getAttribute(key)) {
          return;
        } else if (isString(raw)) {
          if (dom instanceof SVGElement) {
            //   nothing;
          } else {
            (dom as any)[key] = raw; // SVGElement 中有问题；
          }
          dom?.setAttribute(key, raw);
        } else if (raw === true) {
          // if (key === 'disabled') {
          //   console.warn('key is disabled . ')
          //   console.warn('raw is true . ')
          // }
          // console.warn('key is ' + key + ' . ')
          if (dom?.hasAttribute(key)) {
            return;
          }
          (dom as any)[key] = true;
          dom.setAttribute(key, '');
          // if (key === 'disabled') {
          //   // console.log('dom.disabled is ', dom.disabled)
          //   console.log('dom.disabled is ', dom.getAttribute(key))
          // }
        } else if (raw === false) {
          // console.warn('key is ' + key + ' . ');
          // console.warn('raw is false . ');
          // disabled dom?.getAttribute(key) result is ''
          if (!dom?.hasAttribute(key)) {
            return;
          }
          dom?.removeAttribute(key); // 同步 DOM 属性
          (dom as any)[key] = false; // 修改元素状态
        } else if (raw === undefined || raw === null) {
          // console.log('value is ', value);
          if (!dom?.hasAttribute(key)) {
            return;
          }
          dom.removeAttribute(key);
          (dom as any)[key] = raw;
        } else if (isNumber(raw)) {
          const val = raw.toString();
          // (dom as any)[key] = val; // SVGElement 中有问题；
          dom?.setAttribute(key, val);
        } else {
          // console.warn('raw is not normal, is ', raw);
          const val = raw.toString();
          if (dom?.getAttribute(key) === val) {
            return;
          }
          (dom as any)[key] = val;
          // dom.setAttribute(key, val);  // setAttribute方法存在问题
        }
      } else if (dom instanceof DocumentFragment) {
        // console.warn('dom is DocumentFragment . ');
      } else if (dom instanceof Text) {
        // console.warn('dom is Text . ');
      } else if (dom instanceof Comment) {
        // console.warn('dom is Comment, and is ', dom);
      } else  {
        console.warn('dom is not Element or DocumentFragment or Text or Comment， is ', dom);
      }
    }
  } else {
    throw Error('dom is undefined');
  }
}

export function removeAttrProp(el: TypeNode | undefined, key: string): void {
  if (!el) return;
  delete (el.attrObj as any)[key];
  if (el.dom instanceof Element) el.dom?.removeAttribute(key);
}

export function setAttrName(el: TypeNode | undefined, value: string): void {
  if (!el) return;
  addAttrName(el, value);
  renderAttrName(el, value);
}

export function addAttrName(el: TypeNode | undefined, value: string | number): void {
  if (!el) return;
  addAttrProp(el, 'name', value);
}

export function renderAttrName(el: TypeNode | undefined, value: string): void {
  if (!el) return;
  renderAttrProp(el, 'name', value);
}

export function setAttrId(el: TypeNode | undefined, id: string): void {
  if (!el) return;
  addAttrId(el, id);
  renderAttrId(el, id);
}

export function addAttrId(el: TypeNode | undefined, id: string | number): void {
  if (!el) return;
  addAttrProp(el, 'id', id);
}

export function renderAttrId(el: TypeNode, id: string): void {
  if (!el) return;
  renderAttrProp(el, 'id', id);
}

export function setClass(el: TypeNode, className: string): void {
  if (!el) return;
  addAttrClass(el, className);
  renderClass(el, className);
}

// classValue如果是数组，则是累加样式；如果是字符串，则是替换样式。
export function addAttrClass(el: TypeNode, classValue: ClassValue): void {
  if (!el) return;
  // 要先判断className是否已经存在 todo el.$options.class need how to do
  if (!el.attrObj) {
    console.warn('el.attrObj is undefined . ');
    el.attrObj = {};
  }
  let oldClass = el.attrObj?.class;
  // todo undefined / false 是不是应该把class值清除掉 ？？
  if (isUndefined(classValue) || isBoolean(classValue)) {
    return;
  }
  if (isUndefined(oldClass)) {
    el.attrObj.class = classValue;
  } else if (isString(oldClass)) {
    if (isString(classValue)) {
      // console.warn('addAttrClass string . className is ', className);
      // 如果已有的样式中已经包含了了该样式，则不再添加。
      if (oldClass.indexOf(classValue) !== -1) {
        return;
      }
      oldClass += ' ' + classValue;
      el.attrObj.class = oldClass;
    } else if (isArray(classValue)) {
      if (classValue.indexOf(oldClass) === -1) {
        classValue.unshift(oldClass);
      }
      el.attrObj.class = classValue;
    } else if (isSignal(classValue) || isComputed(classValue)) {
      // classValue.set([classValue.get() as string, oldClass as string])
      const computeClass = computed(() => [oldClass, classValue.get()]);
      el.attrObj.class = computeClass as Computed<ClassValue>;
    } else if (isObject(classValue)) { // Record<string, MaybeRef<boolean | unknown>>
      // console.warn('addAttrClass object . classValue is ', classValue);
      if (!Object.prototype.hasOwnProperty.call(classValue, oldClass)) {
        classValue[oldClass] = true;
      } else {
        if (isRef(classValue[oldClass])) {
          (classValue[oldClass] as Ref).set(true);
        } else {
          classValue[oldClass] = true;
        }
      }
      el.attrObj.class = classValue;
    } else {
      console.warn('classValue is ', classValue);
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
      console.warn('classValue is ', classValue);
    }
  } else if (isRef(oldClass)) {
    // todo 是否影响 响应式监听
    //    是否会有重复的 className
    el.attrObj.class = computed(() => [oldClass, classValue]) as Computed<ClassValue>;
  } else if (isObject(oldClass)) {
    el.attrObj.class = computed(() => [oldClass, classValue]) as Computed<ClassValue>;
  } else {
    console.warn('oldClass is ', oldClass);
  }
}

export function renderClass(el: TypeNode, classValue: ClassValue) {
  if (!el) return;
  if (isRef(classValue)) {
    effect(() => {
      const kls = flattenClass(classValue).join(' ');
      // console.error('kls is ', kls);
      // console.warn('watch attribute class , newValue is ', newValue);
      const dom = el.dom;
      if (!dom) {
        createDom(el);
      }
      // const classList = dom?.classList;
      // console.log('classList is ', classList);
      // todo 已有的样式应该如何处理 ？？？？
      if (dom instanceof Element) addDomClass(dom, kls); // 这里的addDomClass 是外部引入的
    });
  } else {
    const kls = flattenClass(classValue).join(' ');
    // console.error('kls is ', kls);
    // console.warn('watch attribute class , newValue is ', newValue);
    const dom = el.dom;
    if (!dom) {
      createDom(el);
    }
    // const classList = dom?.classList;
    // console.log('classList is ', classList);
    // todo 已有的样式应该如何处理 ？？？？
    if (dom instanceof Element) addDomClass(dom, kls); // 这里的addDomClass 是外部引入的
  }
}

export function removeClass(el: TypeNode, className: string): void {
  if (!el) return;
  // this.getObj().class && this.getObj().class?.replace(className, '');
  // this.el.dom?.classList.remove(className);
  const dom = el.dom;
  if (dom) {
    if (dom instanceof Element) removeDomClass(dom, className);
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
          if (value) result.push(key);
        } else if (isArray(value)) {
          value.forEach(item => flattenClass(item, result));
        } else if (value) {
          // 如果需要将布尔值或 undefined 转换为字符串，可以在这里处理
          // result.push(String(value));
          if (value) {
            if (key) result.push(key);
          }
        } else {
          // console.warn('class value is null or {} ,  is ', value);
        }
      }
    }
  } else {
    const value = toRaw(obj);
    if (isString(value)) {
      if (value) result.push(value);
    } else if (typeof value === 'boolean' || value === undefined) {
      // 如果需要将布尔值或 undefined 转换为字符串，可以在这里处理
      // result.push(String(value));
      // console.warn('class raw value is boolean or undefined , value is ', value);
    }
  }
  return result;
}

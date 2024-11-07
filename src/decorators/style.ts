// 定义样式装饰器
import { addUnit, camelToDash, colorFormat, Ratio } from '@type-dom/utils';
import { IStyle, Property } from '@type-dom/css-type';

export function StyleManager(target: Function) {
  Object.defineProperty(target.prototype, 'clientHeight', {
    get: function () {
      if (this && this.dom) {
        return (this.dom.clientHeight / Ratio.mm2px).toFixed(2) + 'mm';
      } else {
        return '0px';
      }
    }
  });
  /**
   * 获取dom的高度，带单位的。
   * 包括margin的高度。
   * margin 的单位 px ---> 单位换算
   */
  Object.defineProperty(target.prototype, 'elementHeight', {
    get: function (): string | undefined {
      if (!this.dom || !(this.dom instanceof HTMLElement)) {
        return;
      }
      const style = getComputedStyle(this.dom);
      const marginTop = parseFloat(style.marginTop);
      const marginBottom = parseFloat(style.marginBottom);
      const itemHeight = this.dom.offsetHeight + marginTop + marginBottom;
      return (itemHeight / Ratio.mm2px).toFixed(2) + 'mm'; // px ---> mm
    }
  });

  Object.defineProperty(target.prototype, 'isShow', {
    get: function (): boolean {
      return 'none' !== this.dom?.style?.display;
    }
  })

  target.prototype.getStyle = function <T>(key: keyof IStyle): T {
    if (!this.props.styleObj) {
      this.props.styleObj = {};
    }
    return this.props.styleObj[key] as T;
  }

  target.prototype.getStyleObj = function (): IStyle {
    return this.props.styleObj = this.props.styleObj ?? {};
  }

  /**
   * 添加样式对象；
   * todo mergeObj,现在的方法更接近与mergeObj；
   *    fluentUI中使用了 mergeStyles 方法；
   * @param styleObj
   */
  target.prototype.addStyleObj = function (styleObj?: IStyle): void {
    if (!styleObj) return;
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        // todo 如何优化
        const value = styleObj[key as keyof IStyle];
        this.addStyle(key as keyof IStyle, value);
      }
    }
  };

  target.prototype.addStyle = function (key: keyof IStyle, value: string | number | boolean | undefined): void {
    if (!this.props.styleObj) {
      console.warn('this.props.styleObj is undefined .');
      this.props.styleObj = {};
    }
    if (value === undefined) {
      delete this.props.styleObj[key];
    } else {
      // this.props.styleObj[key] = value as any;
      Object.assign(this.props.styleObj, { [key]: value });
    }
    // Object.defineProperty(this.props.styleObj, key, {
    //   value: value,
    //   writable: true,
    //   enumerable: true,
    //   configurable: true
    // });
  };

  /**
   * 根据给定的样式键和值，渲染元素的样式。
   * @param key 样式属性的名称，必须是IStyle接口中定义的属性名。
   * @param value 样式属性的值，可以是字符串、数字或布尔值。
   * @throws 如果this.dom为null，则抛出错误，指示元素不存在。
   */
  target.prototype.renderStyle = function (key: keyof IStyle, value: string | number): void {
    // 当样式属性为width或height时，确保值以px为单位
    // todo width height 等属性是数字时的处理
    //    padding margin 等类似的数字值的处理
    if (key === 'width' || key === 'height') {
      value = addUnit(value);
    }
    // 检查dom元素是否存在，如果不存在则抛出错误
    if (!this.dom) {
      this.dom = document.createElement(this.nodeName);
    }

    // 拦截已经配置的相同的样式值的样式设置
    //  todo color 会转为 rgb 格式
    // 颜色单独处理
    if (key === 'color') {
      const color = this.dom.style.color;
      if (colorFormat(color) === colorFormat(String(value))) {
        return;
      }
    }
    if (this.dom.style.getPropertyValue(camelToDash(key)) === String(value)) {
      return;
    }
    // 使用CSS属性名，并将值转换为字符串，然后设置到元素的样式中
    this.dom.style.setProperty(camelToDash(key), String(value)); // 要转中划线

  };

  /**
   * 设置元素的样式。
   *
   * 此方法用于根据给定的键和值来更新元素的样式。如果值为`undefined`，则此方法将删除该样式的属性；
   * 否则，它将添加新的样式属性并立即渲染更新。
   * 此方法会渲染到dom上
   * @param key 样式属性的键，对应于`IStyle`接口中的属性名。
   * @param value 样式属性的值，可以是字符串、数字或布尔值。
   */
  target.prototype.setStyle = function (key: keyof IStyle, value: string | number | undefined): void {
    // 当值为undefined时，调用removeStyle方法来删除这个样式属性
    // todo type ???
    if (value === undefined) {
      // todo 空字符怎么处理？
      this.removeStyle(key);
    } else {
      // 当值不为undefined时，先调用addStyle方法来添加或更新这个样式属性
      this.addStyle(key, value);
      // 然后调用renderStyle方法来立即渲染这个样式的更新
      // 直接dom操作
      this.renderStyle(key, value);
    }
  };

  // 删除样式
  target.prototype.removeStyle = function (key: keyof IStyle): void {
    if (this.getStyleObj() && this.getStyleObj()[key]) {
      delete this.getStyleObj()[key];
    }
    if (this.dom) {
      this.dom.style.removeProperty(camelToDash(key));
      // delete this.dom.style[key as keyof CSSStyleDeclaration];
    }
  };

  /**
   * 设置样式对象
   * 替换已有的样式；
   * 没有传的样式，不变；
   * @param styleObj
   */
  target.prototype.setStyleObj = function (styleObj?: IStyle): void {
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        // todo 如何优化
        const value = styleObj?.[key as keyof IStyle];
        this.set(key as keyof IStyle, value);
      }
    }
    // todo 样式一次性渲染。下面的代码 Tag 组件checkable 有问题；
    // const style = { ...this.props.styleObj, ...styleObj };
    // let styleString = '';
    // for (const key in style) {
    //   if (Object.hasOwnProperty.call(style, key)) {
    //     const value = style[key as keyof IStyle];
    //     if (value === undefined) {
    //       this.style.remove[key as keyof IStyle];
    //       continue;
    //     }
    //     styleString += `${camelToDash(key)}:${value};`;
    //   }
    // }
    // this.dom?.setAttribute('style', styleString);
    // this.renderObj(styleObj);
  };

  target.prototype.addWidth = function (width: string | number): void {
    this.addStyleObj({ width: addUnit(width) });
  };

  target.prototype.setWidth = function (width: string | number): void {
    this.setStyleObj({ width: addUnit(width) });
  };

  target.prototype.addHeight = function (height: string | number): void {
    this.addStyleObj({ height: addUnit(height) });
  };

  target.prototype.setHeight = function (height: string | number): void {
    this.setStyleObj({ height: addUnit(height) });
  };

  target.prototype.addBackgroundColor = function (backgroundColor: string): void {
    this.addStyleObj({ backgroundColor });
  };

  target.prototype.setBackgroundColor = function (backgroundColor: string): void {
    this.setStyleObj({ backgroundColor });
  };

  target.prototype.setCursor = function (cursor: Property.Cursor) {
    this.setStyleObj({ cursor });
  };

  /**
   * 重置样式
   * 清除原有样式，全部替换为新的样式
   * @param styleObj
   */
  target.prototype.resetStyleObj = function (styleObj?: IStyle): void {
    this.dom?.removeAttribute('style'); // 需要单独清理一下DOM的style
    this.clearStyleObj();
    if (styleObj !== undefined) {
      if (this.dom) {
        this.setStyleObj(styleObj);
      }
    }
  };

  target.prototype.removeObj = function (styleObj: IStyle): void {
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        this.removeStyle(key as keyof IStyle);
      }
    }
  };

  target.prototype.clearObj = function () {
    for (const key in this.props.styleObj) {
      if (Object.hasOwnProperty.call(this.props.styleObj, key)) {
        this.removeStyle(key as keyof IStyle);
      }
    }
  };

  target.prototype.renderObj = function (styleObj?: IStyle): void {
    if (!styleObj) {
      styleObj = this.props.styleObj;
    }
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        const value = styleObj[key as keyof IStyle] as string | number;
        this.renderStyle(key as keyof IStyle, value);
      }
    }
  };

  /**
   * 默认显示是  block
   * 可指定具体显示模式
   * @param mode
   */
  target.prototype.show = function (mode?: Property.Display): void {
    this.set('display', mode ?? 'block');
  };

  target.prototype.hide = function (): void {
    this.set('display', 'none');
  };
}

// 应用类装饰器
// @addMultipleMethods
// class User {
//   constructor(public name: string, public age: number) {}
// }
//
// // 测试类装饰器的效果
// const user = new User('Alice', 30);
//
// // 调用通过 addMultipleMethods 添加的 greet 方法
// user.greet('TypeScript'); // 输出: Hello, TypeScript!
//
// // 调用通过 addMultipleMethods 添加的 logDetails 方法
// user.logDetails(); // 输出: Name: Alice, Age: 30
//
// // 调用通过 addMultipleMethods 添加的 sayGoodbye 方法
// user.sayGoodbye(); // 输出: Goodbye!

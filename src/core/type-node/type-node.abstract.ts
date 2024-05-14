import { Subscription } from 'rxjs';
import { encodeToXmlString, humpToMiddleLine } from '@type-dom/utils';
import { IJsonData, type IJsonDataProp } from '../../interface';
import { XProxy } from '../../observer';
import type { ITypeAttribute } from '../type-element/type-element.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { IStyle } from '../../style/style.interface';

import type { IAttr, IMethods, ISetting, ISettings, ITypeNode } from './type-node.interface';

/**
 * 虚拟DOM，TypeNode 抽象节点类, 所有节点类的抽象类；
 * abstract syntax tree 抽象语法树 抽象节点类
 * 子类有:
 *    TypeElement
 *    TextNode
 *    XElement
 */
export abstract class TypeNode implements ITypeNode {
  /**
   * 在生成dom字符串时，可以转为 attributes 的一个元素 { name: 'className', value: string }
   * 在定义ClassName时，要把当前类写入到TypeMap中；
   */
  abstract className?: string; // 最终实体类的名称，解析转换时需要创建对应的类；
  abstract nodeName?: '#text' | string;
  abstract nodeValue?: string | undefined;
  abstract childNodes?: TypeNode[] | undefined;
  abstract dom?: HTMLElement | SVGElement | Text;
  abstract parent?: TypeElement | undefined;
  isContext?: boolean;

  /**
   * 渲染出真实DOM
   */
  abstract render(): void;

  // abstract setConfig?(config: any): void

  isRoot?: boolean; // 是否是根节点 只有TypeRoot才为true
  attrObj?: Partial<ITypeAttribute>;
  styleObj?: Partial<IStyle>;
  attributes?: IAttr[];
  settings?: ISettings;
  _data?: IJsonData; // IObData;
  methods?: IMethods;
  template?: string | undefined;
  subscriptions?: Subscription[];
  // data$?: XObservable<IXProxyConfig>
  // data$?: Observer;
  /**
   * 获取根节点;
   * 在应用项目中才会用到，在框架中是用不到的。
   * 应用项目中，根节点要设置 isRoot 为 true，这样就能获取到根节点了
   * 问题： 无法获取应用项目主类的方法和属性；
   */
  get root(): TypeNode | undefined {
    if (this?.isRoot) {
      return this;
    } else {
      // 要保证parent不为null，否则会报错。要保证应用项目中的parent都设置过了。
      return this.parent?.root;
    }
  }
  get firstChild(): TypeNode | undefined {
    return this.childNodes && this.childNodes[0];
  }

  get lastChild(): TypeNode | undefined {
    return this.childNodes && this.childNodes[this.childNodes.length - 1];
  }

  get nextSibling(): TypeNode | undefined {
    const childNodes = this.parent?.childNodes;
    if (!childNodes) {
      return undefined;
    }
    const index = childNodes.indexOf(this);
    if (index === -1) {
      return undefined;
    }
    return childNodes[index + 1];
  }

  get textContent(): string | number | boolean {
    if (!this.childNodes) {
      return this.nodeValue || '';
    }
    // 使用一个字符串变量迭代添加,而非递归来累积文本内容。
    let content = '';
    for (const child of this.childNodes) {
      content += child.textContent;
    }
    return content;
    // return this.childNodes
    //   .map(function(child) {
    //     return child.textContent;
    //   })
    //   .join('');
  }

  get children(): TypeNode[] {
    return this.childNodes || [];
  }

  setAsRoot(isRoot: boolean) {
    this.isRoot = isRoot;
  }

  getRootElement<T extends TypeNode>() : T | undefined {
    if (this.isRoot) {
      return this as unknown as T;
    } else {
      // 要保证parent不为null，否则会获取不到。要保证应用项目中的parent都设置过了。
      return this.parent?.getRootElement();
    }
  }

  setContext(isContext: boolean) {
    this.isContext = isContext;
  }

  getContext<T extends TypeNode>(): T | undefined {
    if (this.isContext) {
      return this as unknown as T;
    } else {
      // 要保证parent不为null，否则会获取不到。要保证应用项目中的parent都设置过了。
      return this.parent?.getContext();
    }
  }

  setSetting(key: string, value: ISetting) {
    if (this.settings) {
      this.settings[key] = value;
    } else {
      this.settings = { [key]: value };
    }
    if (value === undefined) {
      delete this.settings?.fieldSetting;
    }
  }

  resetSettings(settings: ISettings) {
    this.settings = settings;
  }

  // 在定义className时，要把当前类写入到TypeMap中；
  //   todo 创建类实例时都要运行一遍。
  // setClassName(className: string, TypeClass: any) {
  //   this.className = className;
  //   const isExisted = TypeNode.typeMap.hasOwnProperty(className);
  //   if (!isExisted) {
  //     TypeNode.typeMap[className] = TypeClass;
  //   } else {
  //     if (TypeNode.typeMap[className] === TypeClass) {
  //       console.log('this.className has been existed . ');
  //     } else {
  //       throw Error('this.className has been defined . ');
  //     }
  //   }
  //   console.log('TypeNode.typeMap is ', TypeNode.typeMap);
  // }

  setParent(parent: TypeElement): void {
    this.parent = parent;
    // parent.addChild(this); // 单一原则
  }

  appendParent(parent: TypeElement): void {
    this.parent = parent;
    parent.addChild(this);
  }

  hasChildNodes(): boolean {
    return this.childNodes ? this.childNodes.length > 0 : false;
  }

  /**
   * 找到指定类名的第一个节点
   * 会递归遍历子节点
   * @param className
   */
  findNode(className: string): TypeNode | undefined  {
    // console.log('findNode className is ', className);
    for (const child of this.children) {
      if (child?.className === className) {
        return child;
      } else if (child.children.length > 0) {
        return child.findNode(className);
      }
    }
    return undefined;
  }

  /**
   * 找到指定类名的全部节点
   * 会递归遍历子节点
   */
  findAllNodes(className: string): TypeNode[] {
    const nodes: TypeNode[] = [];
    for (const child of this.children) {
      if (child?.className === className) {
        nodes.push(child);
      } else if (child.children.length > 0) {
        nodes.push(...child.findAllNodes(className));
      }
    }
    return nodes;
  }

  /**
   * 查找指定类名的第一个子节点
   * @param className
   */
  findChild(className: string): TypeNode | undefined {
    for (const child of this.children) {
      if (child?.className === className) {
        return child;
      }
    }
    return undefined;
  }

  /**
   * 找到指定类名的所有节点
   */
  findAllChildren(className: string): TypeNode[] {
    const nodes: TypeNode[] = [];
    for (const child of this.children) {
      if (child?.className === className) {
        nodes.push(child);
      } else if (child.children.length > 0) {
        nodes.push(...child.findAllNodes(className));
      }
    }
    return nodes;
  }

  /**
   * 拼接出DOM字符串对应的数组。
   * buffer.join(''), 获得对应的字符串。
   * @param buffer
   */
  dump(buffer: string[]): void {
    // console.log('type-node dump . ');
    if (this.nodeName === '#text') {
      buffer.push(encodeToXmlString(this.nodeValue?.toString() || ''));
      return;
    }
    buffer.push(`<${this.nodeName}`);
    // 下面组装 属性 和 样式
    if (this?.attrObj) {
      for (let key in this.attrObj) {
        if (
          key !== 'viewBox' &&
          key !== 'spreadMethod' &&
          key !== 'gradientUnits'
        ) {
          key = humpToMiddleLine(key);
        }
        // todo
        buffer.push(
          ` ${key}="${encodeToXmlString(String(this.attrObj[key]))}"`
        );
      }
    }
    if (this?.styleObj) {
      let style = '';
      for (const key in this.styleObj) {
        style += `${humpToMiddleLine(key)}: ${encodeToXmlString(
          String((this.styleObj as any)[key])
        )};`;
      }
      if (style !== '') {
        buffer.push(` style="${style}"`);
      }
    }
    // todo this.attributes may be repeated with this.attrObj
    if (this.attributes) {
      for (const attribute of this.attributes) {
        buffer.push(
          ` ${attribute.name}="${encodeToXmlString(
            attribute.value?.toString()
          )}"`
        );
      }
    }
    if (this.hasChildNodes()) {
      buffer.push('>');
      if (this.childNodes) {
        for (const child of this.childNodes) {
          child.dump(buffer);
        }
      }
      buffer.push(`</${this.nodeName}>`);
    } else if (this.nodeValue !== undefined) {
      buffer.push(
        `>${encodeToXmlString(this.nodeValue.toString())}</${this.nodeName}>`
      );
    } else {
      buffer.push('/>');
    }
  }

  /**
   * 保存json数据时使用。
   * 把当前数据层对象转换为 JSON 字面量。
   * 但是就数据层存储而言，是不需要转化page及其子元素的。
   * todo events如何处理？？
   */
  toJSON(): ITypeNode {
    return {
      className: this.className,
      attrObj: this.attrObj,
      styleObj: this.styleObj,
      nodeName: this.nodeName,
      nodeValue: this.nodeValue,
      attributes: this.attributes,
      childNodes: this.children.map((child) => {
        if (child.nodeName === '#text') {
          return {
            // className: 'TextNode',
            // nodeName: '#text',
            nodeValue: child.nodeValue // textContent
          };
        } else {
          return child.toJSON();
        }
      })
    } as ITypeNode;
  }

  /**
   * 定义属性
   * todo 好像没有用上
   * @param node
   * @param key
   * @param value
   * @param handler
   */
  defineNodeProperty(
    node: TypeNode, // this
    key: keyof TypeNode,
    value: IJsonDataProp
  ) {
    const property = Object.getOwnPropertyDescriptor(node, key);
    if (property && property.configurable === false) {
      return;
    }
    Object.defineProperty(node, key, {
      configurable: true,
      enumerable: true,
      get() {
        // 调用 handler 的 get 方法（如果已实现）
        if (value instanceof XProxy) {
          console.log(`defineNodeProperty 获取属性 "${key}" 的值，值为XProxy类型，值为：`, value);
        }
        return value;
      },
      /**
       * todo 节点的属性赋值还要完善。
       * 属性本身的值的类型有可能是：
       * 1. 普通数据类型： 基础数据类型和引用类型，包括数组和对象。
       * 2. XProxy类型
       * @param newValue
       */
      set(newValue) {
        // console.log(`defineNodeProperty 拦截到了对属性 "${key}" 的赋值操作，新值为：`, newValue);
        // 自定义逻辑...
        if (newValue instanceof XProxy) { // modelValue
          console.error(`defineNodeProperty 拦截到了对属性 "${key}" 的赋值操作，newValue为XProxy类型，且值为：`, newValue);
        //   todo 将当前对象加载到 XProxy 中。
        }
        if (node[key] instanceof XProxy) {
          console.error('节点属性的值是XProxy类型。');
          (node as any)[key] = newValue;
        } else {
          (node as any)[key] = newValue;
        }
      }
    });
  }
}

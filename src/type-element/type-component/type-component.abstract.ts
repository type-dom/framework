import { TypeHtml } from '../type-html/type-html.abstract';
import { ITypeComponent } from './type-component.interface';
/**
 * 组件基类
 */
export abstract class TypeComponent extends TypeHtml implements ITypeComponent {
  abstract parent?: TypeHtml;
  nodeName : string;
  dom: HTMLElement;
  // childNodes: TypeNode[];
  // abstract setConfig(config: any): void
  protected constructor(nodeName: string = 'div') {
    super();
    this.nodeName = nodeName;
    this.dom = document.createElement(nodeName);
    this.childNodes = [];
  }
  // createItem<T extends TypeElement>(parent: TypeHtml, node: IComponent): T {
  //   console.log('type-component createItem . ');
  //   if (node.TypeClass === undefined) {
  //     throw Error('node.TypeClass is undefined . ');
  //   }
  //   // XElement 必须有nodeName,默认为div。
  //   const item = new node.TypeClass() as T; // 创建类实例
  //   item.parent = parent;
  //   console.log('item is ', item);
  //   if (node.propObj) {
  //     item.addStyleObj(node.propObj.styleObj);
  //     item.addAttrObj(node.propObj.attrObj);
  //   }
  //   if (node.config) {
  //     item.setConfig(node.config);
  //   }
  //   return item;
  // }
  // todo 有问题
  // createItems(parent: TypeHtml, nodes: IComponent[]) {
  //   console.log('type-component createItems . ');
  //   const items: TypeNode[] = [];
  //   for (const node of nodes) {
  //     if (node.TypeClass === undefined) {
  //       console.error('node.TypeClass is undefined . ');
  //       continue;
  //     }
  //     const item = this.createItem(parent, node);
  //     if (item) {
  //       items.push(item);
  //     }
  //   }
  //   return items;
  // }
}

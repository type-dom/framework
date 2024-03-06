import { TypeElement } from '../../type-element/type-element.abstract';
import { TypeHtml } from '../../type-element';
import { IRouterViewConfig } from './router-view.interface';

/**
 * 路由视图组件
 */
export class RouterView extends TypeHtml {
  className = 'RouterView';
  parent: TypeElement | undefined;
  nodeName: string;
  // childNodes: TypeNode[];
  dom: HTMLElement;

  constructor(config: Partial<IRouterViewConfig> = {}) {
    super();
    this.parent = config.parent;
    this.nodeName = config.nodeName || 'div';
    if (config.name) {
      this.addAttrName(config.name);
    }
    this.setConfig(config);
    this.childNodes = [];
    this.dom = document.createElement(this.nodeName);
  }

  // render(component) {
  //   this.element.innerHTML = '';
  //   this.element.appendChild(component);
  // }
}

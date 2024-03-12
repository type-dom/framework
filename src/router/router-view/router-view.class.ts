import { TypeElement } from '../../type-element/type-element.abstract';
import { TypeHtml } from '../../type-element';
import { IRouterViewConfig } from './router-view.interface';

/**
 * 路由视图组件
 */
export class RouterView extends TypeHtml {
  className = 'RouterView';
  nodeName: string;
  // childNodes: TypeNode[];
  dom: HTMLElement;

  constructor(config: IRouterViewConfig) {
    super();
    this.nodeName = config?.nodeName || 'div';
    this.dom = document.createElement(this.nodeName);
    this.setConfig(config);
    if (!config.parent) {
      throw new Error('RouterView must have a parent');
    }
    this.setParent(config.parent);
    // this.childNodes = [];
  }

  // render(component) {
  //   this.element.innerHTML = '';
  //   this.element.appendChild(component);
  // }
}

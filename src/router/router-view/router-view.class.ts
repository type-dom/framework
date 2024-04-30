import { TypeHtml } from '../../core/type-element/type-html/type-html.abstract';
import { IRouterViewConfig } from './router-view.interface';

/**
 * 路由视图组件
 * @author <xjf> <<xjf7711@qq.com>>
 * @example
 *
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
    this.addAttrName('router-view');
    this.setConfig(config);
    if (!config.parent) {
      throw new Error('RouterView must have a parent');
    }
    this.appendParent(config.parent);
    // this.childNodes = [];
  }

  // render(component) {
  //   this.element.innerHTML = '';
  //   this.element.appendChild(component);
  // }
}

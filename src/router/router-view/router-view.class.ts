import { TypeHtml } from '../../core/type-element/type-html/type-html.abstract';
import { IRouterViewConfig } from './router-view.interface';
import { TypeElement } from '../../core/type-element';
import { IRoute } from '../route.interface';
import { getClassFromModule } from '../util';

/**
 * 路由视图组件
 * @author <xjf> <<xjf7711@qq.com>>
 * @create-date 2024-04-24 09:06:03
 * @example
 *
 */
export class RouterView extends TypeHtml {
  className = 'RouterView';
  nodeName: string;
  // childNodes: TypeNode[];
  dom: HTMLElement;
  loaded: boolean; // 判断是不是已经被渲染过了；
  component?: TypeElement;

  constructor(config: IRouterViewConfig) {
    super();
    this.nodeName = config?.nodeName || 'div';
    this.dom = document.createElement(this.nodeName);
    this.addAttrName('router-view');
    this.setConfig(config);
    // if (!config.parent) {
    //   throw new Error('RouterView must have a parent');
    // }
    this.loaded = false;
    if (config.parent) {
      this.appendParent(config.parent);
    }
    // this.childNodes = [];
  }

  setLoaded(flag: boolean) {
    this.loaded = flag;
  }

  setComponent(component: TypeElement) {
    this.component = component;
  }

  /**
   * 加载路由
   * 加载时，目标路由的RouterView就指定为当前RouterView对象了。
   * @param route
   */
  async loadRoute(route: IRoute) {
    route.routerView = this;
    // 检查上层路由的组件是否定义，如果没有定义则抛出错误
    if (!route.component) {
      // 如果route或其component不存在，直接返回
      throw Error('upRoute.component is undefined . ');
    }
    // 等待组件加载完毕
    await route.component().then((module) => {
      // 输出模块信息用于调试
      console.log('module is ', module);
      // 从模块中获取组件类
      const Component = getClassFromModule(module);
      // 创建组件实例
      this.component = new Component() as TypeElement;
      if (this.component.routerView) {
        route.children?.forEach((childRoute) => {
          childRoute.routerView = this.component?.routerView;
        });
      }
      // 输出组件实例信息用于调试
      console.log('component is ', this.component);
      this.clearChildNodes();
      this.addChild(this.component);
      this.render();
    });
  }

  override render() {
    if (this.loaded) {
      console.error('router-view this is ', this);
      //   todo 渲染下级
      super.render();
      // this.component?.render();
    } else {
      super.render();
      this.loaded = true;
    }
  }
}

import { TypeFragment } from '../../core/type-fragment/type-fragment.abstract';
import { TypeElement } from '../../core';
import { IRoute } from '../route.interface';
import { getClassFromModule } from '../util';
import { IRouterViewConfig } from './router-view.interface';
import { TypeNode } from '../../core/type-node/type-node.abstract';

/**
 * 路由视图组件
 * todo 应该是个伪节点
 * @author <xjf> <<xjf7711@qq.com>>
 * @create-date 2024-04-24 09:06:03
 * @example
 *
 */
export class RouterView extends TypeFragment {
  className = 'RouterView';
   override props: IRouterViewConfig;
  // childNodes: TypeNode[];
  loaded: boolean; // 判断是不是已经被渲染过了；
  // component?: TypeElement;
  // override slot?: TypeElement; // 唯一子元素
  component?: TypeElement;
  constructor(params?: IRouterViewConfig) {
    super();
    this.props = this.setParams(params);
    this.loaded = false;
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
      throw Error('route.component is undefined . ');
    }
    // 等待组件加载完毕
    await route.component().then((module) => {
      // 输出模块信息用于调试
      console.log('module is ', module);
      // 从模块中获取组件类
      const Component = getClassFromModule(module);
      // 创建组件实例
      this.component = new Component() as TypeElement;
      // 输出组件实例信息用于调试
      console.log('this.slot is ', this.component);
      if (this.component.routerView) {
        route.children?.forEach((childRoute) => {
          childRoute.routerView = this.component?.routerView;
        });
      }
      this.clearChildren();
      this.addChild(this.component);
      console.log('this is ', this);
      this.elementParent?.mount()
    });
  }
}

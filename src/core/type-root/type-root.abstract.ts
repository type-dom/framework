import { TypeHtml } from '../type-html/type-html.abstract';
import { HtmlProps } from '../type-html/type-html.interface';
import type { ITypeRoot } from './type-root.interface';

/**
 * TypeRoot是一个元素根节点抽象类
 * 作为前端项目的入口文件要继承根节点抽象类，并挂载到对应的html页面元素上。
 * 挂载使用mount方法。
 * 根节点可以挂载其他子节点，也可以挂载其他根节点。
 * 根节点挂载到页面上后，其他子节点会自动挂载到根节点上。
 * 根节点抽象类
 * isRoot: true
 */
export abstract class TypeRoot extends TypeHtml implements ITypeRoot {
  dom?: HTMLElement;
  override isRoot: true;
  override props: HtmlProps;

  protected constructor(nodeName?: string) {
    super();
    this.isRoot = true; // 根节点
    this.props = this.useParams({
      nodeName: nodeName || 'div'
    })
  }
}

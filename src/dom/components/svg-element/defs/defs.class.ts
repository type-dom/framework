/**
 * `SvgDefs` 类定义了SVG定义元素的封装，用于创建和管理SVG定义（如渐变、过滤器等）。
 * 它继承自 `TypeSvg` 类，实现了 `ISvgDefs` 接口。
 */
import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import type { ISvgDefs, SvgDefsProps } from './defs.interface';

export class SvgDefs extends TypeSvg<SvgDefsProps> implements ISvgDefs {
  nodeName: 'defs'; // SVG元素的节点名称
  className: 'SvgDefs'; // 类名，用于CSS选择器
  dom: SVGDefsElement; // SVG DOM元素的引用
  override childNodes: TypeSvg[]; // 存储子节点的数组

  /**
   * 构造函数初始化 `SvgDefs` 实例。
   * @param params
   */

  constructor(params: SvgDefsProps = {}) {
    super(params); // 调用父类的构造函数
    this.nodeName = 'defs'; // 设置节点名称
    this.className = 'SvgDefs'; // 设置类名
    // 创建SVG defs元素，并设置为当前实例的DOM引用
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'defs'
    );
    this.childNodes = []; // 初始化子节点数组
  }
}

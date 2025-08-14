/**
 * `SvgMask` 类定义了SVG定义元素的封装，用于创建和管理SVG定义（如渐变、过滤器等）。
 * 它继承自 `TypeSvg` 类，实现了 `ISvgMask` 接口。
 */
import { SvgProps } from '../../../core/type-svg/type-svg.interface';
import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import type { ISvgMask } from './mask.interface';

export class SvgMask extends TypeSvg implements ISvgMask {
  nodeName: 'mask'; // SVG元素的节点名称
  className: 'SvgMask'; // 类名，用于CSS选择器
  dom: SVGMaskElement; // SVG DOM元素的引用
  override childNodes: TypeSvg[]; // 存储子节点的数组

  /**
   * 构造函数初始化 `SvgMask` 实例。
   * @param {TypeProps} config 可选的配置对象，用于配置SVG定义元素。
   */
  override isBasic = true;

  constructor(params: SvgProps = {}) {
    super(); // 调用父类的构造函数
    this.nodeName = 'mask'; // 设置节点名称
    this.className = 'SvgMask'; // 设置类名
    // 创建SVG defs元素，并设置为当前实例的DOM引用
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = []; // 初始化子节点数组
    this.slotChildren(params.slot);
    this.useParams(params); // 设置传入的配置项
  }
}

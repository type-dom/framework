/**
 * 定义一个接口 `ISvgDefs`，继承自 `ITypeSvg`，用于表示 SVG 中的 `<defs>` 元素。
 * `<defs>` 元素用于定义图形元素，这些元素可被其他 SVG 元素引用，但不会在画布上呈现。
 *
 * @extends ITypeSvg 继承自 `ITypeSvg` 接口，引入了 SVG 元素的基本属性和方法。
 */
import type { ITypeSvg, SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';

export interface ISvgDefs extends ITypeSvg {
  // nodeName: 'defs'; // 指定节点名称为 'defs'，对应 SVG 中的 <defs> 元素。
  className: 'SvgDefs'; // 定义类名为 'SvgDefs'，可用于 CSS 选择器或 JS 中的 instanceof 操作。
  childNodes: ITypeSvg[]; // 存储子节点信息的数组，子节点也是 ITypeSvg 类型，表示可以包含多个 SVG 元素。
  props?: SvgDefsProps;
}

export interface SvgDefsProps extends SvgProps {
  // 定义属性接口，继承自 SvgProps 接口。
  // 可以添加自定义属性，如 fill、stroke 等。
  attrObj?: SvgProps['attrObj'] & {
    shdId?: string;
  };
}

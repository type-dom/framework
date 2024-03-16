import type { ITextNode } from '../../text-node/text-node.interface';
import type {
  ITypeAttribute,
  ITypeElement,
  ITypeProperty
} from '../type-element.interface';

export interface ITypeSvg extends ITypeElement {
  propObj: ITypeSvgProperty;
  childNodes: (ITypeSvg | ITextNode)[];
}

export interface ITypeSvgProperty extends ITypeProperty {
  attrObj: Partial<ITypeSvgAttribute>;
}

export interface ITypeSvgAttribute extends ITypeAttribute {
  // start?: string,
  /**
   * “d”属性包含一系列路径描述的字符串，这些路径是以下指令的组合：
   * moveto、lineto、curveto、arcto和closepath。
   * 这些指令被合并在一个字符串中，命令区分大小写。
   * 大写命令将其参数指定为绝对位置，而小写命令指定相对于当前位置的点。
   *
   * “M”或“m”表示moveto指令，用于指定路径的起始点。它后面跟随的是x和y坐标。
   * 如果使用大写“M”，则坐标是绝对位置；如果使用小写“m”，则坐标是相对于当前位置的距离。
   *
   * 同样，“L”或“l”表示lineto指令，用于从当前位置画一条直线到指定位置。
   * “H”或“h”表示水平lineto，只改变x坐标；“V”或“v”表示垂直lineto，只改变y坐标。
   *
   * 此外，“C”或“c”表示curveto指令，用于创建贝塞尔曲线。
   * “S”或“s”表示光滑curveto，用于创建与前一个curveto或smooth curveto命令的控制点对称的控制点。
   *
   * 最后，“Z”或“z”表示closepath指令，用于关闭路径，将当前点与起始点连接。
   *
   * 通过这些指令和它们的参数，可以创建复杂的形状和路径。
   */
  d?: string;
  /**
   * stroke-linejoin属性用于设置线段连接的方式。
   *
   * miter：默认值，表示尖角。
   * round：表示圆角。
   * bevel：表示斜角。
   * inherit：表示继承父元素的属性。
   */
  strokeLinejoin?: string;
  /**
   * stroke-linecap属性用于定义在打开子路径末尾使用的形状。具体用法为：stroke-linecap: butt | round | square | initial | inherit。属性值有：
   *
   * butt：它用于指示笔划不会超出笔划的端点。它使笔划看起来以锐利的直角结束。
   * round：使子路径的末端呈圆形。
   * square：使子路径的末端呈方形。
   */
  strokeLinecap?: string;
  /**
   * stroke-dashoffset属性在SVG中主要用于控制虚线线段的绘制。
   * 当其值大于0时，线段会向左偏移相应的距离，表现为空白间距。
   * 当其值为0时，显示的是完整的线段。
   * 这个属性主要应用于进度条等需要动态展示进度的场合。
   */
  strokeDashoffset?: string;
  /**
   * stroke-dasharray属性用于描述Shape类型轮廓的虚线和间隔的样式。
   * 它的写法为stroke-dasharray=”str”。str是虚线和间隙的值的集合，奇数项为虚线长度，
   * 偶数项为间隙长度。例如，stroke-dasharray=”2 1”，则表示虚线长度为2，间隔为1。
   * stroke-dasharray=”2” 则表示虚线和间隔都是2。
   * 如：stroke-dasharray=”12 12”，由此可见网状格子的虚线，长为12，虚线间空缺为12。
   * stroke-dasharray=”12 2”，由此可见网状格子的虚线，长为12，虚线间空缺为2。
   */
  strokeDasharray: string;
}

import { SvgCircle } from './circle/circle.class';
import { SvgDefs } from './defs/defs.class';
import { SvgEllipse } from './ellipse/ellipse.class';
import { SvgImage } from './image/image.class';
import { SvgLine } from './line/line.class';
import { SvgLinearGradient } from './linear-gradient/linear-gradient.class';
import { SvgPath } from './path/path.class';
import { SvgRadialGradient } from './radial-gradient/radial-gradient.class';
import { SvgRect } from './rect/rect.class';
import { SvgStop } from './stop/stop.class';
import { SvgSvg } from './svg/svg.class';
import { SvgText } from './text/text.class';

export interface SvgTypes {
  // a: SvgA
  circle: SvgCircle
  // clipPath: SvgClipPath
  defs: SvgDefs
  // desc: SvgDesc
  ellipse: SvgEllipse
  // feBlend: SvgFeBlend
  // feColorMatrix: SvgFeColorMatrix
  // feComponentTransfer: SvgFeComponentTransfer
  // feComposite: SvgFeComposite
  // feConvolveMatrix: SvgFeConvolveMatrix
  // feDiffuseLighting: SvgFeDiffuseLighting
  // feDisplacementMap: SvgFeDisplacementMap
  // feDistantLight: SvgFeDistantLight
  // feFlood: SvgFeFlood
  // feFuncA: SvgFeFuncA
  // feFuncB: SvgFeFuncB
  // feFuncG: SvgFeFuncG
  // feFuncR: SvgFeFuncR
  // feGaussianBlur: SvgFeGaussianBlur
  // feImage: SvgFeImage
  // feMerge: SvgFeMerge
  // feMergeNode: SvgFeMergeNode
  // feMorphology: SvgFeMorphology
  // feOffset: SvgFeOffset
  // fePointLight: SvgFePointLight
  // feSpecularLighting: SvgFeSpecularLighting
  // feSpotLight: SvgFeSpotLight
  // feTile: SvgFeTile
  // feTurbulence: SvgFeTurbulence
  // filter: SvgFilter
  // foreignObject: SvgForeignObject
  // g: SvgG
  image: SvgImage
  line: SvgLine
  linearGradient: SvgLinearGradient
  // marker: SvgMarker
  // mask: SvgMask
  // metadata: SvgMetadata
  path: SvgPath
  // pattern: SvgPattern
  // polygon: SvgPolygon
  // polyline: SvgPolyline
  radialGradient: SvgRadialGradient
  rect: SvgRect
  // script: SvgScript
  stop: SvgStop
  // style: SvgStyle
  svg: SvgSvg
  // switch: SvgSwitch
  // symbol: SvgSymbol
  text: SvgText
  // textPath: SvgTextPath
  // title: SvgTitle
  // tspan: SvgTspan
  // use: SvgUse
  // view: SvgView
}

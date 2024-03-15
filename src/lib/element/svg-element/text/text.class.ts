import { TextNode } from '../../../text-node/text-node.class';
import { TypeSvgSvg } from '../../../type-element/type-svg/svg/svg.abstract';
import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import type { ISvgText, ISvgTextConfig, ISvgTextProperty } from './text.interface';

export class SvgText extends TypeSvg implements ISvgText {
  nodeName: 'text';
  dom: SVGTextElement;
  className: 'SvgText';
  declare propObj: ISvgTextProperty;
  declare childNodes: TextNode[];
  declare parent?: TypeSvgSvg;
  textNode: TextNode;

  constructor(config: Partial<ISvgTextConfig>) {
    super();
    this.nodeName = 'text';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.className = 'SvgText';
    this.propObj = {
      styleObj: {},
      attrObj: {
        x: 0,
        y: 0
      }
    };
    this.textNode = new TextNode();
    this.childNodes = [this.textNode];
    if (config.text) {
      this.textNode.setText(config.text);
    }
    this.setConfig(config);
  }
}

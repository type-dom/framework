import { fromEvent } from 'rxjs';
import { TypeHtml } from '../type-element/type-html/type-html.abstract';
import { TypeContainer } from '../type-element/type-container/type-container.abstract';
import { Span } from '../element/html-element/span/span.class';
import { TextNode } from '../text-node/text-node.class';
import { TriangleSvg } from './svgs/triangle/triangle';
export class ExpandHeading extends TypeHtml {
  nodeName: 'h3';
  className: 'ExpandHeading';
  dom: HTMLHeadingElement;
  childNodes: [TriangleSvg, Span];
  svg: TriangleSvg;
  title: Span;
  constructor(public parent: TypeContainer, title: string) {
    super('h3');
    this.nodeName = 'h3';
    this.dom = document.createElement(this.nodeName);
    this.className = 'ExpandHeading';
    this.propObj = {
      styleObj: {
        margin: '0',
        backgroundColor: '#a0a0a0',
        color: '#fff',
        textIndent: '20px',
        borderRadius: '4px 4px 0 0',
        width: '100%',
      },
      attrObj: {
        name: 'expand-heading',
      }
    };

    this.svg = new TriangleSvg(this);

    this.title = new Span(this);
    // span.setStyle('verticalAlign', 'middle');
    this.title.childNodes = [new TextNode(this, title)];
    this.childNodes = [this.svg, this.title];

    this.initEvents();
  }

  initEvents(): ExpandHeading {
    this.events.push(
      fromEvent(this.svg.dom, 'click').subscribe((e: Event) => {
        e.stopPropagation();
        const style = getComputedStyle(this.svg.dom);
        console.log('style.transform is ', style.transform);
        if (this.svg.styleObj.transform === 'rotate(-90deg)') {
          this.svg.setStyleObj({
            transform: 'rotate(0deg)',
            transition: 'transform 0.3s'
          });
          console.log('style.transform is ', style.transform);
          this.parent.lastChild.setStyle('display', 'flex');
        } else {
          this.svg.setStyleObj({
            transform: 'rotate(-90deg)',
            transition: 'transform 0.3s'
          });
          this.parent.lastChild.setStyle('display', 'none');
        }
      }),
    );
    return this;
  }
}

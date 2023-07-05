import { TypeRoot } from './type-root/type-root.class';
import { Br } from './element/html-element/br/br.class';
import { TextNode } from './text-node/text-node.class';
import { Division } from './element/html-element/division/division.class';
/**
 * 应用根节点，必须存在。
 * 应用继承 TypeRoot;
 * 因为属性和方法要全局调用，所以全部设置为静态 static; 包括get也设置为静态
 * UI组件显示页面
 */
export class AppRoot extends TypeRoot {
  className: 'UIView';
  constructor(editorEl: HTMLElement) {
    super(editorEl);
    console.log('UIView constructor . ');
    this.className = 'UIView';
    this.addStyleObj({
      padding: '30px'
    });
    this.createItems(this, [
      {
        TypeClass: Division,
        childNodes: [
          {
            TypeClass: TextNode,
            config: {
              title: ' hello world ! '
            }
          },
        ]
      },
      {
        TypeClass: Br
      }
    ]);
    this.render();
  }
}

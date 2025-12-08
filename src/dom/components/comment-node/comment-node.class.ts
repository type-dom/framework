import { NodeName } from '../../../core/enums';
import { TypeNode } from '../../../core/type-node/type-node.abstract';
import { TypeElement } from '../../../core/type-element/type-element.abstract';
import { mountComment } from '../../../core/renderer/mountComment';
import { RendererElement } from '../../../core/renderer/renderer';
import { ICommentNode } from "./comment-node.interface";

/**
 *
 */
export class CommentNode extends TypeNode implements ICommentNode {
  className: 'CommentNode';
  childNodes: undefined;
  dom: Comment;
  // text: string;
  constructor(text: string, parent?: TypeElement) {
    super({ nodeName: NodeName.COMMENT, nodeValue: text });
    this.className = 'CommentNode';
    // this.text = text;
    // if (text === 'input') {
    //   console.error('text is input . ');
    // }
    // this.props.nodeName = NodeName.COMMENT;
    // this.props.nodeValue = text;
    if (parent) {
      this.parent = parent;
    }
    this.dom = document.createComment(String(text ?? ''));
  }

  // useParams<T extends TypeProps>(params = {} as T): T {
  //   assignProps(this, params);
  //   return this.props as T;
  // }

  render() {
    this.dom = document.createComment(String(this.props.nodeValue ?? ''));
    this.isRendered = true;
  }

  mount(el?: RendererElement) {
    mountComment(this, el);
  }
}

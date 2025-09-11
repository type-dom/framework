import { NodeName } from '../../../core/enums';
import {TypeNode} from '../../../core/type-node/type-node.abstract';
import {TypeProps} from '../../../core/type-node/type-node.interface';
import { TypeElement } from '../../../core/type-element/type-element.abstract';
import { TypeEl } from '../../../core/type-element/type-element.interface';
import { mountComment } from '../../../core/helpers/mountComment';
import { assignProps } from '../../../core/helpers/assignProps';
import {ICommentNode} from "./comment-node.interface";

/**
 *
 */
export class CommentNode extends TypeNode implements ICommentNode {
  className: 'CommentNode';
  override props: TypeProps;
  childNodes: undefined;
  dom?: Comment;
  // text: string;
  constructor(text: string, parent?: TypeElement) {
    super();
    this.className = 'CommentNode';
    this.props = this.baseProps;
    // this.text = text;
    // if (text === 'input') {
    //   console.error('text is input . ');
    // }
    this.props.nodeName = NodeName.COMMENT;
    this.props.nodeValue = text;
    if (parent) {
      this.parent = parent;
    }
  }

  useParams<T extends TypeProps>(params = {} as T): T {
    this.params = params;
    assignProps(this, params);
    return this.props as T;
  }

  render() {
    this.dom = document.createComment(String(this.props.nodeValue ?? ''));
    this.isRendered = true;
  }

  mount(el?: TypeEl) {
    mountComment(this, el);
  }
}

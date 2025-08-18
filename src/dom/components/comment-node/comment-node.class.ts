import {TypeNode} from "../../../core/type-node/type-node.abstract";
import { LifecycleHooks, NodeName } from '../../../core/enums';
import { TypeElement} from "../../../core/type-element/type-element.abstract";
import { type TypeEl,} from "../../../core/type-element/type-element.interface";
import {TypeProps} from "../../../core/type-node/type-node.interface";
import { assignProps } from '../../../core/helpers/assignProps'
import {ICommentNode} from "./comment-node.interface";

/**
 *
 */
export class CommentNode extends TypeNode implements ICommentNode {
  className: 'CommentNode';
  /**
   * 节点名称，值为 'comment'
   */
  nodeName = NodeName.COMMENT;
  override props: TypeProps;
  childNodes: undefined;
  rendered: boolean;
  dom?: Comment;
  text: string;
  constructor(text: string, parent?: TypeElement) {
    super();
    this.className = 'CommentNode';
    this.props = this.baseProps;
    this.text = text;
    this.rendered = false;
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
    this.dom = document.createComment(this.text);
    this.rendered = true;
  }

  mount(el?: TypeEl) {
    this.dom?.remove();
    this.lifeCycles[LifecycleHooks.CREATED]?.forEach((cb) => cb());
    this.render();
    this.lifeCycles[LifecycleHooks.BEFORE_MOUNT]?.forEach((cb) => cb());
    if (this.dom) {
      let appEl: Exclude<TypeEl, string>;
      if (typeof el === 'string') {
        appEl = document.querySelector<HTMLElement>(el);
      } else if (el) {
        appEl = el;
      } else {
        appEl = this.parent?.elementParent?.dom as
          | HTMLElement
          | SVGElement
          | undefined;
      }
      appEl?.appendChild(this.dom);
    }
    // console.log('this.dom is ', this.dom);
    this.lifeCycles[LifecycleHooks.MOUNTED]?.forEach((cb) => cb());
  }
}

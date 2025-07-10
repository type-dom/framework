import {TypeNode} from "../type-node/type-node.abstract";
import {ICommentNode} from "./comment-node.interface";
import { LifecycleHooks, NodeName } from '../enums';
import {ElProp, TypeElement} from "../type-element";
import {TypeProps} from "../type-node/type-node.interface";

/**
 *
 */
export class CommentNode extends TypeNode implements ICommentNode {
  className: 'CommentNode';
  /**
   * 节点名称，值为 'comment'
   */
  nodeName: NodeName.COMMENT;
  style: undefined;
  attr: undefined;
  childNodes: undefined;
  rendered: boolean;
  dom?: Comment;
  text: string;
  constructor(text: string, parent?: TypeElement) {
    super();
    this.className = 'CommentNode';
    this.nodeName = NodeName.COMMENT;
    this.text = text;
    this.rendered = false;
    if (parent) {
      this.parent = parent;
    }
  }

  useParams<T extends TypeProps>(params = {} as T): T {
    this.params = params;
    this.assignProps(params);
    return this.props as T;
  }

  render() {
    this.dom = document.createComment(this.text);
    this.rendered = true;
  }

  mount(el?: ElProp) {
    this.dom?.remove();
    this.lifeCycles[LifecycleHooks.CREATED]?.forEach((cb) => cb());
    this.render();
    this.lifeCycles[LifecycleHooks.BEFORE_MOUNT]?.forEach((cb) => cb());
    if (this.dom) {
      let appEl: Exclude<ElProp, string>;
      if (typeof el === 'string') {
        appEl = document.querySelector<HTMLElement>(el);
      } else if (el) {
        appEl = el;
      } else {
        appEl = this.parent?.elementParent?.dom as  HTMLElement | SVGElement | undefined;
      }
      appEl?.appendChild(this.dom);
    }
    // console.log('this.dom is ', this.dom);
    this.lifeCycles[LifecycleHooks.MOUNTED]?.forEach((cb) => cb());

  }
  override unmount(root?: TypeElement) {
    this.lifeCycles[LifecycleHooks.BEFORE_UNMOUNT]?.forEach((fn) => fn());
    super.unmount(root);
    this.text = '';
    this.lifeCycles[LifecycleHooks.UNMOUNTED]?.forEach((fn) => fn());
  }
}

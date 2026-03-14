import { NodeName } from '../../../core/enums';
import { TypeNode } from '../../../core/abstracts/type-node/type-node.abstract';
import { TypeElement } from '../../../core/abstracts/type-element/type-element.abstract';
import { RendererElement } from '../../../core/renderer/renderer';
import { mountComment } from './mountComment';
import { ICommentNode } from './comment-node.interface';
/**
 * CommentNode 类表示注释节点，继承自 TypeNode 类
 * 用于创建和管理 HTML 注释节点
 *
 * @param text - 注释内容，将被转换为字符串
 * @param parent - 可选的父元素，用于设置节点的父子关系
 */
export class CommentNode extends TypeNode implements ICommentNode {
  className: 'CommentNode';
  childNodes: undefined;
  dom: Comment;
  constructor(text: string, parent?: TypeElement) {
    super({ nodeName: NodeName.COMMENT, nodeValue: text });
    this.className = 'CommentNode';
    // 设置父元素引用（如果提供）
    if (parent) {
      this.parent = parent;
    }
    // 创建实际的 DOM 注释节点
    this.dom = document.createComment(String(text ?? ''));
  }

  /**
   * 渲染注释节点
   * 根据 props 中的 nodeValue 创建新的注释 DOM 节点
   */
  render() {
    this.dom = document.createComment(String(this.props.nodeValue ?? ''));
    this.isRendered = true;
  }

  /**
   * 挂载注释节点到指定容器
   *
   * @param container - 目标容器元素，注释将被添加到此容器中
   */
  mount(container: RendererElement) {
    mountComment(this, container);
  }
}

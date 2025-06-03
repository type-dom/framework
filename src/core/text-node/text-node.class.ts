import { Computed, isRef, Signal, toRaw, watch } from '@type-dom/signals';
import { isMustache } from '@type-dom/utils';
import { TypeNode } from '../type-node/type-node.abstract';
import { TypeElement } from '../type-element/type-element.abstract';
import { LifecycleHooks, NodeName } from '../enums';
import type { TypeProps } from '../type-node/type-node.interface';
import type { ITextNode } from './text-node.interface';
import { ElProp } from '../type-element/type-element.interface';
import { useTextRender } from './useRender';

/**
 * 文本节点类
 * ----> 本身会渲染成Text。
 */
export class TextNode extends TypeNode implements ITextNode {
  /**
   * 节点类型标识，值为 'TextNode'
   */
  className: 'TextNode';
  /**
   * 节点名称，值为 '#text'
   */
  nodeName: NodeName.TEXT;
  /**
   * 节点值，类型为字符串
   */
  nodeValue: string;
  // text: string;
  style: undefined;
  attr: undefined;
  /**
   * DOM 文本节点对象
   */
  dom?: Text;
  /**
   * 子节点，此处未定义
   */
  childNodes: undefined;

  rendered: boolean;

  /**
   * 构造函数，创建文本节点
   *
   * @param text 文本内容，默认为 '\u200c'
   * @param parent 父级节点
   */
  constructor(
    text: string | number | Signal<string | number> | Computed<string | number> = '\u200c',
    parent?: TypeElement
  ) {
    super();
    this.rendered = false;
    this.className = 'TextNode';
    this.nodeName = NodeName.TEXT;
    if (parent) {
      this.parent = parent;
    }
    if (isRef(text)) {
      // console.warn('TextNode isRef text is ', text);
      this.nodeValue = toRaw(text).toString();
      setTimeout(() => { // todo 只有这样才生效 ？？？？？
        // slotChildren 在constructor中调用
        watch(() => toRaw(text), (newVal) => {
          // console.warn('TextNode watch text is ', this.nodeValue);
          this.nodeValue = newVal?.toString();
          this.setText(newVal);
        })
      }, 0)
    } else {
      this.nodeValue = String(text);
      if (isMustache(String(text))) {
        //   todo 订阅 字符串 + 变量
        // if (this.itemData) {
        //   this.itemData.data$.subscribe((data: IXData) => {
        //     this.mount();
        //   });
        // }
      }
    }
  }

  // get itemData() {
  //   return this._data || this.parent?.itemData;
  // }

  // get textContentLength(): number {
  //   return this.textContent.length;
  // }

  // todo delete
  // get textContent(): string {
  //   return this.nodeValue;
  // }

  /**
   * 获取节点长度
   *
   * @returns 节点长度
   */
  override get length(): number {
    return this.nodeValue.length;
  }

  useParams<T extends TypeProps>(params = {} as T): T {
    this.params = params;
    this.assignProps(params);
    return this.props as T;
  }

  /**
   * 设置节点文本内容
   *
   * @param text 文本内容
   */
  setText(text: boolean | string | number): void {
    this.nodeValue = String(text);
    this.mount();
  }

  /**
   * 把新内容添加到 this.textContent 末尾。
   * 注： this.mount()有问题
   * 同时父级对象重新渲染。
   * 在节点文本末尾添加新内容
   * @param content 新内容
   */
  appendText(content: string): void {
    if (content === '') {
      return;
    }
    this.nodeValue = this.nodeValue.concat(content);
    this.mount();
    // this.parent?.mount();
  }

  /**
   * 调用 String自带slice方法
   * 根据指定位置，切分出节点文本内容的一部分
   *
   *  @param startOffset 起始位置
   *  @param endOffset 结束位置，默认为节点长度
   *  @returns 切分出的文本内容
   */
  sliceText(startOffset: number, endOffset = this.length): string {
    if (startOffset >= endOffset) {
      return '';
    }
    return this.nodeValue.slice(startOffset, endOffset);
    // return this.textContent.substring(startIndex, endIndex);
  }

  /**
   * 光标状态或选择状态下的插入。
   * 在指定位置插入新文本或节点
   *
   * @param text 要插入的文本
   * @param startOffset 起始位置
   * @param endOffset 结束位置
   */
  insertText(text: string, startOffset: number, endOffset = startOffset): void {
    const content = this.nodeValue;
    const preContent = content.substring(0, startOffset);
    const endContent = content.substring(endOffset);
    const newContent = preContent.concat(text, endContent);
    // this.childNodes = [newContent];
    this.setText(newContent);
    // todo error 光标移到头部。 ??触发selectionchange??
    // this.mount(); //
    // this.parent?.mount();
  }

  /**
   * 根据起始位置和结束位置删除节点文本内容
   * 光标状态和选中状态的不同处理
   *
   * @param startOffset 起始位置 ---> 与editor.startOffset的关系
   * @param endOffset 结束位置，默认为起始位置
   */
  deleteText(startOffset: number, endOffset = startOffset): void {
    // todo startOffset === 0时。
    //  delete事件中处理。删除该文本节点，或与之前的文本节点合并，或合并段落，或没有操作等等
    if (startOffset === 0) {
      // 光标在头部
      return;
    }
    let preContent;
    let endContent;
    // 光标状态 删除光标前一个字符
    if (startOffset === endOffset) {
      // todo slice substring
      preContent = this.nodeValue.slice(0, startOffset - 1);
      endContent = this.nodeValue.slice(endOffset);
      //  todo 直接设置editor.startOffset
      // startOffset -= 1;
      // endOffset -= 1;
    } else {
      // 选择状态 删除选中的文字
      preContent = this.nodeValue.slice(0, startOffset);
      // console.log('preContent is ', preContent);
      // console.log('endOffset is ', endOffset);
      endContent = this.nodeValue.slice(endOffset);
      // console.log('endContent is ', endContent);
      // endOffset = startOffset;
    }
    const newContent = preContent.concat(endContent);
    // console.log('newContent is ', newContent);
    this.setText(newContent);
    // TODO 不能直接用 this.mount(); 光标调到行程头部。
    this.mount();
    // this.parent?.mount();
  }

  mount(el?: ElProp) {
    this.dom?.remove();
    this.created?.();
    this.render();
    this.beforeMount?.();
    if (this.dom) {
      let appEl: Exclude<ElProp, string>;
      if (typeof el === 'string') {
        appEl = document.querySelector<HTMLElement>(el);
      } else if (el) {
        appEl = el;
      } else {
        appEl = this.parent?.elementParent?.dom;
      }
      appEl?.appendChild(this.dom);
    }
    // console.log('this.dom is ', this.dom);
    this.mounted?.(); // 渲染后处理
  }

  // todo 钩子函数
  render(): void {
    useTextRender(this);
  }

  update(el?: ElProp): void {
    let appEl: Exclude<ElProp, string>;
    if (typeof el === 'string') {
      appEl = document.querySelector<HTMLElement>(el);
    } else {
      appEl = el;
    }
    this.render();
    if (appEl && this.dom) {
      appEl.appendChild(this.dom);
    }
    this.updated?.();
  }

  override unmount(root?: TypeElement) {
    // TypeElement 需要单独清理事件
    this.lifeCycles[LifecycleHooks.BEFORE_UNMOUNT]?.forEach((fn) => fn());
    this.clearEvents();
    super.unmount(root);
    this.nodeValue = '';
    this.lifeCycles[LifecycleHooks.UNMOUNTED]?.forEach((fn) => fn());
  }
}

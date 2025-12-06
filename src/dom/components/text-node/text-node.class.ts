import { isMustache } from '@type-dom/utils';
import { isRef, MaybeRef, toRaw, unref, watch, } from '../../../reactivity';
import { LifecycleHooks, NodeName } from '../../../core/enums';
import { TypeNode } from '../../../core/type-node/type-node.abstract';
import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeElement } from '../../../core/type-element/type-element.abstract';
import { TypeEl } from '../../../core/type-element/type-element.interface';
import { assignProps } from '../../../core/helpers/assignProps';
import { mountText } from '../../../core/helpers/mountText';
import { useTextRender } from './useRender';
import type { ITextNode } from './text-node.interface';

/**
 * 文本节点类
 * 会渲染成Text。
 */
export class TextNode extends TypeNode implements ITextNode {
  /**
   * 节点类型标识，值为 'TextNode'
   */
  className: 'TextNode';
  /**
   * 节点名称，值为 '#text'
   */
  // nodeName: NodeName.TEXT;
  /**
   * 节点值，类型为字符串
   */
  // nodeValue: string;
  override props: TypeProps;
  // text: string;
  style: undefined;
  attr: undefined;
  /**
   * DOM 文本节点对象
   */
  dom: Text;
  /**
   * 子节点，此处未定义
   */
  childNodes: undefined;

  // rendered: boolean;

  /**
   * 构造函数，创建文本节点
   *
   * @param text 文本内容，默认为 '\u200c'
   * @param parent 父级节点
   */
  constructor(
    text: MaybeRef<string | number> = '\u200c',
    parent?: TypeElement
  ) {
    super();
    this.isRendered = false;
    this.className = 'TextNode';
    this.props = this.baseProps;
    this.props.nodeName = NodeName.TEXT;
    this.dom = document.createTextNode(String(unref(text)) || '');
    if (parent) {
      this.parent = parent;
    }
    if (isRef(text)) {
      // console.warn('TextNode isRef text is ', text);
      this.props.nodeValue = toRaw(text).toString();
      // setTimeout(() => { // todo 只有这样才生效 ？？？？？
        // transformSlot 在constructor中调用
        watch(() => toRaw(text), (newVal) => {
          // console.warn('TextNode watch text is ', this.props.nodeValue);
          this.props.nodeValue = newVal?.toString();
          this.setText(newVal);
        })
      // }, 0)
    } else {
      this.props.nodeValue = String(text);
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
  //   return this.props.nodeValue;
  // }

  /**
   * 获取节点长度
   *
   * @returns 节点长度
   */
  override get length() {
    return this.props.nodeValue?.toString().length ?? 0;
  }

  useParams<T extends TypeProps>(params = {} as T): T {
    this.params = params;
    assignProps(this, params);
    return this.props as T;
  }

  /**
   * 设置节点文本内容
   *
   * @param text 文本内容
   */
  setText(text: boolean | string | number): void {
    this.props.nodeValue = String(text);
    // this.mount();
    this.dom.nodeValue = this.props.nodeValue;
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
    this.props.nodeValue = this.props.nodeValue?.toString().concat(content);
    // this.parent?.mount();
    mountText(this);
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
    return this.props.nodeValue?.toString().slice(startOffset, endOffset) ?? '';
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
    const content = this.props.nodeValue?.toString();
    const preContent = content?.substring(0, startOffset);
    const endContent = content?.substring(endOffset);
    const newContent = preContent?.concat(text, endContent ?? '');
    // this.childNodes = [newContent];
    this.setText(newContent ?? '');
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
      preContent = this.props.nodeValue?.toString().slice(0, startOffset - 1);
      endContent = this.props.nodeValue?.toString().slice(endOffset);
      //  todo 直接设置editor.startOffset
      // startOffset -= 1;
      // endOffset -= 1;
    } else {
      // 选择状态 删除选中的文字
      preContent = this.props.nodeValue?.toString().slice(0, startOffset);
      // console.log('preContent is ', preContent);
      // console.log('endOffset is ', endOffset);
      endContent = this.props.nodeValue?.toString().slice(endOffset);
      // console.log('endContent is ', endContent);
      // endOffset = startOffset;
    }
    const newContent = preContent?.concat(endContent ?? '');
    // console.log('newContent is ', newContent);
    this.setText(newContent ?? '');
    // TODO 不能直接用 this.mount(); 光标调到行程头部。
    mountText(this);
    // this.parent?.mount();
  }

  // todo 钩子函数
  render(): void {
    useTextRender(this);
  }

  mount(el?: TypeEl) {
    mountText(this, el);
  }
  update(el?: TypeEl): void {
    let appEl: Exclude<TypeEl, string>;
    if (typeof el === 'string') {
      appEl = document.querySelector<HTMLElement>(el);
    } else {
      appEl = el ?? this.parent?.dom;
    }
    this.render();
    if (appEl && this.dom) {
      appEl.appendChild(this.dom);
    }
    this.lifeCycles[LifecycleHooks.UPDATED]?.forEach((cb) => cb());
  }
}

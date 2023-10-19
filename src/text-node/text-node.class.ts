import { TypeNode } from '../type-node/type-node.abstract';
import { TypeElement } from '../type-element/type-element.abstract';
import { ITextNode } from './text-node.interface';
/**
 * 虚拟文本节点。
 * ----> 本身不会渲染成标签。没有对应的HTML标签。
 */
export class TextNode extends TypeNode implements ITextNode {
  className: 'TextNode';
  childNodes: undefined;
  nodeName: '#text';
  nodeValue: string;
  // text: string;
  dom: Text;
  // template?: string;
  /**
   * @param parent
   * @param text
   */
  constructor(public parent: TypeElement, text = '') { // \u200c
    super();
    this.className = 'TextNode';
    this.nodeName = '#text';
    this.nodeValue = text;
    this.dom = document.createTextNode(text.toString());
  }
  get itemData() {
    return this.data || this.parent.itemData;
  }
  // get textContentLength(): number {
  //   return this.textContent.length;
  // }

  // run中可能会有多个TextNode 了。
  get index(): number {
    return this.parent ? this.parent.findChildIndex(this) : -1;
  }
  // todo delete
  // get textContent(): string {
  //   return this.nodeValue;
  // }
  get length(): number {
    return this.nodeValue.length;
  }
  // setConfig(config: Record<string, any>) {
  //   this.setText(config.title);
  // }
  setText(text: string): void {
    this.nodeValue = text;
    this.render();
  }
  /**
   * 把新内容添加到 this.textContent 末尾。
   * 注： this.render()有问题
   * 同时父级对象重新渲染。
   * @param content 新内容
   */
  appendText(content: string): void {
    if (content === '') {
      return;
    }
    this.nodeValue = this.nodeValue.concat(content);
    // this.render();
    this.parent.render();
  }
  /**
   * 调用 String自带slice方法
   * 根据指定位置，切分出内容中的一部分。
   * @param startOffset
   * @param endOffset
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
   * 在指定下标插入新的文本或节点。
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
    // this.render(); //
    this.parent.render();
  }
  /**
   * 光标状态和选中状态的不同处理
   * @param startOffset ---> 与editor.startOffset的关系
   * @param endOffset
   */
  deleteText(startOffset: number, endOffset = startOffset): void {
    // todo startOffset === 0时。
    //  delete事件中处理。删除该文本节点，或与之前的文本节点合并，或合并段落，或没有操作等等
    if (startOffset === 0) { // 光标在头部
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
    } else { // 选择状态 删除选中的文字
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
    // TODO 不能直接用 this.render(); 光标调到行程头部。
    // this.render();
    this.parent.render();
  }
  // 这个方法是没有地方触发的
  createItem(parent: TypeElement, node: ITextNode): TextNode {
    const item = new TextNode(parent); // 创建类实例
    console.log('item is ', item);
    item.setParent(parent);
    // todo ??? 需要吗 ？？？
    // if (node.nodeValue !== undefined) {
    //   item.setText(node.nodeValue);
    // }
    if (node.nodeValue !== undefined) { // 如果是文本节点，则退出迭代; XNode,TextNode会有
      if (item.nodeValue !== undefined) {
        item.nodeValue = node.nodeValue;
        return item;
      } else {
        throw Error('TypeClass is not TextNode, but nodeValue exist. ');
      }
    }
    return item;
  }
  render(): void {
    // 渲染出来的值，在 模板语法中需要转换的。
    let text = this.nodeValue;
    if (this.itemData) {
      text = mustache(this.nodeValue, this.itemData);
    }
    this.dom.textContent = text || '';  // '\u200b'; // &zwnj; \u200c &zwsp;
  }
}
// const template = "Hello, {{name}}!";
// const data = { name: "Alice" };
// const renderer = mustache(template);
// console.log(renderer(data)); // 输出 "Hello, Alice!"
function mustache(template: string, data: Record<string, string>) {
  let pattern = /\{\{([\w\s\.]+)\}\}/g;
  let result = template;
  let match;
  while (match = pattern.exec(template)) {
    const keys = match[1].trim().split('.');
    let value: any = data[keys[0]];
    for (let i = 1; i < keys.length; i++) {
      value = value[keys[i]];
    }
    if (value !== undefined) {
      result = result.replace(match[0], value);
    }
  }
  return result;
}

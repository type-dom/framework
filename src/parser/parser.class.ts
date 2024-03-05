import {
  XMLParserErrorCode,
  isWhitespace,
  isWhitespaceString,
} from '@type-dom/utils';
import { TextNode, XElement } from '../index';
// import { XElement } from "../element/x-element/x-element.class"; // todo 这样会报错。上面引入没问题；
import type { INodeAttr } from '../index';
import type { IContent, IInstruction, IParserParam } from './parser.interface';

/**
 * The code for XMLParser copied from pdf.js
 * 虚拟DOM/XML字符串解析工具
 * DOM/XML对象和String字符串之间的转换
 * 字符串解析为(XElement | TextNode)对象。
 * ？？？？todo 解析为 className 对应的类。 ———— 好像不行，className 对应的类可能是后创建的。
 */
export class Parser {
  private currentFragment: (XElement | TextNode)[];
  private stack: (XElement | TextNode)[][];
  private errorCode: number;
  private readonly hasAttributes: boolean | undefined;
  private readonly lowerCaseName: boolean | undefined;

  constructor(param?: IParserParam) {
    this.currentFragment = [];
    this.stack = [];
    this.errorCode = XMLParserErrorCode.NoError;
    this.hasAttributes = param?.hasAttributes || true;
    this.lowerCaseName = param?.lowerCaseName || false;
  }

  resolveEntities(s: string): string {
    return s.replace(/&([^;]+);/g, (all, entity) => {
      if (entity.substring(0, 2) === '#x') {
        return String.fromCodePoint(parseInt(entity.substring(2), 16));
      } else if (entity.substring(0, 1) === '#') {
        return String.fromCodePoint(parseInt(entity.substring(1), 10));
      }
      switch (entity) {
        case 'lt':
          return '<';
        case 'gt':
          return '>';
        case 'amp':
          return '&';
        case 'quot':
          return '"';
        case 'apos':
          return "'";
      }
      return this.onResolveEntity(entity);
    });
  }

  /**
   * 解析字符串，----> (XElement | TextNode)
   * @param s
   * @param start
   */
  _parseContent(s: string, start: number): IContent | null {
    // console.log('_parseContent . ')
    const attributes: INodeAttr[] = [];
    let pos = start;

    function skipWs() {
      while (pos < s.length && isWhitespace(s, pos)) {
        ++pos;
      }
    }

    while (
      pos < s.length &&
      !isWhitespace(s, pos) &&
      s[pos] !== '>' &&
      s[pos] !== '/'
    ) {
      ++pos;
    }
    const name = s.substring(start, pos);
    skipWs();
    while (
      pos < s.length &&
      s[pos] !== '>' &&
      s[pos] !== '/' &&
      s[pos] !== '?'
    ) {
      skipWs();
      let attrName = '';
      let attrValue = '';
      while (pos < s.length && !isWhitespace(s, pos) && s[pos] !== '=') {
        attrName += s[pos];
        ++pos;
      }
      skipWs();
      if (s[pos] !== '=') {
        return null;
      }
      ++pos;
      skipWs();
      const attrEndChar = s[pos];
      // 限定了属性值必须以 ' or " 结尾 ， 不能注掉，会解析出错
      if (attrEndChar !== '"' && attrEndChar !== "'") {
        // console.log(`attrEndChar !== '"' && attrEndChar !== "'"`);
        return null;
      }
      const attrEndIndex = s.indexOf(attrEndChar, ++pos);
      if (attrEndIndex < 0) {
        return null;
      }
      attrValue = s.substring(pos, attrEndIndex);
      // todo 不同值的处理
      const value = this.resolveEntities(attrValue);
      // if (value === 'true' || value === 'false') {
      //   attributes.push({
      //     name: attrName,
      //     value: value === 'true',
      //   });
      // } else {
      attributes.push({
        name: attrName,
        value: value,
      });
      // }
      pos = attrEndIndex + 1;
      skipWs();
    }
    return {
      name,
      attributes,
      parsed: pos - start,
    };
  }

  _parseProcessingInstruction(s: string, start: number): IInstruction {
    let pos = start;

    function skipWs() {
      while (pos < s.length && isWhitespace(s, pos)) {
        ++pos;
      }
    }

    while (
      pos < s.length &&
      !isWhitespace(s, pos) &&
      s[pos] !== '>' &&
      s[pos] !== '?' &&
      s[pos] !== '/'
    ) {
      ++pos;
    }
    const name = s.substring(start, pos);
    skipWs();
    const attrStart = pos;
    while (pos < s.length && (s[pos] !== '?' || s[pos + 1] !== '>')) {
      ++pos;
    }
    const value = s.substring(attrStart, pos);
    return {
      name,
      value,
      parsed: pos - start,
    };
  }

  /**
   * 解析dom字符串
   * @param s
   */
  parseDom(s: string): void {
    // console.log('parseDom . ');
    // console.log('s is ', s);
    let i = 0;
    while (i < s.length) {
      const ch = s[i];
      let j = i;
      if (ch === '<') {
        ++j;
        const ch2 = s[j];
        let q;
        let pi;
        let content;
        let isClosed;
        switch (ch2) {
          case '/':
            ++j;
            q = s.indexOf('>', j);
            if (q < 0) {
              this.onError(XMLParserErrorCode.UnterminatedElement);
              return;
            }
            this.onEndElement(s.substring(j, q));
            j = q + 1;
            break;
          case '?':
            ++j;
            pi = this._parseProcessingInstruction(s, j);
            if (s.substring(j + pi.parsed, j + pi.parsed + 2) !== '?>') {
              this.onError(XMLParserErrorCode.UnterminatedXmlDeclaration);
              return;
            }
            this.onPi(pi.name, pi.value);
            j += pi.parsed + 2;
            break;
          case '!':
            if (s.substring(j + 1, j + 3) === '--') {
              q = s.indexOf('-->', j + 3);
              if (q < 0) {
                this.onError(XMLParserErrorCode.UnterminatedComment);
                return;
              }
              this.onComment(s.substring(j + 3, q));
              j = q + 3;
            } else if (s.substring(j + 1, j + 8) === '[CDATA[') {
              q = s.indexOf(']]>', j + 8);
              if (q < 0) {
                this.onError(XMLParserErrorCode.UnterminatedCdat);
                return;
              }
              this.onCdata(s.substring(j + 8, q));
              j = q + 3;
            } else if (s.substring(j + 1, j + 8) === 'DOCTYPE') {
              const q2 = s.indexOf('[', j + 8);
              let complexDoctype = false;
              q = s.indexOf('>', j + 8);
              if (q < 0) {
                this.onError(XMLParserErrorCode.UnterminatedDoctypeDeclaration);
                return;
              }
              if (q2 > 0 && q > q2) {
                q = s.indexOf(']>', j + 8);
                if (q < 0) {
                  this.onError(
                    XMLParserErrorCode.UnterminatedDoctypeDeclaration
                  );
                  return;
                }
                complexDoctype = true;
              }
              const doctypeContent = s.substring(
                j + 8,
                q + (complexDoctype ? 1 : 0)
              );
              this.onDoctype(doctypeContent);
              j = q + (complexDoctype ? 2 : 1);
            } else {
              this.onError(XMLParserErrorCode.MalformedElement);
              return;
            }
            break;
          default:
            content = this._parseContent(s, j);
            if (content === null) {
              this.onError(XMLParserErrorCode.MalformedElement);
              return;
            }
            isClosed = false;
            if (
              s.substring(j + content.parsed, j + content.parsed + 2) === '/>'
            ) {
              isClosed = true;
            } else if (
              s.substring(j + content.parsed, j + content.parsed + 1) !== '>'
            ) {
              this.onError(XMLParserErrorCode.UnterminatedElement);
              return;
            }
            this.onBeginElement(content.name, content.attributes, isClosed);
            j += content.parsed + (isClosed ? 2 : 1);
            break;
        }
      } else {
        while (j < s.length && s[j] !== '<') {
          j++;
        }
        const text = s.substring(i, j);
        this.onText(this.resolveEntities(text));
      }
      i = j;
    }
  }

  onResolveEntity(name: string): string {
    return `&${name};`;
  }

  onPi(name: string, value: string): void {
    console.log('onPi name is ' + name + ' value is ' + value);
  }

  onComment(text: string): void {
    console.log('onComment text is ', text);
  }

  onDoctype(doctypeContent: string): void {
    console.log('doctypeContent is ', doctypeContent);
  }

  /**
   * 在解析Ajax请求获取页面时，也可以用的
   * 将 dom字符串，解析为 虚拟dom
   * @param data
   */
  parseFromString(data: string): TextNode | XElement {
    console.log('parser parseFromString . ');
    console.log('data is ', data);
    this.currentFragment = [];
    this.stack = [];
    this.errorCode = XMLParserErrorCode.NoError;

    this.parseDom(data.trim());

    if (this.errorCode !== XMLParserErrorCode.NoError) {
      // return undefined; // return undefined on error
      throw Error('this.errorCode !== ' + XMLParserErrorCode.NoError);
    }
    // We should only have one root.
    const [documentElement] = this.currentFragment;
    if (!documentElement) {
      // return undefined; // Return undefined if no root was found.
      throw Error('documentElement is undefined . ');
    }
    return documentElement;
  }

  // 文本节点
  onText(text: string): void {
    if (isWhitespaceString(text)) {
      return;
    }
    const node = new TextNode(text);
    this.currentFragment.push(node);
  }

  onCdata(text: string): void {
    const node = new TextNode(text);
    this.currentFragment.push(node);
  }

  /**
   * 在开始的元素
   * @param name  nodeName
   * @param attributes
   * @param isEmpty
   */
  onBeginElement(
    name: string,
    attributes: INodeAttr[],
    isEmpty?: boolean
  ): void {
    if (this.lowerCaseName) {
      name = name.toLowerCase();
    }
    // todo 根据name创建各个定义的类，包括 (XElement | TextNode)
    // console.log('name is ', name);
    const node = new XElement({ nodeName: name });
    node.childNodes = [];
    if (this.hasAttributes) {
      node.attributes = attributes;
    }
    this.currentFragment.push(node);
    if (isEmpty) {
      return;
    }
    // 存入缓存
    this.stack.push(this.currentFragment);
    this.currentFragment = node.children as (XElement | TextNode)[];
  }

  /**
   * 在结束的元素
   * @param name 应该是nodeName
   */
  onEndElement(name?: string): (XElement | TextNode) | null {
    // console.log('onEndElement . name is ', name);
    // 取回缓存的节点
    this.currentFragment = this.stack?.pop() || [];
    const lastElement = this.currentFragment?.at(-1);
    // console.log('lastElement is ', lastElement);
    if (!lastElement) {
      return null;
    }
    // 对应的字节点
    for (const child of lastElement.children) {
      child.parent = lastElement as XElement;
    }
    // console.log('lastElement is ', lastElement);
    return lastElement;
  }

  onError(code: number): void {
    this.errorCode = code;
  }
}

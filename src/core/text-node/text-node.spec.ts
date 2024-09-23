import { XProxy } from '../../observer'; // 路径根据实际情况调整
import { IJsonData } from '../../interface';
import { Span } from '../../components/html-element/span/span.class';
import { TextNode } from './text-node.class';

describe('TextNode', () => {
  let textNode: TextNode;
  let proxy: XProxy<IJsonData>;
  let element: Span;

  beforeEach(() => {
    // 假设XProxy和element有正确的实现
    // proxy = new XProxy('testValue');
    element = new Span(); // 假设element可以这样实例化

    // 实例化TextNode
    textNode = new TextNode('test', element);
  });

  it('should be created with correct properties', () => {
    expect(textNode).toBeDefined();
    expect(textNode.className).toBe('TextNode');
    expect(textNode.nodeName).toBe('#text');
    expect(textNode.nodeValue).toBe('test');
    expect(textNode.dom).toBeUndefined();
    expect(textNode.rendered).toBe(false);
  });

  it('should correctly set nodeValue with proxy', () => {
    const proxyTextNode = new TextNode(proxy);
    expect(proxyTextNode.nodeValue).toBe('testValue');
  });

  it('should correctly append text', () => {
    textNode.appendText(' append');
    expect(textNode.nodeValue).toBe('test append');
  });

  it('should correctly slice text', () => {
    textNode.setText('test text');
    const slicedText = textNode.sliceText(0, 5);
    expect(slicedText).toBe('test ');
  });

  it('should correctly insert text', () => {
    textNode.setText('test text');
    textNode.insertText('new', 5, 10);
    expect(textNode.nodeValue).toBe('test new text');
  });

  it('should correctly delete text', () => {
    textNode.setText('test text');
    textNode.deleteText(5, 10);
    expect(textNode.nodeValue).toBe('test text');
  });

  it('should correctly mount', () => {
    const mockElement = document.createElement('div');
    textNode.mount(mockElement);
    expect(mockElement).toContain(textNode!.dom);
  });
});

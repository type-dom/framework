
import { Span } from '../../components/html-element/span/span.class';
import { TextNode } from './text-node.class';
import { signal, Signal } from '@type-dom/signals';
import { NodeName } from '../enums';

describe('TextNode', () => {
  let textNode: TextNode;
  const signal1 = signal('hello . ');
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
    expect(textNode.nodeName).toBe(NodeName.TEXT);
    expect(textNode.nodeValue).toBe('test');
    expect(textNode.dom).toBeUndefined();
    expect(textNode.rendered).toBe(false);
  });

  it('should correctly set nodeValue with proxy', () => {
    signal1.set('testValue');
    const signalTextNode = new TextNode(signal1);
    expect(signalTextNode.nodeValue).toBe('testValue');
  });

  it('should correctly append text', () => {
    textNode.appendText(' append');
    expect(textNode.nodeValue).toBe('tests append');
  });

  it('should correctly slice text', () => {
    textNode.setText('tests text');
    const slicedText = textNode.sliceText(0, 5);
    expect(slicedText).toBe('tests ');
  });

  it('should correctly insert text', () => {
    textNode.setText('tests text');
    textNode.insertText('new', 5, 10);
    expect(textNode.nodeValue).toBe('tests new text');
  });

  it('should correctly delete text', () => {
    textNode.setText('tests text');
    textNode.deleteText(5, 10);
    expect(textNode.nodeValue).toBe('tests text');
  });

  it('should correctly mount', () => {
    const mockElement = document.createElement('div');
    textNode.mount(mockElement);
    expect(mockElement).toContain(textNode!.dom);
  });
});

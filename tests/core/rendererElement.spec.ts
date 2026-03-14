// import {
//   type TestElement,
//   h,
//   serializeInner as inner,
//   nodeOps,
//   render,
// } from '@vue/runtime-test'

// import { render } from '../../src/core/renderer/render';
// import { RendererElement } from '../../src/core/renderer/renderer';
import {
  Div, render, Span
  // serializeInner as inner, // TestElement
} from '../../src';

describe('renderer: element', () => {
  let root: Element

  beforeEach(() => {
    root = document.createElement('div')
  })

  it('should create an element', () => {
    // render(h('div'), root)
    render(new Div(), root);
    // expect(inner(root)).toBe('<div></div>')
    expect(root.innerHTML).toBe('<div></div>');
  })

  it('should create an element with props', () => {
    // render(h('div', { id: 'foo', class: 'bar' }), root)
    render(new Div({ attrObj: { id: 'foo', class: 'bar' }}), root);
    // expect(inner(root)).toBe('<div id="foo" class="bar"></div>')
    expect(root.innerHTML).toBe('<div id="foo" class="bar"></div>');
  })

  it('should create an element with direct text children', () => {
    // render(h('div', ['foo', ' ', 'bar']), root)
    render(new Div({ slot: ['foo', ' ', 'bar']}), root);
    // expect(inner(root)).toBe('<div>foo bar</div>')
    expect(root.innerHTML).toBe('<div>foo bar</div>');
  })

  it('should create an element with direct text children and props', () => {
    // render(h('div', { id: 'foo' }, ['bar']), root)
    render(new Div({ attrObj: { id: 'foo' }, slot: ['bar']}), root);
    // expect(inner(root)).toBe('<div id="foo">bar</div>')
    expect(root.innerHTML).toBe('<div id="foo">bar</div>');
  })

  it('should update an element tag which is already mounted', () => {
    // render(h('div', ['foo']), root)
    render(new Div({ slot: ['foo']}), root);
    // expect(inner(root)).toBe('<div>foo</div>')
    expect(root.innerHTML).toBe('<div>foo</div>');

    // render(h('span', ['foo']), root)
    render(new Span({ slot: ['foo']}), root);
    // expect(inner(root)).toBe('<span>foo</span>')
    expect(root.innerHTML).toBe('<span>foo</span>');
  })

  it('should update element props which is already mounted', () => {
    // render(h('div', { id: 'bar' }, ['foo']), root)
    render(new Div({ attrObj: { id: 'bar' }, slot: ['foo']}), root);
    // expect(inner(root)).toBe('<div id="bar">foo</div>')
    expect(root.innerHTML).toBe('<div id="bar">foo</div>');

    // render(h('div', { id: 'baz', class: 'bar' }, ['foo']), root)
    render(new Div({ attrObj: { id: 'baz', class: 'bar' }, slot: ['foo']}), root);
    // expect(inner(root)).toBe('<div id="baz" class="bar">foo</div>')
    expect(root.innerHTML).toBe('<div id="baz" class="bar">foo</div>');
  })
})

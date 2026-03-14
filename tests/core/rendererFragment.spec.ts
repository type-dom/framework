// import {
//   Fragment,
//   NodeOpTypes,
//   type TestElement,
//   TestNodeTypes,
//   type VNode,
//   createBlock,
//   createCommentVNode,
//   createTextVNode,
//   createVNode,
//   dumpOps,
//   h,
//   nodeOps,
//   openBlock,
//   render,
//   resetOps,
//   serializeInner,
// } from '@vue/runtime-test'
// import { PatchFlags } from '@vue/shared'
// import { renderList } from '../src/helpers/renderList'

import {
  render,
  resetOps,
  // dumpOps,
  // TestNodeTypes,
  TypeFragment,
  TypeNode,
  Div,
  Fragment,
  // NodeOpTypes,
} from '../../src';

describe('renderer: fragment', () => {
  it('should allow returning multiple component root nodes', () => {
    // const App = {
    //   render() {
    //     return [h('div', 'one'), 'two']
    //   },
    // }
    class App extends TypeFragment {
      className = 'App';
      override setup() {
        this.addChildren(new Div({ slot: 'one' }), 'two');
      }
    }

    const root = document.createElement('div')
    // render(h(App), root)
    render(new App(), root);

    expect(root.innerHTML).toBe(`<div>one</div>two`)
    expect(root.childNodes.length).toBe(4)
    // expect(root.childNodes[0]).toMatchObject({
    //   type: TestNodeTypes.TEXT,
    //   text: '',
    // })
    expect(root.childNodes[0]).toBeInstanceOf(Text);
    expect(root.childNodes[0].nodeValue).toBe((''));
    // expect(root.childNodes[1]).toMatchObject({
    //   type: TestNodeTypes.ELEMENT,
    //   tag: 'div',
    // })
    expect(root.childNodes[1]).toBeInstanceOf(HTMLDivElement);
    // expect((root.childNodes[1]).childNodes[0]).toMatchObject({
    //   type: TestNodeTypes.TEXT,
    //   text: 'one',
    // })
    expect((root.childNodes[1]).childNodes[0]).toBeInstanceOf(Text)
    expect((root.childNodes[1]).childNodes[0].nodeValue).toBe('one');
    // expect(root.childNodes[2]).toMatchObject({
    //   type: TestNodeTypes.TEXT,
    //   text: 'two',
    // })
    expect(root.childNodes[2]).toBeInstanceOf(Text);
    expect(root.childNodes[2].nodeValue).toBe('two');
    // expect(root.childNodes[3]).toMatchObject({
    //   type: TestNodeTypes.TEXT,
    //   text: '',
    // })
    expect(root.childNodes[3]).toBeInstanceOf(Text);
    expect(root.childNodes[3].nodeValue).toBe('');
  })

  it('explicitly create fragments', () => {
    const root = document.createElement('div')
    // render(h('div', [h(Fragment, [h('div', 'one'), 'two'])]), root)
    render(new Div({ slot: [ new Fragment({ slot: [new Div({ slot: 'one'}), 'two']})]}), root)
    const parent = root.childNodes[0] as HTMLElement;
    expect(parent.innerHTML).toBe(`<div>one</div>two`)
  })

  it('patch fragment childNodes (manual, keyed)', () => {
    const root = document.createElement('div')
    // render(
    //   h(Fragment, [h('div', { key: 1 }, 'one'), h('div', { key: 2 }, 'two')]),
    //   root,
    // )
    render(new Fragment({
      slot: [
        new Div({ key: 1 , slot: 'one'}),
        new Div({ key: 2 , slot: 'two'})
      ] }), root);
    expect(root.innerHTML).toBe(`<div>one</div><div>two</div>`)

    resetOps()
    // render(
    //   h(Fragment, [h('div', { key: 2 }, 'two'), h('div', { key: 1 }, 'one')]),
    //   root,
    // )
    render(new Fragment({
      slot: [
        new Div({ key: 2 , slot: 'two'}),
        new Div({ key: 1 , slot: 'one'})
      ]
    }), root);
    expect(root.innerHTML).toBe(`<div>two</div><div>one</div>`)
    // const ops = dumpOps()
    // // should be moving nodes instead of re-creating or patching them
    // expect(ops).toMatchObject([
    //   {
    //     type: NodeOpTypes.INSERT,
    //   },
    // ])
  })

  it('patch fragment childNodes (manual, unkeyed)', () => {
    const root = document.createElement('div')
    // render(h(Fragment, [h('div', 'one'), h('div', 'two')]), root)
    render(new Fragment({
      slot: [
        new Div({ slot: 'one'}),
        new Div({ slot: 'two'})
      ]
    }), root);
    expect(root.innerHTML).toBe(`<div>one</div><div>two</div>`)

    resetOps()
    // render(h(Fragment, [h('div', 'two'), h('div', 'one')]), root)
    render(new Fragment({
      slot: [
        new Div({ slot: 'two'}),
        new Div({ slot: 'one'})
      ]
    }), root)
    expect(root.innerHTML).toBe(`<div>two</div><div>one</div>`)
    // const ops = dumpOps()
    // // should be patching nodes instead of moving or re-creating them
    // expect(ops).toMatchObject([
    //   {
    //     type: NodeOpTypes.SET_ELEMENT_TEXT,
    //   },
    //   {
    //     type: NodeOpTypes.SET_ELEMENT_TEXT,
    //   },
    // ])
  })

  it('patch fragment childNodes (compiler generated, unkeyed)', () => {
    const root = document.createElement('div')
    // render(
    //   createVNode(
    //     Fragment,
    //     null,
    //     [
    //       createVNode('div', null, 'one', PatchFlags.TEXT),
    //       createTextVNode('two'),
    //     ],
    //     PatchFlags.UNKEYED_FRAGMENT,
    //   ),
    //   root,
    // )
    render(new Fragment({
      slot: [
        new Div({ slot: 'one'}),
        'two',
      ]
    }), root)
    expect(root.innerHTML).toBe(`<div>one</div>two`)

    // render(
    //   createVNode(
    //     Fragment,
    //     null,
    //     [
    //       createVNode('div', null, 'foo', PatchFlags.TEXT),
    //       createTextVNode('bar'),
    //       createTextVNode('baz'),
    //     ],
    //     PatchFlags.UNKEYED_FRAGMENT,
    //   ),
    //   root,
    // )
    render(new Fragment({
      slot: [
        new Div({ slot: 'foo'}),
        'bar',
        'baz',
      ]
    }), root);
    expect(root.innerHTML).toBe(`<div>foo</div>barbaz`)

    // render(
    //   createVNode(
    //     Fragment,
    //     null,
    //     [
    //       createTextVNode('baz'),
    //       createVNode('div', null, 'foo', PatchFlags.TEXT),
    //     ],
    //     PatchFlags.UNKEYED_FRAGMENT,
    //   ),
    //   root,
    // )
    render(new Fragment({
      slot: [
        'baz',
        new Div({ slot: 'foo'}),
      ]
    }), root);
    expect(root.innerHTML).toBe(`baz<div>foo</div>`)
  })

  it('patch fragment childNodes (compiler generated, keyed)', () => {
    const root = document.createElement('div')

    // render(
    //   createVNode(
    //     Fragment,
    //     null,
    //     [h('div', { key: 1 }, 'one'), h('div', { key: 2 }, 'two')],
    //     PatchFlags.KEYED_FRAGMENT,
    //   ),
    //   root,
    // )
    render(new Fragment({
      slot: [
        new Div({ key: 1 , slot: 'one'}),
        new Div({ key: 2 , slot: 'two'})
      ]
    }), root);
    expect(root.innerHTML).toBe(`<div>one</div><div>two</div>`)

    resetOps()
    // render(
    //   createVNode(
    //     Fragment,
    //     null,
    //     [h('div', { key: 2 }, 'two'), h('div', { key: 1 }, 'one')],
    //     PatchFlags.KEYED_FRAGMENT,
    //   ),
    //   root,
    // )
    render(new Fragment({
      slot: [
        new Div({ key: 2 , slot: 'two'}),
        new Div({ key: 1 , slot: 'one'})
      ]
    }), root);
    expect(root.innerHTML).toBe(`<div>two</div><div>one</div>`)
    // const ops = dumpOps()
    // // should be moving nodes instead of re-creating or patching them
    // expect(ops).toMatchObject([
    //   {
    //     type: NodeOpTypes.INSERT,
    //   },
    // ])
  })

  it('move fragment', () => {
    const root = document.createElement('div')
    // render(
    //   h('div', [
    //     h('div', { key: 1 }, 'outer'),
    //     h(Fragment, { key: 2 }, [
    //       h('div', { key: 1 }, 'one'),
    //       h('div', { key: 2 }, 'two'),
    //     ]),
    //   ]),
    //   root,
    // )
    render(new Div({
      slot: [
        new Div({ key: 1 , slot: 'outer'}),
        new Fragment({
          key: 2,
          slot: [
            new Div({ key: 1 , slot: 'one'}),
            new Div({ key: 2 , slot: 'two'})
          ]
        })
      ]
    }), root);
    expect(root.innerHTML).toBe(
      `<div><div>outer</div><div>one</div><div>two</div></div>`,
    )

    resetOps()
    // render(
    //   h('div', [
    //     h(Fragment, { key: 2 }, [
    //       h('div', { key: 2 }, 'two'),
    //       h('div', { key: 1 }, 'one'),
    //     ]),
    //     h('div', { key: 1 }, 'outer'),
    //   ]),
    //   root,
    // )
    render(new Div({
      slot: [
        new Fragment({
          key: 2,
          slot: [
            new Div({ key: 2 , slot: 'two'}),
            new Div({ key: 1 , slot: 'one'})
          ]
        }),
        new Div({ key: 1 , slot: 'outer'})
      ]
    }), root);
    expect(root.innerHTML).toBe(
      `<div><div>two</div><div>one</div><div>outer</div></div>`,
    )
    // const ops = dumpOps()
    // // should be moving nodes instead of re-creating them
    // expect(ops).toMatchObject([
    //   // 1. re-order inside the fragment
    //   { type: NodeOpTypes.INSERT, targetNode: { type: 'element' } },
    //   // 2. move entire fragment, including anchors
    //   // not the most efficient move, but this case is super rare
    //   // and optimizing for this special case complicates the algo quite a bit
    //   { type: NodeOpTypes.INSERT, targetNode: { type: 'text', text: '' } },
    //   { type: NodeOpTypes.INSERT, targetNode: { type: 'element' } },
    //   { type: NodeOpTypes.INSERT, targetNode: { type: 'element' } },
    //   { type: NodeOpTypes.INSERT, targetNode: { type: 'text', text: '' } },
    // ])
  })

  it('handle nested fragments', () => {
    const root = document.createElement('div')

    // render(
    //   h(Fragment, [
    //     h('div', { key: 1 }, 'outer'),
    //     h(Fragment, { key: 2 }, [
    //       h('div', { key: 1 }, 'one'),
    //       h('div', { key: 2 }, 'two'),
    //     ]),
    //   ]),
    //   root,
    // )
    render(new Fragment({
      slot: [
        new Div({ key: 1 , slot: 'outer'}),
        new Fragment({
          key: 2,
          slot: [
            new Div({ key: 1 , slot: 'one'}),
            new Div({ key: 2 , slot: 'two'})
          ]
        })
      ]
    }), root);
    expect(root.innerHTML).toBe(
      `<div>outer</div><div>one</div><div>two</div>`,
    )

    resetOps()
    // render(
    //   h(Fragment, [
    //     h(Fragment, { key: 2 }, [
    //       h('div', { key: 2 }, 'two'),
    //       h('div', { key: 1 }, 'one'),
    //     ]),
    //     h('div', { key: 1 }, 'outer'),
    //   ]),
    //   root,
    // )
    render(new Fragment({
      slot: [
        new Fragment({
          key: 2,
          slot: [
            new Div({ key: 2 , slot: 'two'}),
            new Div({ key: 1 , slot: 'one'})
          ]
        }),
        new Div({ key: 1 , slot: 'outer'})
      ]
    }), root)
    expect(root.innerHTML).toBe(
      `<div>two</div><div>one</div><div>outer</div>`,
    )
    // const ops = dumpOps()
    // // should be moving nodes instead of re-creating them
    // expect(ops).toMatchObject([
    //   { type: NodeOpTypes.INSERT, targetNode: { type: 'element' } },
    //   { type: NodeOpTypes.INSERT, targetNode: { type: 'text', text: '' } },
    //   { type: NodeOpTypes.INSERT, targetNode: { type: 'element' } },
    //   { type: NodeOpTypes.INSERT, targetNode: { type: 'element' } },
    //   { type: NodeOpTypes.INSERT, targetNode: { type: 'text', text: '' } },
    // ])

    // should properly remove nested fragments
    render(null, root)
    expect(root.innerHTML).toBe(``)
  })

  // // #2080
  // test('`template` keyed fragment w/ comment + hoisted node', () => {
  //   const root = document.createElement('div')
  //   const hoisted = h('span')
  //
  //   const renderFn = (items: string[]) => {
  //     return (
  //       openBlock(true),
  //       createBlock(
  //         Fragment,
  //         null,
  //         renderList(items, item => {
  //           return (
  //             openBlock(),
  //             createBlock(
  //               Fragment,
  //               { key: item },
  //               [
  //                 createCommentVNode('comment'),
  //                 hoisted,
  //                 createVNode('div', null, item, PatchFlags.TEXT),
  //               ],
  //               PatchFlags.STABLE_FRAGMENT,
  //             )
  //           )
  //         }),
  //         PatchFlags.KEYED_FRAGMENT,
  //       )
  //     )
  //   }
  //
  //   render(renderFn(['one', 'two']), root)
  //   expect(serializeInner(root)).toBe(
  //     `<!--comment--><span></span><div>one</div><!--comment--><span></span><div>two</div>`,
  //   )
  //
  //   render(renderFn(['two', 'one']), root)
  //   expect(serializeInner(root)).toBe(
  //     `<!--comment--><span></span><div>two</div><!--comment--><span></span><div>one</div>`,
  //   )
  // })

  // #10547
  test('`template` fragment w/ render function', () => {
    // const renderFn = (vnode: VNode) => {
    //   return (
    //     openBlock(),
    //     createBlock(
    //       Fragment,
    //       null,
    //       [createTextVNode('text'), (openBlock(), createBlock(vnode))],
    //       PatchFlags.STABLE_FRAGMENT,
    //     )
    //   )
    // }
    const renderFn = (vnode: TypeNode) => {
      return new Fragment({
        slot: [
          'text',
          vnode
        ]
      })
    }

    const root = document.createElement('div')
    // const foo = h('div', ['foo'])
    const foo = new Div({ slot: 'foo' });
    // const bar = h('div', [h('div', 'bar')])
    const bar = new Div({ slot: new Div({ slot: 'bar' }) });

    render(renderFn(foo), root)
    expect(root.innerHTML).toBe(`text<div>foo</div>`)

    render(renderFn(bar), root)
    expect(root.innerHTML).toBe(`text<div><div>bar</div></div>`)

    render(renderFn(foo), root)
    expect(root.innerHTML).toBe(`text<div>foo</div>`)
  })

  // // #10547
  // test('`template` fragment w/ render function + keyed vnode', () => {
  //   const renderFn = (vnode: VNode) => {
  //     return (
  //       openBlock(),
  //       createBlock(
  //         Fragment,
  //         null,
  //         [createTextVNode('text'), (openBlock(), createBlock(vnode))],
  //         PatchFlags.STABLE_FRAGMENT,
  //       )
  //     )
  //   }
  //
  //   const root = document.createElement('div')
  //   const foo = h('div', { key: 1 }, [h('div', 'foo')])
  //   const bar = h('div', { key: 2 }, [h('div', 'bar'), h('div', 'bar')])
  //
  //   render(renderFn(foo), root)
  //   expect(serializeInner(root)).toBe(`text<div><div>foo</div></div>`)
  //
  //   render(renderFn(bar), root)
  //   expect(serializeInner(root)).toBe(
  //     `text<div><div>bar</div><div>bar</div></div>`,
  //   )
  //
  //   render(renderFn(foo), root)
  //   expect(serializeInner(root)).toBe(`text<div><div>foo</div></div>`)
  // })

  // // #6852
  // test('`template` keyed fragment w/ text', () => {
  //   const root = document.createElement('div')
  //
  //   const renderFn = (items: string[]) => {
  //     return (
  //       openBlock(true),
  //       createBlock(
  //         Fragment,
  //         null,
  //         renderList(items, item => {
  //           return (
  //             openBlock(),
  //             createBlock(
  //               Fragment,
  //               { key: item },
  //               [
  //                 createTextVNode('text'),
  //                 createVNode('div', null, item, PatchFlags.TEXT),
  //               ],
  //               PatchFlags.STABLE_FRAGMENT,
  //             )
  //           )
  //         }),
  //         PatchFlags.KEYED_FRAGMENT,
  //       )
  //     )
  //   }
  //
  //   render(renderFn(['one', 'two']), root)
  //   expect(serializeInner(root)).toBe(`text<div>one</div>text<div>two</div>`)
  //
  //   render(renderFn(['two', 'one']), root)
  //   expect(serializeInner(root)).toBe(`text<div>two</div>text<div>one</div>`)
  // })

  // #10007
  test('empty fragment', () => {
    const root = document.createElement('div')

    /*const renderFn = () => {
      return (openBlock(true), createBlock(Fragment, null))
    }*/
    const renderFn = () => new Fragment();

    render(renderFn(), root)
    expect(root.innerHTML).toBe('')
  })
})

// // reference: https://github.com/vuejs/vue/blob/dev/test/unit/modules/vdom/patch/children.spec.js
// import {
//   type TestElement,
//   TestNodeTypes,
//   h,
//   nodeOps,
//   render,
//   serialize,
//   serializeInner,
// } from '@vue/runtime-test'
import { B, Div, P, render, Span } from '../../src';

function toSpan(content: any) {
  if (typeof content === 'string') {
    // return h('span', content.toString())
    return new Span({ slot: content.toString() })
  } else {
    // return h('span', { key: content }, content.toString())
    return new Span({ key: content, slot: content.toString(), })
  }
}

const inner = (c: Element) => c.innerHTML

function shuffle(array: Array<any>) {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  // while there remain elements to shuffle...
  while (currentIndex !== 0) {
    // pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    // and swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

test('should patch previously empty children', () => {
  const root = document.createElement('div')

  // render(h('div', []), root)
  render(new Div(), root);
  expect(inner(root)).toBe('<div></div>')

  // render(h('div', ['hello']), root)
  render(new Div({ slot: 'hello' }), root);
  expect(inner(root)).toBe('<div>hello</div>')
})

test('should patch previously null children', () => {
  const root = document.createElement('div')

  // render(h('div'), root)
  render(new Div(), root);
  expect(inner(root)).toBe('<div></div>')

  // render(h('div', ['hello']), root)
  render(new Div({ slot: 'hello' }), root);
  expect(inner(root)).toBe('<div>hello</div>')
})

test('array children -> text children', () => {
  const root = document.createElement('div')
  // render(h('div', [h('div')]), root)
  render(new Div({
    slot: new Div()
  }), root)
  expect(inner(root)).toBe('<div><div></div></div>')

  // render(h('div', 'hello'), root)
  render(new Div({ slot: 'hello' }), root);
  expect(inner(root)).toBe('<div>hello</div>')
})

// test('plain object child', () => {
//   const root = document.createElement('div')
//   const foo = { foo: '1' }
//   // @ts-expect-error
//   render(h('div', null, [foo]), root)
//   expect('Invalid VNode type').not.toHaveBeenWarned()
//   expect(inner(root)).toBe('<div>[object Object]</div>')
// })

describe('renderer: keyed children', () => {
  let root: Element
  let elm: Element
  const renderChildren = (arr: (number | string)[]) => {
    // render(h('div', arr.map(toSpan)), root)
    render(new Div({ slot: arr.map(toSpan) }), root);
    return root.childNodes[0] as HTMLElement
  }

  beforeEach(() => {
    root = document.createElement('div');
    // render(h('div', { id: 1 }, 'hello'), root)
    render(new Div({ attrObj: { id: 1 }, slot: 'hello' }), root);
  })

  test('append', () => {
    elm = renderChildren([1])
    expect(elm.childNodes.length).toBe(1)

    elm = renderChildren([1, 2, 3])
    expect(elm.childNodes.length).toBe(3)
    expect((elm.childNodes[1] as Element).innerHTML).toBe('2') // should be <span>2</span>
    expect((elm.childNodes[2] as Element).innerHTML).toBe('3')
  })

//   test('prepend', () => {
//     elm = renderChildren([4, 5])
//     expect(elm.children.length).toBe(2)
//
//     elm = renderChildren([1, 2, 3, 4, 5])
//     expect(elm.children.length).toBe(5)
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       '1',
//       '2',
//       '3',
//       '4',
//       '5',
//     ])
//   })
//
//   test('insert in middle', () => {
//     elm = renderChildren([1, 2, 4, 5])
//     expect(elm.children.length).toBe(4)
//
//     elm = renderChildren([1, 2, 3, 4, 5])
//     expect(elm.children.length).toBe(5)
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       '1',
//       '2',
//       '3',
//       '4',
//       '5',
//     ])
//   })
//
//   test('insert at beginning and end', () => {
//     elm = renderChildren([2, 3, 4])
//     expect(elm.children.length).toBe(3)
//
//     elm = renderChildren([1, 2, 3, 4, 5])
//     expect(elm.children.length).toBe(5)
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       '1',
//       '2',
//       '3',
//       '4',
//       '5',
//     ])
//   })
//
//   test('insert to empty parent', () => {
//     elm = renderChildren([])
//     expect(elm.children.length).toBe(0)
//
//     elm = renderChildren([1, 2, 3, 4, 5])
//     expect(elm.children.length).toBe(5)
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       '1',
//       '2',
//       '3',
//       '4',
//       '5',
//     ])
//   })
//
//   test('remove all children from parent', () => {
//     elm = renderChildren([1, 2, 3, 4, 5])
//     expect(elm.children.length).toBe(5)
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       '1',
//       '2',
//       '3',
//       '4',
//       '5',
//     ])
//
//     render(h('div'), root)
//     expect(elm.children.length).toBe(0)
//   })
//
//   test('remove from beginning', () => {
//     elm = renderChildren([1, 2, 3, 4, 5])
//     expect(elm.children.length).toBe(5)
//
//     elm = renderChildren([3, 4, 5])
//     expect(elm.children.length).toBe(3)
//     expect((elm.children as TestElement[]).map(inner)).toEqual(['3', '4', '5'])
//   })
//
//   test('remove from end', () => {
//     elm = renderChildren([1, 2, 3, 4, 5])
//     expect(elm.children.length).toBe(5)
//
//     elm = renderChildren([1, 2, 3])
//     expect(elm.children.length).toBe(3)
//     expect((elm.children as TestElement[]).map(inner)).toEqual(['1', '2', '3'])
//   })
//
//   test('remove from middle', () => {
//     elm = renderChildren([1, 2, 3, 4, 5])
//     expect(elm.children.length).toBe(5)
//
//     elm = renderChildren([1, 2, 4, 5])
//     expect(elm.children.length).toBe(4)
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       '1',
//       '2',
//       '4',
//       '5',
//     ])
//   })
//
//   test('moving single child forward', () => {
//     elm = renderChildren([1, 2, 3, 4])
//     expect(elm.children.length).toBe(4)
//
//     elm = renderChildren([2, 3, 1, 4])
//     expect(elm.children.length).toBe(4)
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       '2',
//       '3',
//       '1',
//       '4',
//     ])
//   })
//
//   test('moving single child backwards', () => {
//     elm = renderChildren([1, 2, 3, 4])
//     expect(elm.children.length).toBe(4)
//
//     elm = renderChildren([1, 4, 2, 3])
//     expect(elm.children.length).toBe(4)
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       '1',
//       '4',
//       '2',
//       '3',
//     ])
//   })
//
//   test('moving single child to end', () => {
//     elm = renderChildren([1, 2, 3])
//     expect(elm.children.length).toBe(3)
//
//     elm = renderChildren([2, 3, 1])
//     expect(elm.children.length).toBe(3)
//     expect((elm.children as TestElement[]).map(inner)).toEqual(['2', '3', '1'])
//   })
//
//   test('swap first and last', () => {
//     elm = renderChildren([1, 2, 3, 4])
//     expect(elm.children.length).toBe(4)
//
//     elm = renderChildren([4, 2, 3, 1])
//     expect(elm.children.length).toBe(4)
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       '4',
//       '2',
//       '3',
//       '1',
//     ])
//   })
//
//   test('move to left & replace', () => {
//     elm = renderChildren([1, 2, 3, 4, 5])
//     expect(elm.children.length).toBe(5)
//
//     elm = renderChildren([4, 1, 2, 3, 6])
//     expect(elm.children.length).toBe(5)
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       '4',
//       '1',
//       '2',
//       '3',
//       '6',
//     ])
//   })
//
//   test('move to left and leaves hold', () => {
//     elm = renderChildren([1, 4, 5])
//     expect(elm.children.length).toBe(3)
//
//     elm = renderChildren([4, 6])
//     expect((elm.children as TestElement[]).map(inner)).toEqual(['4', '6'])
//   })
//
//   test('moved and set to undefined element ending at the end', () => {
//     elm = renderChildren([2, 4, 5])
//     expect(elm.children.length).toBe(3)
//
//     elm = renderChildren([4, 5, 3])
//     expect(elm.children.length).toBe(3)
//     expect((elm.children as TestElement[]).map(inner)).toEqual(['4', '5', '3'])
//   })
//
//   test('reverse element', () => {
//     elm = renderChildren([1, 2, 3, 4, 5, 6, 7, 8])
//     expect(elm.children.length).toBe(8)
//
//     elm = renderChildren([8, 7, 6, 5, 4, 3, 2, 1])
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       '8',
//       '7',
//       '6',
//       '5',
//       '4',
//       '3',
//       '2',
//       '1',
//     ])
//   })
//
//   test('something', () => {
//     elm = renderChildren([0, 1, 2, 3, 4, 5])
//     expect(elm.children.length).toBe(6)
//
//     elm = renderChildren([4, 3, 2, 1, 5, 0])
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       '4',
//       '3',
//       '2',
//       '1',
//       '5',
//       '0',
//     ])
//   })

  test('random shuffle', () => {
    const elms = 14
    const samples = 5
    const arr = [...Array(elms).keys()]
    const opacities: string[] = []

    function spanNumWithOpacity(n: number, o: string) {
      // return h('span', { key: n, style: { opacity: o } }, n.toString())
      return new Span({  key: n, styleObj: { opacity: o }, slot: n.toString() });
    }

    for (let n = 0; n < samples; ++n) {
      // render(
      //   h(
      //     'span',
      //     arr.map(n => spanNumWithOpacity(n, '1')),
      //   ),
      //   root,
      // )
      render(new Span({ slot: arr.map(n => spanNumWithOpacity(n, '1')) }), root);
      elm = root.childNodes[0] as HTMLElement;

      for (let i = 0; i < elms; ++i) {
        expect(elm.childNodes[i].textContent).toBe(i.toString());
        opacities[i] = Math.random().toFixed(5).toString();
      }

      const shufArr = shuffle(arr.slice(0))
      // render(
      //   h(
      //     'span',
      //     arr.map(n => spanNumWithOpacity(shufArr[n], opacities[n])),
      //   ),
      //   root,
      // )
      render(new Span({ slot: arr.map(n => spanNumWithOpacity(shufArr[n], opacities[n])) }), root);
      elm = root.childNodes[0] as HTMLElement
      for (let i = 0; i < elms; ++i) {
        expect((elm.childNodes[i] as Element).innerHTML).toBe(
          shufArr[i].toString(),
        )
        // expect(elm.childNodes[i]).toMatchObject({
        //   props: {
        //     style: {
        //       opacity: opacities[i],
        //     },
        //   },
        // })
        expect(Number((elm.childNodes[i] as HTMLElement).style.opacity).toFixed(5)).toBe(opacities[i].trim());
      }
    }
  })

//   test('children with the same key but with different tag', () => {
//     render(
//       h('div', [
//         h('div', { key: 1 }, 'one'),
//         h('div', { key: 2 }, 'two'),
//         h('div', { key: 3 }, 'three'),
//         h('div', { key: 4 }, 'four'),
//       ]),
//       root,
//     )
//     elm = root.children[0] as TestElement
//     expect((elm.children as TestElement[]).map(c => c.tag)).toEqual([
//       'div',
//       'div',
//       'div',
//       'div',
//     ])
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       'one',
//       'two',
//       'three',
//       'four',
//     ])
//
//     render(
//       h('div', [
//         h('div', { key: 4 }, 'four'),
//         h('span', { key: 3 }, 'three'),
//         h('span', { key: 2 }, 'two'),
//         h('div', { key: 1 }, 'one'),
//       ]),
//       root,
//     )
//     expect((elm.children as TestElement[]).map(c => c.tag)).toEqual([
//       'div',
//       'span',
//       'span',
//       'div',
//     ])
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       'four',
//       'three',
//       'two',
//       'one',
//     ])
//   })

  test('children with the same tag, same key, but one with data and one without data', () => {
    // render(h('div', [h('div', { class: 'hi' }, 'one')]), root)
    render(new Div({ slot: new Div({ class: 'hi', slot: 'one' }) }), root);
    elm = root.childNodes[0] as Element;
    // expect(elm.children[0]).toMatchObject({
    //   props: {
    //     class: 'hi',
    //   },
    // })
    expect(elm.children[0].getAttribute('class')).toBe('hi');

    // render(h('div', [h('div', 'four')]), root)
    render(new Div({ slot: new Div({ slot:'four' })}), root);
    elm = root.childNodes[0] as Element;
    // expect(elm.children[0] as TestElement).toMatchObject({
    //   props: {
    //     // in the DOM renderer this will be ''
    //     // but the test renderer simply sets whatever value it receives.
    //     class: null,
    //   },
    // })
    expect((elm.childNodes[0] as Element).outerHTML).toBe(`<div>four</div>`)
  })

//   test('should warn with duplicate keys', () => {
//     renderChildren([1, 2, 3, 4, 5])
//     renderChildren([1, 6, 6, 3, 5])
//     expect(`Duplicate keys`).toHaveBeenWarned()
//   })
})

describe('renderer: unkeyed children', () => {
  let root: Element
  let elm: Element
  const renderChildren = (arr: Array<number | string>) => {
    // render(h('div', arr.map(toSpan)), root)
    render(new Div({ slot: arr.map(toSpan) }), root)
    return root.children[0] as Element
  }

  beforeEach(() => {
    root = document.createElement('div')
    // render(h('div', { id: 1 }, 'hello'), root)
    render(new Div({ attrObj: { id: 1 }, slot: 'hello' }), root)
  })

//   test('move a key in non-keyed nodes with a size up', () => {
//     elm = renderChildren([1, 'a', 'b', 'c'])
//     expect(elm.children.length).toBe(4)
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       '1',
//       'a',
//       'b',
//       'c',
//     ])
//
//     elm = renderChildren(['d', 'a', 'b', 'c', 1, 'e'])
//     expect(elm.children.length).toBe(6)
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       'd',
//       'a',
//       'b',
//       'c',
//       '1',
//       'e',
//     ])
//   })

  test('append elements with updating children without keys', () => {
    elm = renderChildren(['hello'])
    expect((Array.from(elm.childNodes) as Element[]).map(inner)).toEqual(['hello'])

    elm = renderChildren(['hello', 'world'])
    expect((Array.from(elm.childNodes) as Element[]).map(inner)).toEqual([
      'hello',
      'world',
    ])
  })

//   test('unmoved text nodes with updating children without keys', () => {
//     render(h('div', ['text', h('span', ['hello'])]), root)
//
//     elm = root.children[0] as TestElement
//     expect(elm.children[0]).toMatchObject({
//       type: TestNodeTypes.TEXT,
//       text: 'text',
//     })
//
//     render(h('div', ['text', h('span', ['hello'])]), root)
//
//     elm = root.children[0] as TestElement
//     expect(elm.children[0]).toMatchObject({
//       type: TestNodeTypes.TEXT,
//       text: 'text',
//     })
//   })
//
//   test('changing text children with updating children without keys', () => {
//     render(h('div', ['text', h('span', ['hello'])]), root)
//
//     elm = root.children[0] as TestElement
//     expect(elm.children[0]).toMatchObject({
//       type: TestNodeTypes.TEXT,
//       text: 'text',
//     })
//
//     render(h('div', ['text2', h('span', ['hello'])]), root)
//
//     elm = root.children[0] as TestElement
//     expect(elm.children[0]).toMatchObject({
//       type: TestNodeTypes.TEXT,
//       text: 'text2',
//     })
//   })
//
//   test('prepend element with updating children without keys', () => {
//     render(h('div', [h('span', ['world'])]), root)
//     elm = root.children[0] as TestElement
//     expect((elm.children as TestElement[]).map(inner)).toEqual(['world'])
//
//     render(h('div', [h('span', ['hello']), h('span', ['world'])]), root)
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       'hello',
//       'world',
//     ])
//   })
//
//   test('prepend element of different tag type with updating children without keys', () => {
//     render(h('div', [h('span', ['world'])]), root)
//     elm = root.children[0] as TestElement
//     expect((elm.children as TestElement[]).map(inner)).toEqual(['world'])
//
//     render(h('div', [h('div', ['hello']), h('span', ['world'])]), root)
//     expect((elm.children as TestElement[]).map(c => c.tag)).toEqual([
//       'div',
//       'span',
//     ])
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       'hello',
//       'world',
//     ])
//   })
//
//   test('remove elements with updating children without keys', () => {
//     render(
//       h('div', [h('span', ['one']), h('span', ['two']), h('span', ['three'])]),
//       root,
//     )
//     elm = root.children[0] as TestElement
//     expect((elm.children as TestElement[]).map(inner)).toEqual([
//       'one',
//       'two',
//       'three',
//     ])
//
//     render(h('div', [h('span', ['one']), h('span', ['three'])]), root)
//     elm = root.children[0] as TestElement
//     expect((elm.children as TestElement[]).map(inner)).toEqual(['one', 'three'])
//   })
//
//   test('remove a single text node with updating children without keys', () => {
//     render(h('div', ['one']), root)
//     elm = root.children[0] as TestElement
//     expect(serializeInner(elm)).toBe('one')
//
//     render(h('div'), root)
//     expect(serializeInner(elm)).toBe('')
//   })
//
//   test('remove a single text node when children are updated', () => {
//     render(h('div', ['one']), root)
//     elm = root.children[0] as TestElement
//     expect(serializeInner(elm)).toBe('one')
//
//     render(h('div', [h('div', ['two']), h('span', ['three'])]), root)
//     elm = root.children[0] as TestElement
//     expect((elm.children as TestElement[]).map(inner)).toEqual(['two', 'three'])
//   })
//
//   test('remove a text node among other elements', () => {
//     render(h('div', ['one', h('span', ['two'])]), root)
//     elm = root.children[0] as TestElement
//     expect((elm.children as TestElement[]).map(c => serialize(c))).toEqual([
//       'one',
//       '<span>two</span>',
//     ])
//
//     render(h('div', [h('div', ['three'])]), root)
//     elm = root.children[0] as TestElement
//     expect(elm.children.length).toBe(1)
//     expect(serialize(elm.children[0])).toBe('<div>three</div>')
//   })
//
  test('reorder elements', () => {
    // render(
    //   h('div', [h('span', ['one']), h('div', ['two']), h('b', ['three'])]),
    //   root,
    // )
    render(new Div({ slot: [ new Span({ slot: 'one' }), new Div({ slot: 'two' }), new B({ slot: 'three' }) ]}), root);
    elm = root.children[0] as Element
    expect((Array.from(elm.childNodes) as Element[]).map(inner)).toEqual([
      'one',
      'two',
      'three',
    ])

    // render(
    //   h('div', [h('b', ['three']), h('div', ['two']), h('span', ['one'])]),
    //   root,
    // )
    render(new Div({ slot: [ new B({ slot: 'three' }), new Div({ slot: 'two' }), new Span({ slot: 'one' }) ] }), root);
    elm = root.children[0] as Element
    expect((Array.from(elm.childNodes) as Element[]).map(inner)).toEqual([
      'three',
      'two',
      'one',
    ])
  })

  // #6502
  test('should not de-opt when both head and tail change', () => {
    // render(h('div', [null, h('div'), null]), root)
    render(new Div({ slot: [ null, new Div(), null ]}), root);
    elm = root.children[0] as Element;
    // const original = elm.childNodes[1]

    // render(h('div', [h('p'), h('div'), h('p')]), root)
    render(new Div({ slot: [new P(), new Div(), new P()] }), root);
    elm = root.children[0] as Element
    // const postPatch = elm.childNodes[1]

    // expect(postPatch).toBe(original) // todo 现在的render是直接清理childNodes, 没有 diff 逻辑；
  })
})

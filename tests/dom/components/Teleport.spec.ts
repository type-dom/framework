/**
 * @vitest-environment jsdom
 */
// import {
//   Teleport,
//   Text,
//   createApp,
//   defineComponent,
//   markRaw,
//   nextTick,
//   nodeOps,
//   onMounted,
//   h as originalH,
//   ref,
//   render,
//   serialize,
//   serializeInner,
//   useModel,
//   withDirectives,
// } from '@vue/runtime-test'
// import {
//   Fragment,
//   createBlock,
//   createCommentVNode,
//   createTextVNode,
//   createVNode,
//   openBlock,
// } from '../../src/vnode'
// import { toDisplayString } from '@vue/shared'
// import { compile, createApp as createDOMApp, render as domRender } from 'vue'
// import { Teleport } from '../../../src';
// import { nextTick } from '../../../src/core/scheduler';
// import type { HMRRuntime } from '../../src/hmr'

// declare var __VUE_HMR_RUNTIME__: HMRRuntime
// const { rerender, createRecord } = __VUE_HMR_RUNTIME__

import { Signal, signal } from '@type-dom/signals';
import {
  Div,
  Fragment,
  Teleport,
  TypeDiv,
  DivProps,
  TypeFragment,
  FragmentProps,
  transformSlot,
  nextTick,
  onMounted,
  CommentNode,
  Span,
} from '../../../src';
// import { nodeOps } from '../../../src/dom/nodeOps';

describe('renderer: teleport', () => {
  // describe('eager mode', () => {
  //   runSharedTests(false)
  // })

  describe('defer mode', () => {
      runSharedTests(true)

    //   const h = originalH

    test('should be able to target content appearing later than the teleport with defer', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      // createDOMApp({
      //   render() {
      //     return [
      //       h(Teleport, { to: '#target', defer: true }, h('div', 'teleported')),
      //       h('div', { id: 'target' }),
      //     ]
      //   },
      // }).mount(root);
      new Fragment({
        isRoot: true,
        slot: [
          new Teleport({
            to: '#target',
            slot: [new Div({ slot: 'teleported' })],
            // defer: true,
          }),
          new Div({ attrObj: { id: 'target' } }),
        ],
      }).mount(root);

      expect(root.innerHTML).toMatchInlineSnapshot(
        `"<!--[Fragment--><!--teleport start--><!--teleport end--><div id="target"><!--target start--><div>teleported</div><!--target anchor--></div><!--Fragment]-->"`
      );
    });

    //   test('defer mode should work inside suspense', async () => {
    //     const root = document.createElement('div')
    //     document.body.appendChild(root)
    //
    //     let p: Promise<any>
    //
    //     const Comp = defineComponent({
    //       template: `
    //       <suspense>
    //         <div>
    //           <async />
    //           <teleport defer to="#target-suspense">
    //             <div>teleported</div>
    //           </teleport>
    //           <div id="target-suspense" />
    //         </div>
    //       </suspense>`,
    //       components: {
    //         async: {
    //           setup() {
    //             p = Promise.resolve(() => 'async')
    //             return p
    //           },
    //         },
    //       },
    //     })
    //
    //     domRender(h(Comp), root)
    //     expect(root.innerHTML).toBe(`<!---->`)
    //
    //     await p!.then(() => Promise.resolve())
    //     await nextTick()
    //     expect(root.innerHTML).toBe(
    //       `<div>` +
    //         `async` +
    //         `<!--teleport start--><!--teleport end-->` +
    //         `<div id="target-suspense"><div>teleported</div></div>` +
    //         `</div>`,
    //     )
    //   })

    test('update before mounted with defer', async () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const show = signal(false);
      const foo = signal('foo');
      // const Header = {
      //   props: { foo: String },
      //   setup(props: any) {
      //     return () => h('div', props.foo)
      //   },
      // }
      type HeaderProps = { foo: Signal<string> } & DivProps;
      class Header extends TypeDiv<HeaderProps> {
        className = 'Header';
        constructor(params: HeaderProps) {
          super();
          this.addChild(params.foo);
        }
      }
      // const Footer = {
      //   setup() {
      //     foo.value = 'bar'
      //     return () => h('div', 'Footer')
      //   },
      // }
      class Footer extends TypeDiv {
        className = 'Footer';
        override setup() {
          foo.set('bar');
          this.addChild('Footer');
        }
      }
      // createDOMApp({
      //   render() {
      //     return show.value
      //       ? [
      //           h(
      //             Teleport,
      //             { to: '#targetId', defer: true },
      //             h(Header, { foo: foo.value }),
      //           ),
      //           h(Footer),
      //           h('div', { id: 'targetId' }),
      //         ]
      //       : [h('div')]
      //   },
      // }).mount(root)
      new Fragment({
        slot: () => {
          if (show.get()) {
            return [
              new Teleport({
                to: '#targetId',
                // defer: true,
                slot: [new Header({ foo: foo })],
              }),
              new Footer(),
              new Div({ attrObj: { id: 'targetId' } }),
            ];
          } else {
            return new Div();
          }
        },
      }).mount(root);

      expect(root.innerHTML).toMatchInlineSnapshot(
        `"<!--[Fragment--><div></div><!--Fragment]-->"`
      );

      show.set(true);
      await nextTick();
      expect(root.innerHTML).toMatchInlineSnapshot(
        `"<!--[Fragment--><!--teleport start--><!--teleport end--><div>Footer</div><div id="targetId"><!--target start--><div>bar</div><!--target anchor--></div><!--Fragment]-->"`
      );
    });

    // #13349
    test('handle deferred teleport updates before and after mount', async () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const show = signal(false);
      const data2 = signal('2');
      const data3 = signal('3');

      // const Comp = {
      //   props: {
      //     modelValue: {},
      //     modelModifiers: {},
      //   },
      //   emits: ['update:modelValue'],
      //   setup(props: any) {
      //     const data2 = useModel(props, 'modelValue')
      //     data2.value = '2+'
      //     return () => h('span')
      //   },
      // }
      class Comp extends TypeFragment {
        className = 'Comp';
        override setup() {
          data2.set('2+');
          this.addChild(
            new Span({
              vModel: data2,
            })
          );
        }
      }

      // createDOMApp({
      //   setup() {
      //     setTimeout(() => (show.value = true), 5)
      //     setTimeout(() => (data3.value = '3+'), 10)
      //   },
      //   render() {
      //     return h(Fragment, null, [
      //       h('span', { id: 'targetId001' }),
      //       show.value
      //         ? h(Fragment, null, [
      //             h(Teleport, { to: '#targetId001', defer: true }, [
      //               createTextVNode(String(data3.value)),
      //             ]),
      //             h(Comp, {
      //               modelValue: data2.value,
      //               'onUpdate:modelValue': (event: any) =>
      //                 (data2.value = event),
      //             }),
      //           ])
      //         : createCommentVNode('v-if'),
      //     ])
      //   },
      // }).mount(root)
      new Fragment({
        slot: [
          new Span({
            attrObj: {
              id: 'targetId001',
            },
          }),
          new Fragment({
            slot: () => {
              if (show.get()) {
                return new Fragment({
                  slot: [
                    new Teleport({
                      to: '#targetId001',
                      // defer: true,
                      slot: data3,
                    }),
                    new Comp({
                      vModel: data2,
                      'onUpdate:modelValue': (event: any) => data2.set(event),
                    }),
                  ],
                });
              } else {
                return new CommentNode('v-if');
              }
            },
          }),
        ],
      }).mount(root);
      setTimeout(() => show.set(true), 5);
      setTimeout(() => data3.set('3+'), 10);
      expect(root.innerHTML).toMatchInlineSnapshot(
        `"<!--[Fragment--><span id="targetId001"></span><!--[Fragment--><!--v-if--><!--Fragment]--><!--Fragment]-->"`
      );

      await new Promise((r) => setTimeout(r, 10));
      // expect(root.innerHTML).toMatchInlineSnapshot(
      //   `"<span id="targetId001">3+</span><!--teleport start--><!--teleport end--><span></span>"`,
      // );
      // todo error 没有清理。
      expect(root.innerHTML).toMatchInlineSnapshot(
        `"<!--[Fragment--><span id="targetId001"><!--target start-->3+<!--target anchor--></span><!--[Fragment--><!--[Fragment--><!--teleport start--><!--teleport end--><!--[Comp--><!--Comp]--><!--Fragment]--><!--[Fragment--><!--teleport start--><!--teleport end--><!--[Comp--><span></span><!--Comp]--><!--Fragment]--><!--Fragment]--><!--Fragment]-->"`
      );
    });
  });

  function runSharedTests(deferMode: boolean) {
    //   const h = (deferMode
    //     ? (type: any, props: any, ...args: any[]) => {
    //         if (type === Teleport) {
    //           props.defer = true
    //         }
    //         return originalH(type, props, ...args)
    //       }
    //     : originalH) as unknown as typeof originalH
    //
    //   test('should work', () => {
    //     const target = nodeOps.createElement('div')
    //     const root = nodeOps.createElement('div')
    //
    //     render(
    //       h(() => [
    //         h(Teleport, { to: target }, h('div', 'teleported')),
    //         h('div', 'root'),
    //       ]),
    //       root,
    //     )
    //
    //     expect(serializeInner(root)).toBe(
    //       `<!--teleport start--><!--teleport end--><div>root</div>`,
    //     )
    //     expect(serializeInner(target)).toBe(`<div>teleported</div>`)
    //   })
    //
    //   test('should work with SVG', async () => {
    //     const root = document.createElement('div')
    //     const svg = signal()
    //     const circle = signal()
    //
    //     const Comp = defineComponent({
    //       setup() {
    //         return {
    //           svg,
    //           circle,
    //         }
    //       },
    //       template: `
    //       <svg ref="svg"></svg>
    //       <teleport :to="svg" v-if="svg">
    //       <circle ref="circle"></circle>
    //       </teleport>`,
    //     })
    //
    //     domRender(h(Comp), root)
    //
    //     await nextTick()
    //
    //     expect(root.innerHTML).toBe(
    //       `<svg><circle></circle></svg><!--teleport start--><!--teleport end-->`,
    //     )
    //
    //     expect(svg.value.namespaceURI).toBe('http://www.w3.org/2000/svg')
    //     expect(circle.value.namespaceURI).toBe('http://www.w3.org/2000/svg')
    //   })
    //
    //   test('should update target', async () => {
    //     const targetA = nodeOps.createElement('div')
    //     const targetB = nodeOps.createElement('div')
    //     const target = signal(targetA)
    //     const root = nodeOps.createElement('div')
    //
    //     render(
    //       h(() => [
    //         h(Teleport, { to: target.value }, h('div', 'teleported')),
    //         h('div', 'root'),
    //       ]),
    //       root,
    //     )
    //
    //     expect(serializeInner(root)).toBe(
    //       `<!--teleport start--><!--teleport end--><div>root</div>`,
    //     )
    //     expect(serializeInner(targetA)).toBe(`<div>teleported</div>`)
    //     expect(serializeInner(targetB)).toBe(``)
    //
    //     target.value = targetB
    //     await nextTick()
    //
    //     expect(serializeInner(root)).toBe(
    //       `<!--teleport start--><!--teleport end--><div>root</div>`,
    //     )
    //     expect(serializeInner(targetA)).toBe(``)
    //     expect(serializeInner(targetB)).toBe(`<div>teleported</div>`)
    //   })
    //
    //   test('should update children', async () => {
    //     const target = nodeOps.createElement('div')
    //     const root = nodeOps.createElement('div')
    //     const children = signal([h('div', 'teleported')])
    //
    //     render(
    //       h(() => h(Teleport, { to: target }, children.value)),
    //       root,
    //     )
    //     expect(serializeInner(target)).toBe(`<div>teleported</div>`)
    //
    //     children.value = []
    //     await nextTick()
    //
    //     expect(serializeInner(target)).toBe(``)
    //
    //     children.value = [createVNode(Text, null, 'teleported')]
    //     await nextTick()
    //
    //     expect(serializeInner(target)).toBe(`teleported`)
    //   })
    //
    //   test('should traverse comment node after updating in optimize mode', async () => {
    //     const target = nodeOps.createElement('div')
    //     const root = nodeOps.createElement('div')
    //     const count = signal(0)
    //     let teleport
    //
    //     __DEV__ = false
    //     render(
    //       h(() => {
    //         teleport =
    //           (openBlock(),
    //           createBlock(Teleport, { to: target }, [
    //             createCommentVNode('comment in teleport'),
    //           ]))
    //         return h('div', null, [
    //           createTextVNode(toDisplayString(count.value)),
    //           teleport,
    //         ])
    //       }),
    //       root,
    //     )
    //     const commentNode = teleport!.children[0].el
    //     expect(serializeInner(root)).toBe(`<div>0</div>`)
    //     expect(serializeInner(target)).toBe(`<!--comment in teleport-->`)
    //     expect(serialize(commentNode)).toBe(`<!--comment in teleport-->`)
    //
    //     count.value = 1
    //     await nextTick()
    //     __DEV__ = true
    //     expect(serializeInner(root)).toBe(`<div>1</div>`)
    //     expect(teleport!.children[0].el).toBe(commentNode)
    //   })
    //
    //   test('should remove children when unmounted', () => {
    //     const target = nodeOps.createElement('div')
    //     const root = nodeOps.createElement('div')
    //
    //     function testUnmount(props: any) {
    //       render(
    //         h(() => [
    //           h(Teleport, props, h('div', 'teleported')),
    //           h('div', 'root'),
    //         ]),
    //         root,
    //       )
    //       expect(serializeInner(target)).toBe(
    //         props.disabled ? `` : `<div>teleported</div>`,
    //       )
    //
    //       render(null, root)
    //       expect(serializeInner(target)).toBe('')
    //       expect(target.children.length).toBe(0)
    //     }
    //
    //     testUnmount({ to: target, disabled: false })
    //     testUnmount({ to: target, disabled: true })
    //     testUnmount({ to: null, disabled: true })
    //   })
    //
    //   // #10747
    //   test('should unmount correctly when using top level comment in teleport', async () => {
    //     const target = nodeOps.createElement('div')
    //     const root = nodeOps.createElement('div')
    //     const count = signal(0)
    //
    //     __DEV__ = false
    //     render(
    //       h(() => {
    //         return h('div', null, [
    //           createTextVNode(toDisplayString(count.value)),
    //           (openBlock(),
    //           createBlock(Teleport, { to: target }, [
    //             createCommentVNode('comment in teleport'),
    //           ])),
    //         ])
    //       }),
    //       root,
    //     )
    //
    //     count.value = 1
    //
    //     await nextTick()
    //     __DEV__ = true
    //     render(null, root)
    //     expect(root.children.length).toBe(0)
    //   })
    //
    //   test('component with multi roots should be removed when unmounted', () => {
    //     const target = nodeOps.createElement('div')
    //     const root = nodeOps.createElement('div')
    //
    //     const Comp = {
    //       render() {
    //         return [h('p'), h('p')]
    //       },
    //     }
    //
    //     render(
    //       h(() => [h(Teleport, { to: target }, h(Comp)), h('div', 'root')]),
    //       root,
    //     )
    //     expect(serializeInner(target)).toBe(`<p></p><p></p>`)
    //
    //     render(null, root)
    //     expect(serializeInner(target)).toBe('')
    //   })
    //
    //   // #6347
    //   test('descendent component should be unmounted when teleport is disabled and unmounted', () => {
    //     const root = nodeOps.createElement('div')
    //
    //     const CompWithHook = {
    //       render() {
    //         return [h('p'), h('p')]
    //       },
    //       beforeUnmount: vi.fn(),
    //       unmounted: vi.fn(),
    //     }
    //
    //     render(
    //       h(() => [h(Teleport, { to: null, disabled: true }, h(CompWithHook))]),
    //       root,
    //     )
    //     expect(CompWithHook.beforeUnmount).toBeCalledTimes(0)
    //     expect(CompWithHook.unmounted).toBeCalledTimes(0)
    //
    //     render(null, root)
    //
    //     expect(CompWithHook.beforeUnmount).toBeCalledTimes(1)
    //     expect(CompWithHook.unmounted).toBeCalledTimes(1)
    //   })
    //
    //   test('multiple teleport with same target', () => {
    //     const target = nodeOps.createElement('div')
    //     const root = nodeOps.createElement('div')
    //
    //     render(
    //       h('div', [
    //         h(Teleport, { to: target }, h('div', 'one')),
    //         h(Teleport, { to: target }, 'two'),
    //       ]),
    //       root,
    //     )
    //
    //     expect(serializeInner(root)).toBe(
    //       `<div><!--teleport start--><!--teleport end--><!--teleport start--><!--teleport end--></div>`,
    //     )
    //     expect(serializeInner(target)).toBe(`<div>one</div>two`)
    //
    //     // update existing content
    //     render(
    //       h('div', [
    //         h(Teleport, { to: target }, [h('div', 'one'), h('div', 'two')]),
    //         h(Teleport, { to: target }, 'three'),
    //       ]),
    //       root,
    //     )
    //     expect(serializeInner(target)).toBe(`<div>one</div><div>two</div>three`)
    //
    //     // toggling
    //     render(h('div', [null, h(Teleport, { to: target }, 'three')]), root)
    //     expect(serializeInner(root)).toBe(
    //       `<div><!----><!--teleport start--><!--teleport end--></div>`,
    //     )
    //     expect(serializeInner(target)).toBe(`three`)
    //
    //     // toggle back
    //     render(
    //       h('div', [
    //         h(Teleport, { to: target }, [h('div', 'one'), h('div', 'two')]),
    //         h(Teleport, { to: target }, 'three'),
    //       ]),
    //       root,
    //     )
    //     expect(serializeInner(root)).toBe(
    //       `<div><!--teleport start--><!--teleport end--><!--teleport start--><!--teleport end--></div>`,
    //     )
    //     // should append
    //     expect(serializeInner(target)).toBe(`three<div>one</div><div>two</div>`)
    //
    //     // toggle the other teleport
    //     render(
    //       h('div', [
    //         h(Teleport, { to: target }, [h('div', 'one'), h('div', 'two')]),
    //         null,
    //       ]),
    //       root,
    //     )
    //     expect(serializeInner(root)).toBe(
    //       `<div><!--teleport start--><!--teleport end--><!----></div>`,
    //     )
    //     expect(serializeInner(target)).toBe(`<div>one</div><div>two</div>`)
    //   })
    //
    //   test('should work when using template ref as target', async () => {
    //     const root = nodeOps.createElement('div')
    //     const target = signal(null)
    //     const disabled = signal(true)
    //
    //     const App = {
    //       setup() {
    //         return () =>
    //           h(Fragment, [
    //             h('div', { ref: target }),
    //             h(
    //               Teleport,
    //               { to: target.value, disabled: disabled.value },
    //               h('div', 'teleported'),
    //             ),
    //           ])
    //       },
    //     }
    //     render(h(App), root)
    //     expect(serializeInner(root)).toBe(
    //       `<div></div><!--teleport start--><div>teleported</div><!--teleport end-->`,
    //     )
    //
    //     disabled.value = false
    //     await nextTick()
    //     expect(serializeInner(root)).toBe(
    //       `<div><div>teleported</div></div><!--teleport start--><!--teleport end-->`,
    //     )
    //   })

      test('disabled', () => {
        // const target = nodeOps.createElement('div')
        // const root = nodeOps.createElement('div')
        const target = new Div().dom;
        const root = new Div().dom;

        // const renderWithDisabled = (disabled: boolean) => {
        //   return h(Fragment, [
        //     h(Teleport, { to: target, disabled }, h('div', 'teleported')),
        //     h('div', 'root'),
        //   ])
        // }
        const renderWithDisabled = (disabled: boolean) => {
          return new Fragment({
            slot: [
              new Teleport({
                to: target,
                disabled,
                slot: new Div({
                    slot: 'teleported'
                  })
              }),
              new Div({
                slot: 'root'
              })
            ]
          })
        }

        // render(renderWithDisabled(false), root)
        // transformSlot(root, renderWithDisabled(false));
        renderWithDisabled(false).mount(root);
        expect(root.innerHTML).toBe(
          `<!--teleport start--><!--teleport end--><div>root</div>`,
        )
        expect(target.innerHTML).toBe(`<div>teleported</div>`)

        // render(renderWithDisabled(true), root)
        // transformSlot(root, renderWithDisabled(true) );
        renderWithDisabled(true).mount(root);
        expect(root.innerHTML).toBe(
          `<!--teleport start--><div>teleported</div><!--teleport end--><div>root</div>`,
        )
        expect(target.innerHTML).toBe(``)

        // toggle back
        // render(renderWithDisabled(false), root)
        // transformSlot(renderWithDisabled(false), root);
        renderWithDisabled(false).mount(root);
        expect(root.innerHTML).toBe(
          `<!--teleport start--><!--teleport end--><div>root</div>`,
        )
        expect(target.innerHTML).toBe(`<div>teleported</div>`)
      })
    //
    //   test('moving teleport while enabled', () => {
    //     const target = nodeOps.createElement('div')
    //     const root = nodeOps.createElement('div')
    //
    //     render(
    //       h(Fragment, [
    //         h(Teleport, { to: target }, h('div', 'teleported')),
    //         h('div', 'root'),
    //       ]),
    //       root,
    //     )
    //     expect(serializeInner(root)).toBe(
    //       `<!--teleport start--><!--teleport end--><div>root</div>`,
    //     )
    //     expect(serializeInner(target)).toBe(`<div>teleported</div>`)
    //
    //     render(
    //       h(Fragment, [
    //         h('div', 'root'),
    //         h(Teleport, { to: target }, h('div', 'teleported')),
    //       ]),
    //       root,
    //     )
    //     expect(serializeInner(root)).toBe(
    //       `<div>root</div><!--teleport start--><!--teleport end-->`,
    //     )
    //     expect(serializeInner(target)).toBe(`<div>teleported</div>`)
    //
    //     render(
    //       h(Fragment, [
    //         h(Teleport, { to: target }, h('div', 'teleported')),
    //         h('div', 'root'),
    //       ]),
    //       root,
    //     )
    //     expect(serializeInner(root)).toBe(
    //       `<!--teleport start--><!--teleport end--><div>root</div>`,
    //     )
    //     expect(serializeInner(target)).toBe(`<div>teleported</div>`)
    //   })
    //
    //   test('moving teleport while disabled', () => {
    //     const target = nodeOps.createElement('div')
    //     const root = nodeOps.createElement('div')
    //
    //     render(
    //       h(Fragment, [
    //         h(Teleport, { to: target, disabled: true }, h('div', 'teleported')),
    //         h('div', 'root'),
    //       ]),
    //       root,
    //     )
    //     expect(serializeInner(root)).toBe(
    //       `<!--teleport start--><div>teleported</div><!--teleport end--><div>root</div>`,
    //     )
    //     expect(serializeInner(target)).toBe('')
    //
    //     render(
    //       h(Fragment, [
    //         h('div', 'root'),
    //         h(Teleport, { to: target, disabled: true }, h('div', 'teleported')),
    //       ]),
    //       root,
    //     )
    //     expect(serializeInner(root)).toBe(
    //       `<div>root</div><!--teleport start--><div>teleported</div><!--teleport end-->`,
    //     )
    //     expect(serializeInner(target)).toBe('')
    //
    //     render(
    //       h(Fragment, [
    //         h(Teleport, { to: target, disabled: true }, h('div', 'teleported')),
    //         h('div', 'root'),
    //       ]),
    //       root,
    //     )
    //     expect(serializeInner(root)).toBe(
    //       `<!--teleport start--><div>teleported</div><!--teleport end--><div>root</div>`,
    //     )
    //     expect(serializeInner(target)).toBe('')
    //   })
    //
    //   test('should work with block tree', async () => {
    //     const target = nodeOps.createElement('div')
    //     const root = nodeOps.createElement('div')
    //     const disabled = signal(false)
    //
    //     const App = {
    //       setup() {
    //         return {
    //           target: markRaw(target),
    //           disabled,
    //         }
    //       },
    //       render: compile(`
    //       <teleport :to="target" :disabled="disabled">
    //         <div>teleported</div><span>{{ disabled }}</span><span v-if="disabled"/>
    //       </teleport>
    //       <div>root</div>
    //       `),
    //     }
    //     render(h(App), root)
    //     expect(serializeInner(root)).toBe(
    //       `<!--teleport start--><!--teleport end--><div>root</div>`,
    //     )
    //     expect(serializeInner(target)).toBe(
    //       `<div>teleported</div><span>false</span><!--v-if-->`,
    //     )
    //
    //     disabled.value = true
    //     await nextTick()
    //     expect(serializeInner(root)).toBe(
    //       `<!--teleport start--><div>teleported</div><span>true</span><span></span><!--teleport end--><div>root</div>`,
    //     )
    //     expect(serializeInner(target)).toBe(``)
    //
    //     // toggle back
    //     disabled.value = false
    //     await nextTick()
    //     expect(serializeInner(root)).toBe(
    //       `<!--teleport start--><!--teleport end--><div>root</div>`,
    //     )
    //     expect(serializeInner(target)).toBe(
    //       `<div>teleported</div><span>false</span><!--v-if-->`,
    //     )
    //   })
    //
      // #3497
      test(`the dir hooks of the Teleport's children should be called correctly`, async () => {
        // const target = nodeOps.createElement('div')
        // const root = nodeOps.createElement('div')
        const target = document.createElement('div');
        const root = document.createElement('div');
        const toggle = signal(true)
        const dir = {
          mounted: vi.fn(),
          unmounted: vi.fn(),
        }

        // const app = createApp({
        //   setup() {
        //     return () => {
        //       return toggle.value
        //         ? h(Teleport, { to: target }, [
        //             withDirectives(h('div', ['foo']), [[dir]]),
        //           ])
        //         : null
        //     }
        //   },
        // })
        const app = new Fragment({
          slot: () => {
                  return toggle.get()
                    ? new Teleport({
                        to: target,
                        slot: new Div({
                          slot: 'foo',
                        })
                      })
                    : null
          }
        })
        app.mount(root)

        expect(root.innerHTML).toBe(
          `<!--teleport start--><!--teleport end-->`,
        )
        expect(target.innerHTML).toBe(`<div>foo</div>`)
        await nextTick()
        expect(dir.mounted).toHaveBeenCalledTimes(1)
        expect(dir.unmounted).toHaveBeenCalledTimes(0)

        toggle.set(false)
        await nextTick()
        expect(root.innerHTML).toBe(`<!---->`)
        expect(target.innerHTML).toBe(``)
        // expect(dir.mounted).toHaveBeenCalledTimes(1)
        // expect(dir.unmounted).toHaveBeenCalledTimes(1)
      })

    // #7835
    test(`ensure that target changes when disabled are updated correctly when enabled`, async () => {
      // const root = nodeOps.createElement('div')
      // const target1 = nodeOps.createElement('div')
      // const target2 = nodeOps.createElement('div')
      // const target3 = nodeOps.createElement('div')
      const root = new Div();
      const target1 = new Div(); // 如果没有mounted， dom不会被创建；
      const target2 = new Div();
      const target3 = new Div();
      // const target1 = document.createElement('div');
      // const target2 = document.createElement('div');
      // const target3 = document.createElement('div');
      const target = signal(target1);
      const disabled = signal(true);

      // const App = {
      //   setup() {
      //     return () =>
      //       h(Fragment, [
      //         h(
      //           Teleport,
      //           { to: target.value, disabled: disabled.value },
      //           h('div', 'teleported'),
      //         ),
      //       ])
      //   },
      // }
      const app = new Fragment({
        slot: new Teleport({
          to: target,
          disabled,
          slot: new Div({
            slot: 'teleported',
          }),
        }),
      });
      // render(h(App), root)
      root.addChild(app);
      root.mount(document.body);

      disabled.set(false);
      await nextTick();
      // expect(serializeInner(target1)).toBe(`<div>teleported</div>`)
      expect(target1.dom.innerHTML).toBe(
        `<!--target start--><div>teleported</div><!--target anchor-->`
      );
      // expect(serializeInner(target2)).toBe(``)
      expect(target2.dom.innerHTML).toBe(``);
      // expect(serializeInner(target3)).toBe(``)
      expect(target3.dom.innerHTML).toBe(``);

      disabled.set(true);
      await nextTick();
      target.set(target2);
      await nextTick();
      // expect(serializeInner(target1)).toBe(``)
      expect(target1.dom.innerHTML).toBe(``);
      // expect(serializeInner(target2)).toBe(``)
      expect(target2.dom.innerHTML).toBe(``);
      // expect(serializeInner(target3)).toBe(``)
      expect(target3.dom.innerHTML).toBe(``);

      target.set(target3);
      await nextTick();
      // expect(serializeInner(target1)).toBe(``)
      expect(target1.dom.innerHTML).toBe(``);
      // expect(serializeInner(target2)).toBe(``)
      expect(target2.dom.innerHTML).toBe(``);
      // expect(serializeInner(target3)).toBe(``)
      expect(target3.dom.innerHTML).toBe(``);

      disabled.set(false);
      await nextTick();
      // expect(serializeInner(target1)).toBe(``)
      expect(target1.dom.innerHTML).toBe(``);
      // expect(serializeInner(target2)).toBe(``)
      expect(target2.dom.innerHTML).toBe(``);
      // expect(serializeInner(target3)).toBe(`<div>teleported</div>`)
      expect(target3.dom.innerHTML).toBe(
        `<!--target start--><div>teleported</div><!--target anchor-->`
      );
    });

    //#9071
    test('toggle sibling node inside target node', async () => {
      const root = document.createElement('div');
      const show = signal(false);
      // const App = defineComponent({
      //   setup() {
      //     return () => {
      //       return show.value
      //         ? h(Teleport, { to: root }, [h('div', 'teleported')])
      //         : h('div', 'foo')
      //     }
      //   },
      // })
      class App extends TypeFragment {
        className = 'App';
        override setup() {
          transformSlot(this, () => {
            return show.get()
              ? new Teleport({
                  to: root,
                  slot: new Div({ slot: 'teleported' }),
                })
              : new Div({ slot: 'foo' });
          });
        }
      }

      // domRender(h(App), root)
      new App().mount(root);
      expect(root.innerHTML).toBe('<!--[App--><div>foo</div><!--App]-->');

      show.set(true);
      await nextTick();

      expect(root.innerHTML).toBe(
        '<!--[App--><!--teleport start--><!--teleport end--><!--App]--><!--target start--><div>teleported</div><!--target anchor-->'
      );

      show.set(false);
      await nextTick();

      expect(root.innerHTML).toBe(
        '<!--[App--><!--teleport start--><!--teleport end--><div>foo</div><!--App]-->'
      );
    });

    test('unmount previous sibling node inside target node', async () => {
      const root = document.createElement('div');
      const parentShow = signal(false);
      const childShow = signal(true);

      // const Comp = {
      //   setup() {
      //     return () => h(Teleport, { to: root }, [h('div', 'foo')])
      //   },
      // }
      const comp = new Teleport({
        to: root,
        slot: new Div({
          slot: 'foo',
        }),
      });

      // const App = defineComponent({
      //   setup() {
      //     return () => {
      //       return parentShow.value
      //         ? h(Fragment, { key: 0 }, [
      //             childShow.value ? h(Comp) : createCommentVNode('v-if'),
      //           ])
      //         : createCommentVNode('v-if')
      //     }
      //   },
      // })
      class App extends TypeFragment {
        className = 'App';
        override setup() {
          transformSlot(this, () => {
            return parentShow.get()
              ? new Fragment({
                  slot: [childShow.get() ? comp : new CommentNode('v-if')],
                })
              : new CommentNode('v-if');
          });
        }
      }

      // domRender(h(App), root)
      new App().mount(root);
      expect(root.innerHTML).toBe('<!--[App--><!--v-if--><!--App]-->');

      parentShow.set(true);
      await nextTick();
      expect(root.innerHTML).toBe(
        '<!--[App--><!--[Fragment--><!--teleport start--><!--teleport end--><!--Fragment]--><!--App]--><!--target start--><div>foo</div><!--target anchor-->'
      );

      parentShow.set(false);
      await nextTick();
      expect(root.innerHTML).toBe(
        '<!--[App--><!--[Fragment--><!--teleport start--><!--teleport end--><!--Fragment]--><!--v-if--><!--v-if--><!--App]-->'
      );
    });

    test('accessing template refs inside teleport', async () => {
      // const target = nodeOps.createElement('div')
      const target = new Div();
      const tRef = signal<Div>();
      let tRefInMounted;

      // render(
      //   h({
      //     render: () => [
      //       h(Teleport, { to: target }, h('div', { ref: tRef }, 'teleported')),
      //       h('div', 'root'),
      //     ],
      //     mounted() {
      //       tRefInMounted = tRef.value
      //     },
      //   }),
      //   nodeOps.createElement('div'),
      // );
      const div = new Div({
        slot: [
          new Teleport({
            to: target,
            slot: new Div({
              refEl: tRef,
              slot: 'teleported',
            }),
          }),
          new Div({
            slot: 'root',
          }),
        ],
      });
      onMounted(() => {
        tRefInMounted = tRef.get().dom;
      }, div);
      div.mount(document.body);

      // children[0] is the start anchor
      expect(tRefInMounted).toBe(target.dom.childNodes[1]);
    });
  }

  test('handle update and hmr rerender', async () => {
    const target = document.createElement('div')
    const root = document.createElement('div')

    // const Comp = {
    //   setup() {
    //     const cls = signal('foo')
    //     onMounted(() => {
    //       // trigger update
    //       cls.value = 'bar'
    //     })
    //     return { cls, target }
    //   },
    //   template: `
    //     <Teleport :to="target">
    //       <div :class="cls">
    //         <div>
    //           <slot></slot>
    //         </div>
    //       </div>
    //     </Teleport>
    //   `,
    // }
    class Comp extends TypeFragment {
      className = 'Comp';
      constructor(params: FragmentProps = {}) {
        super(params);
      }
      override setup() {
        const cls = signal('foo')
        onMounted(() => {
          // trigger update
          cls.set('bar')
        })
        this.addChild(new Teleport({
          to: target,
          slot: new Div({
            class: cls,
            slot: new Div({
              slot: this.props.slot,
            })
          })
        }))
      }
    }

    // const appId = 'test-app-id'
    // const App = {
    //   __hmrId: appId,
    //   components: { Comp },
    //   render() {
    //     return originalH(Comp, null, { default: () => originalH('div', 'foo') })
    //   },
    // }
    // createRecord(appId, App)
    class App extends TypeFragment {
      className = 'App';
      constructor(params: FragmentProps = {}) {
        super(params);
        this.className = 'App';
      }
      override setup() {
        this.addChild(new Comp({
          slot: new Div({
            slot: 'foo'
          })
        }))
      }
    }
    new App().mount(root);
    // domRender(originalH(App), root)

    // expect(target.innerHTML).toBe(
    //   '<div class="foo"><div><div>foo</div></div></div>',
    // )
    // await nextTick()
    expect(target.innerHTML).toBe(
      '<!--target start--><div class="bar"><div><div>foo</div></div></div><!--target anchor-->',
    )

    // rerender(appId, () =>
    //   originalH(Comp, null, { default: () => originalH('div', 'bar') }),
    // )
    // await nextTick()
    // expect(target.innerHTML).toBe(
    //   '<div class="bar"><div><div>bar</div></div></div>',
    // )
  })
})

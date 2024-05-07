// import { observe } from './index';
import { Watcher } from './watcher';
import { XObservable } from './x-observable.class';
import { observe } from './observe';

// interface IData extends IJsonData {
//   nested: {
//     prop: string;
//   };
// }

// describe('framework', () => {
//   it('should work', () => {
//     // 使用示例
//     const observableObj = new XObservable<IData>({ nested: { prop: 'initialValue' }});
//
//     // 订阅对象的变化
//     observableObj.subject.subscribe(console.log);
//
//     // 改变对象深层属性
//     observableObj.data.nested.prop = 'updatedValue';
//
//     // 输出：{ nested: { prop: 'updatedValue' } }
//
//     // expect(framework()).toEqual('framework');
//   });
// });

describe('createObserver', () => {
  it('should work', () => {
    const a = { b: { c: { d: 10 }}};
    const ob$ = observe(a);
    console.log('ob$ is ', ob$);
    new Watcher(a, 'b.c.d', (val, oldValue) => {
      console.log('ok', val, oldValue);  // ok 10 5
    });
    a.b.c.d = 55;
    expect(a.b.c.d).toBe(55);
  });
});

import { XObservable } from './x-observable.class';
import { IXProxyConfig } from '../x-proxy/x-proxy.interface';
interface IData extends IXProxyConfig {
  nested: {
    prop: string;
  }
}
describe('framework', () => {
  it('should work', () => {
// 使用示例
    let observableObj = new XObservable<IData>({ nested: { prop: 'initialValue' } });

// 订阅对象的变化
    observableObj.subject.subscribe(console.log);

// 改变对象深层属性
observableObj.data.nested.prop = 'updatedValue';

// 输出：{ nested: { prop: 'updatedValue' } }

    // expect(framework()).toEqual('framework');
  });
});

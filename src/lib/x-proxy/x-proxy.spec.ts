
import { XProxy } from './x-proxy.class';
import { IXProxy, IXProxyConfig } from './x-proxy.interface';
describe('x-proxy', () => {
  it('should work', () => {
// 使用示例
    interface ITConfig extends IXProxyConfig {
      a: number;
      b: {c: number};
    }
    let obj: ITConfig = { a: 1, b: { c: 2 } };
    let proxy = new XProxy<ITConfig>(obj);
    console.log(proxy._target.b.c);
    // console.log(proxy.b.c);
    // proxy.b = new XProxy<IXProxyConfig>({ d: 3 });  // 设置嵌套对象
    // console.log(proxy.get('b').get('d'));  // 输出：3

    proxy.set('a', 4);  // 设置属性
    console.log(proxy.get('a'));  // 输出：4
    expect(proxy.get('a')).toEqual(4);
  });
});

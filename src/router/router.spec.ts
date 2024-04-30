/**
 *  @author <xjf> <<xjf7711@qq.com>>
 *  @date 2024/3/8
 *  @description 测试路由
 */
import { Router } from './router.class';

describe('router', () => {
  it('should work', () => {
    console.log('router.spec.ts should work . ');
    const router = new Router({ routes: [] });
    console.log('router is ', router);
    expect(router.routes.length === 0).toEqual(true);
  });
});

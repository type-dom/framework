import { Router } from './router.class';

describe('router', () => {
  it('should work', () => {
    const router = new Router({ routes: [] });
    expect(router.routes.length === 0).toEqual(true);
  });
});

import { Router } from './router.class';
/**
 * @jest-environment window
 * @jest-environment jsdom
 * @jest-environment ./router.class.ts
 */
describe('router', () => {
  it('should work', () => {
    console.log('router.spec.ts should work . ');
    const router = new Router({ routes: [] });
    // console.log('router is ', router);
    expect(router.routes.length === 0).toEqual(true);
  });
  // test('use jsdom in this test file', () => {
  //   const element = document.createElement('div');
  //   expect(element).not.toBeNull();
  // });
});

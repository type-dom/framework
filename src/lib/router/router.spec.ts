import { Router } from './router.class';

/**
 *  router.spec.ts
 *  @author <NAME> <<EMAIL>>
 *  @copyright <NAME> 2018, All rights reserved.
 *  @license MIT
 *  @see https://github.com/type-dom/framework
 *  @see https://github.com/type-dom/framework/blob/main/LICENSE
 *  @see https://github.com/type-dom/framework/blob/main/README.md
 *  @see https://github.com/type-dom/framework/blob/main/.gitignore
 *  @see https://github.com/type-dom/framework/blob/main/.npmignore
 *  @see https://github.com/type-dom/framework/blob/main/.babelrc
 *  @see https://github.com/type-dom/framework/blob/main/.eslintr
 *  @see https://github.com/type-dom/framework/blob/main/.eslintignore
 *  @see https://github.com/type-dom/framework/blob/main/.gitattributes
 *  @see https://github.com/type-dom/framework/blob/main/.npmrc
 *  @see https://github.com/type-dom/framework/blob/main/.nvmrc
 *  @see https://github.com/type-dom/framework/blob/main/.travis.yml
 *  @see https://github.com/type-dom/framework/blob/main/LICENSE
 *  @see https://github.com/type-dom/framework/blob/main/README.md
 *  @see https://github.com/type-dom/framework/blob/main/package.json
 *  @see https://github.com/type-dom/framework/blob/main/tsconfig.json
 */
describe('router', () => {
  it('should work', () => {
    console.log('router.spec.ts should work . ');
    const router = new Router({ routes: [] });
    console.log('router is ', router);
    expect(router.routes.length === 0).toEqual(true);
  });
});

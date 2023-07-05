import { fromEvent } from 'rxjs';
import { AppRoot } from './app-root';
// ui components 展示页面
fromEvent(document, 'DOMContentLoaded').subscribe(() => {
  // console.log('form mode document DOMContentLoaded, e is ', e);
  const uiEl = document.querySelector('#example-ref') as HTMLElement;
  console.log('uiEl is ', uiEl);
  if (uiEl) {
    const view = new AppRoot(uiEl);
    console.log('view is ', view);
  }
});

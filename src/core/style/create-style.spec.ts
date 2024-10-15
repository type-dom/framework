import { createStyle } from './create-style';

describe('createStyle', () => {
  let originalDocument: Document;
  let styleElement: HTMLStyleElement;

  beforeEach(() => {
    // Mock the document and styleElement for testing
    originalDocument = document;
    document = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html');
    document.body.appendChild(document.createElement('div'));
    styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
  });

  afterEach(() => {
    // Restore the original document
    document = originalDocument;
  });

  it('should insert the given CSS styles into the style element', () => {
    const cssStyles = 'body { background-color: blue; }';
    createStyle(cssStyles);

    // Check if the style has been added correctly
    expect(styleElement.textContent).toContain(cssStyles);
  });

  it('should work in modern browsers by appending text node', () => {
    const cssStyles = 'body { background-color: blue; }';
    createStyle(cssStyles);

    // Check if the style has been added correctly
    expect(styleElement.textContent).toContain(cssStyles);
  });
});

//       this.attr.addClass('hover-shadow');
//       createClass('hover-shadow:hover', {
//         boxShadow: $boxShadow.light
//       });
//       createClass('hover-shadow:focus', {
//         boxShadow: $boxShadow.light
//       });

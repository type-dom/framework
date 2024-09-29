import { XElement } from './x-element.class'; // 假设XElement在XElement.ts文件中

describe('XElement', () => {
  it('should create an XElement instance with default nodeName', () => {
    const element = new XElement();
    expect(element).toBeInstanceOf(XElement);
    expect(element.nodeName).toBe('div');
  });

  it('should create an XElement instance with custom nodeName', () => {
    const element = new XElement({ nodeName: 'div' });
    expect(element.nodeName).toBe('div');
  });

  it('should create an XElement instance with attributes', () => {
    const attributes = [{ name: 'name', value: 'component1' }];
    const element = new XElement({ attributes });
    expect(element.attributes).toEqual(attributes);
  });

  it('should create an XElement instance with child nodes', () => {
    const childNodes = [{ nodeName: 'div' }];
    const element = new XElement({ items: childNodes });
    expect(element.childNodes).toEqual(expect.arrayContaining(childNodes));
  });

  it('should create an XElement instance with template', () => {
    const template = '<div>Template Content</div>';
    const element = new XElement({ template });
    // 这里需要根据实际情况编写断言，因为模板解析后的内容可能因解析器而异
    expect(element).toHaveProperty('dom');
  });

  // 更多的测试用例可以根据实际情况编写
});

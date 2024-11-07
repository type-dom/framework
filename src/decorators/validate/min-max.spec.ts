import { minMax } from './min-max';

class Product {
  @minMax(0, 100)
  price: number;

  constructor(price: number) {
    this.price = price;
  }
}

describe('minMax decorator', () => {
  it('should allow setting valid values', () => {
    const product = new Product(50);
    expect(product.price).toBe(50);

    product.price = 75;
    expect(product.price).toBe(75);
  });

  it('should throw an error for invalid values', () => {
    const product = new Product(50);

    expect(() => {
      product.price = -10;
    }).toThrowError('Invalid value -10. Value must be between 0 and 100');

    expect(() => {
      product.price = 150;
    }).toThrowError('Invalid value 150. Value must be between 0 and 100');
  });

  it('should work with initial invalid value', () => {
    expect(() => {
      new Product(-10);
    }).toThrowError('Invalid value -10. Value must be between 0 and 100');

    expect(() => {
      new Product(150);
    }).toThrowError('Invalid value 150. Value must be between 0 and 100');
  });
});

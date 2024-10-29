import { TextNode } from '../../core/text-node/text-node.class';
import { Div } from '../html-element/div/div.class';
import { SlotNode } from './slot-node.class';

describe('SlotNode', () => {
  it('should create a SlotNode instance', () => {
    const name = 'testSlot';
    const slotNode = new SlotNode(name);
    expect(slotNode).toBeInstanceOf(SlotNode);
    expect(slotNode.name).toBe(name);
    expect(slotNode.props).toEqual(expect.objectContaining({ slot: undefined }));
  });

  it('should add a single string as a slot', () => {
    const name = 'testSlot';
    const slotText = 'test';
    const slotNode = new SlotNode(name, slotText);
    expect(slotNode.props.slot).toBe(slotText);
    expect(slotNode.children).toHaveLength(1);
    expect(slotNode.children[0]).toBeInstanceOf(TextNode);
    expect(slotNode.children[0].nodeValue).toBe(slotText);
  });

  it('should add a single TypeNode as a slot', () => {
    const name = 'testSlot';
    const slotNode = new SlotNode(name);
    const childNode = new Div();
    slotNode.addSlot(childNode);
    expect(slotNode.props.slot).toBe(childNode);
    expect(slotNode.children).toContain(childNode);
  });

  it('should add an array of strings and TypeNodes as slots', () => {
    const name = 'testSlot';
    const slotNode = new SlotNode(name);
    const text = 'testString';
    const div = new Div();
    slotNode.addSlot([text, div]);
    expect(slotNode.params.slot).toEqual([text, div]);
    expect(slotNode.children).toHaveLength(2);
    // expect(slotNode.children).toContainInstanceOf(TextNode);
    // expect(slotNode.children).toContainInstanceOf(Div);
  });

  it('should reset the slot', () => {
    const name = 'testSlot';
    const slotNode = new SlotNode(name);
    const firstSlot = 'first';
    slotNode.addSlot(firstSlot);
    const secondSlot = 'second';
    slotNode.resetSlot(secondSlot);
    expect(slotNode.params.slot).toBe(secondSlot);
    expect(slotNode.children).toHaveLength(1);
    expect(slotNode.children[0]).toBeInstanceOf(TextNode);
    expect(slotNode.children[0].nodeValue).toBe(secondSlot);
  });
});

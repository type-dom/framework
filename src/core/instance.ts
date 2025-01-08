import { TypeNode } from './type-node/type-node.abstract';

export let currentInstance: TypeNode | null = null;

export const getCurrentInstance: <T extends TypeNode>() => T | null = <T extends TypeNode>() =>
  currentInstance as T | null; // || currentRenderingInstance

const internalSetCurrentInstance: (
  instance: TypeNode | null
) => void = (instance: TypeNode | null) => {
  currentInstance = instance;
};

export const setCurrentInstance = (instance: TypeNode | null) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  // instance.scope.on()
  return (): void => {
    // instance.scope.off()
    internalSetCurrentInstance(prev);
  };
};

export const unsetCurrentInstance = (): void => {
  // currentInstance && currentInstance.scope.off()
  internalSetCurrentInstance(null);
};

export const SSR_ATTR = 'data-server-rendered';

export const ASSET_TYPES = ['component', 'directive', 'filter'] as const;

export const LIFECYCLE_HOOKS = [
  'beforeCreate', // 组件实例刚创建，数据观测（data observer）和属性（props）都还没有初始化。
  'created', // 组件实例已经创建完成，数据观测和属性已初始化，但真实DOM尚未生成。
  'beforeMount', // 在挂载开始之前调用，相关的render函数首次被调用，此时组件的$el属性还不存在。
  'mounted', // 组件实例被挂载到DOM上，$el属性现在可以访问，但子组件可能还未挂载。
  'beforeUpdate', // 当组件的数据发生改变时，但在DOM更新之前调用。可以访问到最新的数据，但不能访问到最新的DOM。
  'updated', // 数据更新后，DOM已经更新完成。在此阶段，组件DOM已经更新，可以执行依赖于DOM的操作。
  'beforeDestroy', // 组件实例销毁之前调用，实例仍然可用。
  'destroyed', // 组件实例已经被销毁，所有绑定的事件监听器被移除，大部分数据属性将失效。
  'activated', // 对于keep-alive组件，当组件被激活（进入缓存）时调用。
  'deactivated', // 对于keep-alive组件，当组件被停用（退出缓存）时调用。
  'errorCaptured', // 捕获到子孙组件抛出的错误时调用，允许全局处理错误。
  'serverPrefetch', // 在服务器端渲染期间，组件可以在其自己的作用域内预加载数据。
  'renderTracked', // 数据响应式追踪开始时触发，用于调试TypeDom的响应式系统。
  'renderTriggered', // 数据响应式追踪结束时触发，同样用于调试响应式系统。
] as const;

export const NOOP = () => {/* 空函数 */};

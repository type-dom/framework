type UseWindowSizeOptions = {
  initialWidth?: number;
  initialHeight?: number;
  listenOrientation?: boolean;
  includeScrollbar?: boolean;
};

export function useWindowSize(options: UseWindowSizeOptions = {}): {
  width: number;
  height: number;
} {
  const {
    initialWidth = Infinity,
    initialHeight = Infinity,
    listenOrientation = true,
    includeScrollbar = true
  } = options;

  let width = initialWidth;
  let height = initialHeight;

  function update(): void {
    if (typeof window !== 'undefined') {
      if (includeScrollbar) {
        width = window.innerWidth;
        height = window.innerHeight;
      } else {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
      }
    }
  }

  update(); // 初始化尺寸

  // 添加resize事件监听器
  window.addEventListener('resize', update, { passive: true });

  if (listenOrientation) {
    let isPortrait = window.matchMedia('(orientation: portrait)').matches;
    const orientationChangeHandler = (): void => {
      isPortrait = !isPortrait;
      update();
    };

    window.addEventListener('orientationchange', orientationChangeHandler);

    // 考虑到资源管理，可以提供一个清理函数来移除监听器
    // return () => {
    //   window.removeEventListener('resize', update);
    //   window.removeEventListener('orientationchange', orientationChangeHandler);
    // };
  }

  return { width, height };
}

// 使用示例
// const { width, height } = useWindowSize({
//   initialWidth: 100,
//   initialHeight: 100,
//   listenOrientation: true,
// });

// console.log(`Initial window size: ${width}x${height}`);

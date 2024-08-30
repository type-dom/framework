import { addUnit } from '@type-dom/utils';

export const useDraggable = (
  targetRef: HTMLElement | undefined,
  dragRef: HTMLElement | undefined,
  draggable?: boolean,
  overflow?: boolean
) => {
  let transform = {
    offsetX: 0,
    offsetY: 0,
  }

  const onMousedown = (e: MouseEvent) => {
    const downX = e.clientX
    const downY = e.clientY
    const { offsetX, offsetY } = transform

    const targetRect = targetRef!.getBoundingClientRect()
    const targetLeft = targetRect.left
    const targetTop = targetRect.top
    const targetWidth = targetRect.width
    const targetHeight = targetRect.height

    const clientWidth = document.documentElement.clientWidth
    const clientHeight = document.documentElement.clientHeight

    const minLeft = -targetLeft + offsetX
    const minTop = -targetTop + offsetY
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX
    const maxTop = clientHeight - targetTop - targetHeight + offsetY

    const onMousemove = (e: MouseEvent) => {
      let moveX = offsetX + e.clientX - downX
      let moveY = offsetY + e.clientY - downY

      if (!overflow) {
        moveX = Math.min(Math.max(moveX, minLeft), maxLeft)
        moveY = Math.min(Math.max(moveY, minTop), maxTop)
      }

      transform = {
        offsetX: moveX,
        offsetY: moveY,
      }

      if (targetRef) {
        targetRef.style.transform = `translate(${addUnit(
          moveX
        )}, ${addUnit(moveY)})`
      }
    }

    const onMouseup = () => {
      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('mouseup', onMouseup)
    }

    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
  }

  const onDraggable = () => {
    if (dragRef && targetRef) {
      dragRef.addEventListener('mousedown', onMousedown)
    }
  }

  const offDraggable = () => {
    if (dragRef && targetRef) {
      dragRef.removeEventListener('mousedown', onMousedown)
    }
  }
  // todo 钩子要处理
  // onMounted(() => {
  //   watchEffect(() => {
  //     if (draggable.value) {
  //       onDraggable()
  //     } else {
  //       offDraggable()
  //     }
  //   })
  // })
  //
  // onBeforeUnmount(() => {
  //   offDraggable()
  // })
  return { // add by me 2024-08-07 22:01
    onDraggable,
    offDraggable,
  }
}

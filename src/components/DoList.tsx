import React, {useRef} from "react"
import {BoxProps, Stack, StackProps} from "@mui/material"

/**
 * 列表的属性
 */
export type DoListProps = {
  /**
   * 子项列表，可用`Fragment`包围所有子项，子项可用`ListItem`。子项需要指定`key`属性
   */
  content: React.ReactNode,
  /**
   * 加载之前的更多数据
   * @param event
   */
  onLoadPrev?: (event: React.UIEvent<HTMLElement>) => void,
  /**
   * 距离顶部多少像素时触发加载更多。默认 300 px
   */
  toTop?: number,
  /**
   * 加载之后的更多数据
   * @param event
   */
  onLoadNext?: (event: React.UIEvent<HTMLElement>) => void,
  /**
   * 距离底部多少像素时触发加载更多。默认 300 px
   */
  toBottom?: number,
  /**
   *  一次滚动操作触发后，需等待多少毫秒才可再次触发，避免不想要的触发。默认 300 ms
   */
  waitInterval?: number
}

/**
 * 列表组件
 *
 * 上下滑动到两端，可加载更多的数据
 */
const DoList = (props: BoxProps & StackProps & DoListProps) => {
  const {content, onLoadPrev, toTop, onLoadNext, toBottom, waitInterval, ...ps} = props

  // 避免多次误触发滚动，再一次滚动操作后，需要等待一会才能再次触发
  const waitingRef = useRef(false)
  const idRef = useRef("do_list_" + Date.now() + "_" + Math.floor(Math.random() * 1000000))

  return (
    <Stack id={idRef.current} alignItems={"flex-start"} alignContent={"flex-start"} overflow={"auto"}
           component={"ul"} {...ps} onWheel={(e: React.WheelEvent<HTMLDivElement>) => {
      // 判断是否处于等待间隔中，是就直接退出
      if (waitingRef.current) return

      // 不是，就可以执行滚动操作，并设置需等待状态及一会后自动释放
      waitingRef.current = true
      setTimeout(() => waitingRef.current = false, waitInterval || 300)

      // 判断并执行响应的加载操作
      let elem = (e.target as HTMLElement).closest(`#${idRef.current}`) as HTMLElement

      // 加载之前
      if (onLoadPrev && e.deltaY < 0 && elem.scrollTop <= (toTop || 300)) {
        onLoadPrev(e)
      }
      // 加载之后
      if (onLoadNext && e.deltaY > 0 &&
        elem.scrollHeight - elem.scrollTop - elem.clientHeight <= (toBottom || 300)) {
        onLoadNext(e)
      }
    }}>
      {content}
    </Stack>
  )
}

export default DoList
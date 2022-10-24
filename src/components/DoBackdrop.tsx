import {Backdrop, CircularProgress, SxProps} from "@mui/material"
import React, {useCallback, useState} from "react"
import {useBetween} from "use-between"

// 控制蒙版组件 Backdrop 的信息
export type DoBackdropProps = {
  /**
   * 是否显示
   */
  open: boolean
  /**
   * 需要显示的内容组件
   */
  content?: React.ReactNode
  /**
   * 背景颜色。默认灰色，可以设为透明"transparent"
   */
  bg?: string
  /**
   * 点击蒙版触发的回调
   */
  onClick?: (event: React.MouseEvent) => void
}

// 初始属性
const initProps: DoBackdropProps = {open: false, content: <CircularProgress/>, bg: "", onClick: undefined}

// 共享蒙版组件 Backdrop 需要展示的数据
const useBackdrop = () => {
  const [backdropProps, setBackdropProps] = useState(initProps)

  const showBackdrop = useCallback((ps: DoBackdropProps) =>
    setBackdropProps({...initProps, ...ps}), [])

  return {backdropProps, showBackdrop}
}

/**
 * 共享蒙版组件 Backdrop 需要展示的数据
 */
export const useSharedBackdrop = () => useBetween(useBackdrop)

/**
 * 蒙版 Backdrop 组件
 *
 * 背景变灰色，强调显示内容
 */
const DoBackdrop = (props: { sx?: SxProps }) => {
  const {backdropProps} = useSharedBackdrop()

  return (
    <Backdrop sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      background: backdropProps.bg,
      ...props.sx
    }} open={backdropProps.open} onClick={backdropProps.onClick}>
      {backdropProps.content}
    </Backdrop>
  )
}

export default DoBackdrop
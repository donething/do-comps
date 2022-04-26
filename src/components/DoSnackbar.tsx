import React, {useCallback} from "react"
import {Alert, AlertColor, AlertProps, AlertTitle, Snackbar, SnackbarOrigin} from "@mui/material"
import MuiAlert from "@mui/material/Alert"
import {useBetween} from "use-between"

// 深色 Alert
export const BrightAlert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

// 控制显示 Snackbar
export type DoSnackbarProps = {
  // Snackbar 的属性
  open?: boolean
  // 指定时间后自动隐藏，毫秒
  autoHideDuration?: number
  // 位置
  anchorOrigin?: SnackbarOrigin

  // Alert 的属性
  // 标题，可空
  title?: React.ReactNode
  // 消息
  message?: React.ReactNode
  // 状态
  severity?: AlertColor
  // 行为，如撤销按钮
  action?: React.ReactNode

  // 当为空时，不会显示关闭按钮，若 autoHideDuration 为空时需指定以便关闭
  onClose?: () => void
}

// 初始值
const initProps: DoSnackbarProps = {autoHideDuration: 3000}

// Snackbar 需要展示的数据
const useSnackbar = () => {
  const [sbProps, setSbProps] = React.useState<DoSnackbarProps>(initProps)
  const showSb = useCallback((ps: DoSnackbarProps) => {
    // 在关闭时，仅改变`open`属性，不改变其它属性，可以避免重新渲染时的残影
    if (ps.open === false) {
      setSbProps(prev => ({...prev, open: false}))
    } else {
      setSbProps({...initProps, ...ps})
    }
  }, [])

  return {sbProps, showSb}
}

// 共享 Snackbar 需要展示的数据
export const useSharedSnackbar = () => useBetween(useSnackbar)

// 自定义 Snackbar 组件
const DoSnackbar = () => {
  const {sbProps, showSb} = useSharedSnackbar()

  return (
    <Snackbar open={sbProps.open}
              autoHideDuration={sbProps.autoHideDuration}
              anchorOrigin={sbProps.anchorOrigin}
              onClose={(e, reason: string) => {
                // 当提示不自动隐藏时，点击提示外部时也不隐藏
                // !sbProps.autoHideDuration && reason === "clickaway"
                if (reason === "clickaway") {
                  return
                }

                // 用于关闭 Snackbar，如果没有该 onClose 回调，Snackbar 将无法关闭（即使指定了 autoHideDuration）
                showSb({open: false})
              }}>
      <Alert sx={{width: "100%"}} severity={sbProps.severity} action={sbProps.action}
                   onClose={!sbProps.onClose ? undefined : () => {
                     // 用于点击关闭按钮后回调，如果没有 onClose 属性，将不出现关闭按钮
                     showSb({open: false})
                     sbProps.onClose && sbProps.onClose()
                   }}>
        <AlertTitle>{sbProps.title}</AlertTitle>
        {sbProps.message}
      </Alert>
    </Snackbar>
  )
}

export default DoSnackbar
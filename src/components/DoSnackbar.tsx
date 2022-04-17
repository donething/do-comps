import React, {FC, ReactNode, useCallback} from "react"
import {Alert, Snackbar} from "@mui/material"
import {useBetween} from "use-between"

// 控制显示 Snackbar
// 用 class 而不是 interface，是因为需要在 useState 中设置初始化值
class DoSnackbarProps {
  // Snackbar 的属性
  open: boolean = false             // 必须
  autoHideDuration?: number = 3000  // 当指定数字（毫秒，通常设为 3000）时自动隐藏
  anchorOrigin?: { horizontal: 'center' | 'left' | 'right', vertical: 'bottom' | 'top' } = {
    vertical: "bottom",
    horizontal: "left"
  }

  // Alert 的属性
  message?: string = ""             // 消息
  severity?: "error" | "warning" | "info" | "success" = "info"
  action?: ReactNode                // 行为，如撤销按钮

  onClose?: () => void              // 当为空时，不会显示关闭按钮，若 autoHideDuration 为空时需指定以便关闭
}

// Snackbar 需要展示的数据
const useSnackbar = () => {
  const [sbProps, setSbProps] = React.useState(new DoSnackbarProps())
  const showSb = useCallback((ps: DoSnackbarProps) =>
    setSbProps(prev => ({...prev, ...ps})), []
  )

  return {sbProps, setSbProps, showSb}
}

// 共享 Snackbar 需要展示的数据
export const useSharedSnackbar = () => useBetween(useSnackbar)

// 自定义 Snackbar 组件
const DoSnackbar: FC = () => {
  const {sbProps, showSb} = useSharedSnackbar()

  return (
    <Snackbar open={sbProps.open}
              autoHideDuration={sbProps.autoHideDuration}
              anchorOrigin={sbProps.anchorOrigin}
              onClose={(e, reason: string) => {
                // 当提示不自动隐藏时，点击提示外部时也不隐藏
                if (!sbProps.autoHideDuration && reason === "clickaway") {
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
        {sbProps.message}
      </Alert>
    </Snackbar>
  )
}

export default DoSnackbar
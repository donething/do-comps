import React, {Fragment, useCallback, useState} from "react"
import {useBetween} from "use-between"
import {
  Button, ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Theme,
} from "@mui/material"
import {SxProps} from "@mui/system"

// 行为按钮的属性
export type DoDialogBtnProps = {
  text: string
  props?: ButtonProps
  onClick?: () => void
}
// 控制显示 Dialog
export type DoDialogProps = {
  // 是否显示
  open: boolean

  // 标题
  title?: string

  // 消息、内容，内容在消息下面，可以为复杂组件
  message?: string
  content?: React.ReactNode

  // 是否显示顶部、底部的分割线，默认 false
  dividers?: boolean

  // 是否为模态对话框，默认 false
  modal?: boolean

  // 是否以最大宽度显示
  fullWidth?: boolean

  // 增加对应按钮、行为，仅当 action 为**空**时有效
  btnOK?: DoDialogBtnProps
  btnCancel?: DoDialogBtnProps

  // 可覆盖上面的确认、取消按钮和行为
  // 传递此参数后，需要自行处理关闭对话框
  action?: React.ReactNode

  // CSS
  sx?: SxProps<Theme>
}

// 初始属性
const initProps: DoDialogProps = {open: false, modal: false, fullWidth: true}

// 共享 Dialog
const useDialog = () => {
  const [dialogProps, setDialogProps] = useState<DoDialogProps>(initProps)
  const showDialog = useCallback((ps: DoDialogProps) =>
    setDialogProps({...initProps, ...ps}), [])

  return {dialogProps, showDialog}
}

// 共享 Dialog 需要展示的数据
export const useSharedDialog = () => useBetween(useDialog)

// 对话框组件
const DoDialog = () => {
  const {dialogProps, showDialog} = useSharedDialog()

  return (
    <Dialog open={dialogProps.open} scroll={"paper"} fullWidth={dialogProps.fullWidth} sx={dialogProps.sx}
            onClose={(_, reason) => {
              // 为模态对话框时，点击外部不关闭
              if (dialogProps.modal && (reason === "backdropClick" || reason === "escapeKeyDown")) {
                return
              }

              showDialog({open: false})
            }}>
      <DialogTitle>{dialogProps.title}</DialogTitle>

      <DialogContent dividers={dialogProps.dividers}>
        {dialogProps.message && <DialogContentText>{dialogProps.message}</DialogContentText>}
        {dialogProps.content && dialogProps.content}
      </DialogContent>

      <DialogActions>
        {
          dialogProps.action ? dialogProps.action :
            <Fragment>
              {
                dialogProps.btnCancel && <Button {...dialogProps.btnCancel.props} onClick={() => {
                  dialogProps.btnCancel && dialogProps.btnCancel.onClick && dialogProps.btnCancel.onClick()
                  showDialog({open: false})
                }}>{dialogProps.btnCancel.text}</Button>
              }

              {
                dialogProps.btnOK && <Button  {...dialogProps.btnOK.props} onClick={() => {
                  dialogProps.btnOK && dialogProps.btnOK.onClick && dialogProps.btnOK.onClick()
                  showDialog({open: false})
                }}>{dialogProps.btnOK.text}</Button>
              }
            </Fragment>
        }
      </DialogActions>
    </Dialog>
  )
}

export default DoDialog
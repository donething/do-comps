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

/**
 * 对话框中按钮的属性
 */
export type DoDialogBtnProps = {
  /**
   * 按钮的文本
   */
  text: string
  /**
   * 按钮的属性
   */
  props?: ButtonProps
  /**
   * 点击的回调
   */
  onClick?: () => void
}

/**
 * 控制显示 Dialog 的属性
 */
export type DoDialogProps = {
  /**
   * 是否显示
   */
  open: boolean
  /**
   * 标题
   */
  title?: string
  /**
   * 消息
   */
  message?: string
  /**
   * 内容在消息下面显示，可以为复杂组件
   */
  content?: React.ReactNode
  /**
   * 是否显示顶部、底部的分割线
   *
   * 默认 false
   */
  dividers?: boolean
  /**
   * 是否为模态对话框
   *
   * 默认 false
   */
  modal?: boolean
  /**
   * 是否以最大宽度显示
   */
  fullWidth?: boolean
  /**
   * 增加确定按钮和其行为，仅当 action 为**空**时有效
   */
  btnOK?: DoDialogBtnProps
  /**
   * 增加取消按钮和其行为，仅当 action 为**空**时有效
   */
  btnCancel?: DoDialogBtnProps
  /**
   * 对话框的行为按钮
   *
   * 可覆盖上面的确认、取消按钮
   *
   * 传递此参数后，需要**自行处理**关闭对话框
   */
  action?: React.ReactNode
  /**
   * 定义对话框的样式
   */
  sx?: SxProps<Theme>
}

// 初始属性
const initProps: DoDialogProps = {
  open: false,
  title: "",
  message: "",
  content: "",
  dividers: false,
  modal: false,
  fullWidth: true,
  btnOK: undefined,
  btnCancel: undefined,
  action: undefined,
  sx: undefined
}

// 共享 Dialog
const useDialog = () => {
  const [dialogProps, setDialogProps] = useState<DoDialogProps>(initProps)

  const showDialog = useCallback((ps: DoDialogProps) =>
    setDialogProps({...initProps, ...ps}), [])

  return {dialogProps, showDialog}
}

/**
 * 共享 Dialog 需要展示的数据
 */
export const useSharedDialog = () => useBetween(useDialog)

/**
 * 对话框组件
 *
 * 在对话框中显示内容和操作按钮
 */
const DoDialog = () => {
  const {dialogProps, showDialog} = useSharedDialog()

  return (
    <Dialog open={dialogProps.open} scroll={"paper"} fullWidth={dialogProps.fullWidth}
            sx={dialogProps.sx}
            onClose={(_, reason) => {
              // 为模态对话框时，点击外部不关闭
              if (dialogProps.modal && (reason === "backdropClick" || reason === "escapeKeyDown")) {
                return
              }

              showDialog({open: false})
            }}>
      <DialogTitle>{dialogProps.title}</DialogTitle>

      <DialogContent dividers={dialogProps.dividers}>
        {dialogProps.message &&
          <DialogContentText sx={{overflowX: "hidden", wordBreak: "break-all", whiteSpace: "break-spaces"}}>
            {dialogProps.message}</DialogContentText>
        }
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
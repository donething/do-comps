import {AlertTitle, Button, Stack} from "@mui/material"
import {BrightAlert, useSharedBackdrop, useSharedDialog, useSharedDrawer, useSharedSnackbar} from "../main"
import React, {useState} from "react"

export const DoSnackbarTest = () => {
  const [count, setCount] = useState(0)

  const {showSb} = useSharedSnackbar()
  const {showDialog} = useSharedDialog()
  const {showDrawer} = useSharedDrawer()
  const {showBackdrop} = useSharedBackdrop()

  const handleSvgClick = React.useCallback(() => console.log("点击了SVG图标"), [])

  return (
    <Stack>
      <div>{count}</div>
      <Button onClick={() => setCount(prev => ++prev)}>只更新计数时，不重新渲染 DoAutocomplete</Button>

      <BrightAlert><AlertTitle>标题</AlertTitle>内容！</BrightAlert>

      <Button onClick={() => showSb({open: true, message: "消息1。", severity: "success"})}>
        打开 Snakebar1
      </Button>

      <Button onClick={() => showSb({open: true, title: "标题", message: "消息2。"})}>
        打开 Snakebar2
      </Button>

      <Button onClick={() => showSb({
        open: true, title: "", message: "消息3。", showCloseBn: true
      })}>
        打开 Snakebar3
      </Button>

      <Button onClick={() => showSb({open: true, message: "消息4。", action: <Button>确定</Button>})}>
        打开 Snakebar4
      </Button>


      <Button onClick={() => showDialog({
        open: true, title: "标题", message: "消息1。", content: <Button>测试按钮</Button>
      })}>
        打开 Dialog1
      </Button>

      <Button onClick={() => showDialog({
        open: true, title: "标题", message: "消息2。",
        modal: true,
        action: <Button onClick={() => showDialog({open: false})}>确定</Button>
      })}>
        打开 Dialog2
      </Button>

      <Button onClick={() => showDialog({
        open: true, title: "标题", message: "消息3。", fullWidth: true
      })}>
        打开 Dialog3
      </Button>

      <Button onClick={() => showDrawer({open: true, content: "测试抽屉"})}>
        打开 抽屉
      </Button>

      <Button onClick={() => showBackdrop({
        open: true,
        onClick: () => showBackdrop({open: false})
      })}>
        显示蒙版
      </Button>
    </Stack>
  )
}
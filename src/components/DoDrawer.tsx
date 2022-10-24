import React, {useCallback, useState} from "react"
import {Drawer, Stack} from "@mui/material"
import {useBetween} from "use-between"

/**
 * 控制显示抽屉组件 Drawer 的信息
 */
export type DoDrawerProps = {
  /**
   * 是否显示
   */
  open?: boolean
  /**
   * 显示的位置
   */
  anchor?: "left" | "top" | "right" | "bottom"
  /**
   * 显示的内容组件
   */
  content?: React.ReactNode
  /**
   * 关闭时的回调
   */
  onClose?: () => void
}

// 初始值
const initProps: DoDrawerProps = {open: false, anchor: "bottom", content: "", onClose: undefined}

// 共享 Drawer 需要展示的数据
const useDrawer = () => {
  const [drawerProps, setDrawerProps] = useState(initProps)

  const showDrawer = useCallback((ps: DoDrawerProps) =>
    setDrawerProps({...initProps, ...ps}), [])

  return {drawerProps, showDrawer}
}

/**
 * 共享 Drawer 需要展示的数据
 */
export const useSharedDrawer = () => useBetween(useDrawer)

/**
 * 抽屉组件 Drawer
 *
 * 背景变暗，从指定位置弹出、显示组件
 */
const DoDrawer = () => {
  const {drawerProps, showDrawer} = useSharedDrawer()

  return (
    <Drawer anchor={drawerProps.anchor} open={drawerProps.open}
            onClose={() => {
              // 关闭抽屉
              showDrawer({open: false})
              // 执行可能的回调
              drawerProps.onClose && drawerProps.onClose()
            }}>
      <Stack>{drawerProps.content}</Stack>
    </Drawer>
  )
}

export default DoDrawer
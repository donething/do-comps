import React from "react"
import {Stack, StackProps} from "@mui/material"

/**
 * 面板头部
 *
 * 包含标题文字、工具按钮集，将两端对齐
 */
const DoPanelHeader = (props: StackProps & { children: React.ReactNode }) => {
  const {children, ...ps} = props

  return (
    <Stack flex={"0 1 auto"} direction={"row"} flexWrap={"nowrap"} justifyContent={"space-between"}
           alignItems={"center"} {...ps}>
      {children}
    </Stack>
  )
}

/**
 * 面板主内容
 *
 * 默认方向为“列”
 */
const DoPanelContent = (props: StackProps & { children: React.ReactNode }) => {
  const {children, ...ps} = props

  return (
    <Stack flex={"1 1 auto"} overflow={"auto"} alignItems={"flex-start"} alignContent={"flex-start"} {...ps} >
      {children}
    </Stack>
  )
}

/**
 * 面板底部
 */
const DoPanelFooter = (props: StackProps & { children: React.ReactNode }) => {
  const {children, ...ps} = props

  return (
    <Stack flex={"0 1 auto"} paddingTop={2} {...ps}>
      {children}
    </Stack>
  )
}

/**
 * 垂直布局的面板的参数
 */
const DoPanel = (props: StackProps & { children: React.ReactNode }): JSX.Element => {
  const {children, ...ps} = props

  return (
    <Stack height={"100vh"} bgcolor={"background.paper"} flexWrap={"nowrap"} {...ps}>
      {children}
    </Stack>
  )
}

export {DoPanel, DoPanelHeader, DoPanelContent, DoPanelFooter}
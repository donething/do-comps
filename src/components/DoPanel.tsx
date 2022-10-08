import React from "react"
import {Box, BoxProps, Divider, Stack, Theme} from "@mui/material"
import {SxProps} from "@mui/system"

/**
 * 面板头部
 *
 * 包含标题文字、工具按钮集，将两端对齐
 */
const DoPanelHeader = (props: BoxProps & { children: React.ReactNode, divider?: boolean }) => {
  const {children, divider, ...ps} = props

  return (
    <Box flex={"0 1 auto"} {...ps}>
      <Stack flexDirection={"row"} flexWrap={"nowrap"} justifyContent={"space-between"} alignItems={"center"}>
        {children}
      </Stack>

      {divider && <Divider/>}
    </Box>
  )
}

/**
 * 面板主内容
 *
 * 默认方向为“列”
 */
const DoPanelContent = (props: BoxProps & { children: React.ReactNode }) => {
  const {children, ...ps} = props

  return (
    <Box flex={"1 1 auto"} display={"flex"} flexDirection={"column"}
         flexWrap={"wrap"} alignItems={"flex-start"} alignContent={"flex-start"}
         overflow={"auto"}  {...ps} >{children}</Box>
  )
}

/**
 * 面板底部
 */
const DoPanelFooter = (props: BoxProps & { children: React.ReactNode, divider?: boolean }) => {
  const {children, divider, ...ps} = props

  return (
    <Box paddingTop={1} flex={"0 1 auto"} {...ps}>
      {divider && <Divider/>}
      {children}
    </Box>
  )
}

/**
 * 垂直布局的面板的参数
 */
const DoPanel = (props: { children: React.ReactNode, sx?: SxProps<Theme> }): JSX.Element => {
  return (
    <Box bgcolor={"background.paper"} sx={props.sx} display={"flex"} flexDirection={"column"} flexWrap={"nowrap"}
         height={"100vh"}>
      {props.children}
    </Box>
  )
}

export {DoPanel, DoPanelHeader, DoPanelContent, DoPanelFooter}
import React from "react"
import {Box, BoxProps, Divider, Stack, Theme} from "@mui/material"
import {SxProps} from "@mui/system"

/**
 * 面板头部
 *
 * 包含标题文字、工具按钮集，将两端对齐
 */
const DoPanelHeader = (props: { children: React.ReactNode, divider?: boolean, ps?: BoxProps }) => {
  return (
    <Box {...props.ps} flex={"0 1 auto"}>
      <Stack flexDirection={"row"} flexWrap={"nowrap"} justifyContent={"space-between"} alignItems={"center"}>
        {props.children}
      </Stack>

      {props.divider && <Divider/>}
    </Box>
  )
}

/**
 * 面板主内容
 *
 * 默认方向为“列”
 */
const DoPanelContent = (props: { children: React.ReactNode, direction?: "column" | "row", ps?: BoxProps }) => {
  return (
    <Box {...props.ps} flex={"1 1 auto"} display={"flex"} flexDirection={props.direction || "column"}
         overflow={"auto"}>{props.children}</Box>
  )
}

/**
 * 面板底部
 */
const DoPanelFooter = (props: { children: React.ReactNode, divider?: boolean, ps?: BoxProps }) => {
  return (
    <Box paddingTop={1} {...props.ps} flex={"0 1 auto"}>
      {props.divider && <Divider/>}
      {props.children}
    </Box>
  )
}

/**
 * 垂直布局的面板的参数
 */
const DoPanel = (props: { children: React.ReactNode, sx?: SxProps<Theme> }): JSX.Element => {
  return (
    <Box sx={props.sx} display={"flex"} flexDirection={"column"} flexWrap={"nowrap"} height={"100vh"}>
      {props.children}
    </Box>
  )
}

export {DoPanel, DoPanelHeader, DoPanelContent, DoPanelFooter}
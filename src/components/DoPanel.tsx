import React from "react"
import {Box, BoxProps, Divider, Theme,} from "@mui/material"
import {SxProps} from "@mui/system"

// 面板头部
const DoPanelHeader = (props: { children: React.ReactNode, divider?: boolean, ps?: BoxProps }) => {
  return (
    <Box {...props.ps} flex={"0 1 auto"}>
      {props.children}
      {props.divider && <Divider/>}
    </Box>
  )
}

// 面板主内容
const DoPanelContent = (props: { children: React.ReactNode, ps?: BoxProps }) => {
  return (
    <Box {...props.ps} flex={"1 1 auto"}>{props.children}</Box>
  )
}

// 面板底部
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
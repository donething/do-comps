import React from "react"
import {Box, Divider, Stack, Theme, Typography} from "@mui/material"
import {SxProps} from "@mui/system"

// 垂直布局的面板的参数
export type VPanelProps = {
  // 面板头的标题
  title: string
  // 面板头右边的操作区域
  slot?: JSX.Element

  // 主内容区
  content: JSX.Element,

  // 底部
  footer?: JSX.Element,

  // 面板的样式
  sx?: SxProps<Theme>
}

/**
 * 垂直布局的面板的参数
 * @param props 面板属性
 */
const DoVPanel = (props: VPanelProps): JSX.Element => {
  return (
    <Stack boxSizing={"border-box"}
           borderLeft={"1px rgba(0, 0, 0, 0.08) solid"}
           borderRight={"1px rgba(0, 0, 0, 0.08) solid"}
           height={"100vh"}
           bgcolor={"#FFF"}
           sx={{...props.sx}}>
      {/* 头部 */}
      <Stack direction={"row"} flex={"0 1 auto"} justifyContent={"space-between"} alignItems={"center"}
             padding={1}>
        {/* 标题 */}
        <Typography title={props.title} overflow={"hidden"} textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}>{props.title}
        </Typography>
        {/* 工具按钮 */}
        <Stack direction={"row"}>{props.slot}</Stack>
      </Stack>
      <Divider variant={"fullWidth"}/>

      {/* 内容 */}
      <Box flex={"1 1 auto"} overflow={"auto"} marginTop={1}>{props.content}</Box>

      {/* 脚部 */}
      <Box flex={"0 1 auto"} marginTop={1} marginBottom={1}>
        {props.footer}
      </Box>
    </Stack>
  )
}

export default DoVPanel
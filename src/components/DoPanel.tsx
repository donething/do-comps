import React, {Fragment} from "react"
import {Card, CardActions, CardContent, CardHeader, Divider, Theme,} from "@mui/material"
import {SxProps} from "@mui/system"

// 垂直布局的面板的参数
export type DoPanelProps = {
  // 头部
  header?: {
    // 右侧的工具按钮
    action?: React.ReactNode,
    // 左侧的头像，可传递 <Avatar src={"https://example.com/favicon.ico"}/>
    avatar?: React.ReactNode
    // 不用 Typography 包装 主、子标题
    disableTypography?: boolean
    // 主标题
    title?: React.ReactNode,
    // 子标题
    subheader?: React.ReactNode,
  }
  // 头部样式，已设"flex"
  sxHeader?: SxProps<Theme>

  // 内容，可用 <Fragment> 传递
  content: React.ReactNode
  // 内容样式，已设"flex"、"overflow"
  sxContent?: SxProps<Theme>

  // 底部，可用 <Fragment> 传递
  footer?: React.ReactNode
  // 底部样式，已设"flex"
  sxFooter?: SxProps<Theme>

  // 整个面板的样式，已设"height"
  sx?: SxProps<Theme>
  // 头部下、底部上是否需要分隔符，默认为 true
  dividers?: boolean
  // 是否为水平布局，默认 false，即垂直布局
  isRow?: boolean
}

/**
 * 垂直布局的面板的参数
 */
const DoPanel = ({
                   header,
                   sxHeader,
                   content,
                   sxContent,
                   footer,
                   sxFooter,
                   sx,
                   dividers = true,
                   isRow = false
                 }: DoPanelProps): JSX.Element => {
  return (
    <Card sx={{height: "100vh", display: "flex", flexFlow: "column nowrap", ...sx}}>
      {header &&
        <Fragment>
          <CardHeader {...header} sx={{
            flex: "0 1 auto",
            "& .MuiCardHeader-content": {overflow: "hidden"},
            "& .MuiCardHeader-title": {overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"},
            display: "flex", flexFlow: "row nowrap", alignItems: "center",
            ...sxHeader
          }}/>

          {dividers && <Divider/>}
        </Fragment>
      }

      <CardContent sx={{
        flex: "1 1 auto", overflow: "auto",
        display: "flex", flexFlow: isRow ? "row wrap" : "column nowrap",
        alignItems: isRow ? "flex-start" : "stretch",
        gap: isRow ? 2 : 0,
        ...sxContent
      }}>{content}
      </CardContent>

      {footer &&
        <Fragment>
          {dividers && <Divider/>}

          <CardActions sx={{flex: "0 1 auto", ...sxFooter}}>{footer}</CardActions>
        </Fragment>
      }
    </Card>
  )
}

export default DoPanel
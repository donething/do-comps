import {Typography, TypographyProps} from "@mui/material"
import React from "react"

// 文本组件的属性
export type DoTextProps = TypographyProps & {
  // 文本，可作为子元素传递：<DoText>测试文本</DoText>
  children: string

  // 最大行数，不指定时不限制
  lines?: number

  // 文本行数是否为最大行数
  isMax?: boolean
}

// 文本组件，可传递`Typography`的属性
// @see https://stackoverflow.com/questions/63592567/material-ui-text-ellipsis-after-two-line
const DoText = (props: DoTextProps): JSX.Element => {
  // 单独提取 sx，以免被覆盖
  const {sx, lines, isMax, ...others} = props

  return (
    <Typography {...others} sx={{
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: lines,
      lineHeight: "1.5em",
      height: `${lines ? (lines * 1.5) + "em" : "auto"}`,
      WebkitBoxOrient: "vertical",
      ...sx
    }}>{props.children}
    </Typography>
  )
}

export default DoText
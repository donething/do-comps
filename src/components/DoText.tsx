import {Typography, TypographyProps} from "@mui/material"
import React from "react"

/**
 * 文本组件的属性
 */
export type DoTextProps = TypographyProps & {
  /**
   * 文本，可作为子元素传递：`<DoText>测试文本</DoText>`
   */
  children: string
  /**
   * 最大行数，不指定时不限制
   */
  lines?: number
}

/**
 * 文本组件
 *
 * 可指定行数，多余的部分文本会省略
 *
 * 可传递`Typography`的属性
 * @see https://stackoverflow.com/questions/63592567/material-ui-text-ellipsis-after-two-line
 */
const DoText = React.memo((props: DoTextProps): JSX.Element => {
  // 单独提取 sx，以免被覆盖
  const {children, lines, ...ps} = props

  return (
    <Typography overflow={"hidden"} title={children} {...ps}
                sx={{display: "-webkit-box", WebkitLineClamp: lines, WebkitBoxOrient: "vertical"}}>
      {children}
    </Typography>
  )
})

/**
 * 标题组件
 *
 * 可传递`Typography`的属性
 */
const DoTextTitle = React.memo((props: TypographyProps & { children: string }) => {
  const {children, ...ps} = props

  return (
    <DoText padding={1} paddingLeft={2} fontWeight={400} fontSize={"1.2rem"} {...ps}>{children}</DoText>
  )
})

export {DoText, DoTextTitle}
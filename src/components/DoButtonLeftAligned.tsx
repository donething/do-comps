import {Button, ButtonProps} from "@mui/material"
import React from "react"

export interface DoButtonLeftAlignedProps extends ButtonProps {
  // 新增 customStyle 属性
  customStyle?: React.CSSProperties
}

/**
 * 左对齐的 Button
 * @param props 其它属性。支持通过`customStyle`传递CSS属性
 */
const DoButtonLeftAligned = (props: DoButtonLeftAlignedProps) => {
  const {children, customStyle, ...otherProps} = props

  const combinedStyle = {
    display: "flex",
    justifyContent: "flex-start",
    // 合并自定义样式
    ...customStyle,
  }

  return (
    <Button style={combinedStyle} {...otherProps}>
      {children}
    </Button>
  )
}

export default DoButtonLeftAligned
import React, {useState} from "react"
import {Button, IconButton, InputAdornment, TextField, TextFieldProps} from "@mui/material"

/**
 * 带确认按钮的输入框的属性
 */
export type DoTextFieldBtnType = TextFieldProps & {
  /**
   * 标签
   */
  label?: string
  /**
   * 设置 按钮或图标
   *
   * 1. 传递字符串时，会自动转为 Button
   *
   * 2. 传递 SvgIcon 组件时，会转为 IconButton，如
   *
   * `import Visibility from '@mui/icons-material/Visibility'`
   *
   * `... enterNode={<Visibility/>} ...`
   */
  enterNode?: React.ReactNode
  /**
   * 当执行回车回调后清空输入框的文本
   */
  clearAfterEnter?: boolean
  /**
   * 回车、点击确定后的回调
   * @param value 输入框中的文本
   */
  onEnter?: (value: string) => void
}

/**
 * 带确认按钮的输入框
 */
const DoTextFieldBtn = React.memo((props: DoTextFieldBtnType & TextFieldProps): JSX.Element => {
  // 输入框的值，用于按下确认按钮后，清除搜索框的值
  const [value, setValue] = useState("")

  // 使 ps 只包含 TextFieldProps 属性，排除自定义的属性，用于给 TextField 赋值 {...ps}，避免组件不存在某属性的警告
  const {label, enterNode, clearAfterEnter, onEnter, ...ps} = props

  return (
    <TextField fullWidth label={label} value={value} onChange={event => setValue(event.target.value)}
               InputProps={{
                 /* 按钮、图标 */
                 endAdornment: (
                   <InputAdornment position="end" onClick={() => {
                     onEnter && onEnter(value)
                     clearAfterEnter && setValue("")
                   }}>
                     {
                       /* 没有找到自动填充按钮到父元素高度的办法，暂时硬编码设置高度 */
                       typeof enterNode !== "string" ? <IconButton>{enterNode}</IconButton> :
                         <Button variant={"contained"} disableElevation
                                 sx={{height: `${props.size === "small" ? 40 : 56}px`}}>
                           {enterNode}
                         </Button>
                     }
                   </InputAdornment>),

                 style: {paddingRight: typeof enterNode !== "string" ? "" : 0}
               }}

               onKeyDown={event => {
                 /* 回车键 */
                 if (event.key === "Enter") {
                   onEnter && onEnter(value)
                   clearAfterEnter && setValue("")
                   event.preventDefault()
                 }
               }}

               {...ps}
    />
  )
})

export default DoTextFieldBtn
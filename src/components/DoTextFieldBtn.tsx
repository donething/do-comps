import React, {useState} from "react"
import {Box, Button, InputAdornment, TextField, TextFieldProps} from "@mui/material"

// 带确认按钮的输入框的属性
export type DoTextFieldBtnType = TextFieldProps & {
  // 确认按钮，可传递字符串如“确定”，图标可以为
  // `import {ReactComponent as IconSVG} from "../test/icons/settings.svg"`
  // `<IconButton aria-label="确定"><SvgIcon component={IconSVG} viewBox="0 0 1024 1024"/></IconButton>`
  enterNode?: string | React.ReactNode

  // 回车、确定后的回调
  onEnter?: (value: string) => void
}

// 带确认按钮的输入框
const DoTextFieldBtn = (props: DoTextFieldBtnType): JSX.Element => {
  // 输入框的值，用于按下确认按钮后，清除搜索框的值
  const [value, setValue] = useState("")

  // 使 ps 只包含 TextFieldProps 属性，排除自定义的属性，用于给 TextField 赋值 {...ps}，避免组件不存在某属性的警告
  const {enterNode, onEnter, ...ps} = props

  return (
    <TextField{...ps} value={value} fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box onClick={() => onEnter && onEnter(value)}>
                      {
                        typeof enterNode === "string" ?
                          <Button variant={"contained"} disableElevation>{enterNode}</Button> :
                          enterNode
                      }
                    </Box>
                  </InputAdornment>
                ),
                style: {paddingRight: 0}
              }}
              onChange={event => setValue(event.target.value)}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  onEnter && onEnter(value)
                  event.preventDefault()
                }
              }}
    />
  )
}

export default DoTextFieldBtn
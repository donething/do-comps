import {IconButton, InputAdornment, TextField, TextFieldProps} from "@mui/material"
import React from "react"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

/**
 * 密码输入框的属性
 */
export type DoPasswdFieldProps = {
  /**
   * 绑定到输入框的状态值
   */
  value: string
  /**
   * 设置输入框状态值的函数
   */
  setValue: React.Dispatch<React.SetStateAction<string>>
  /**
   * 标签
   */
  label?: string
}

/**
 * 密码输入框
 *
 * 可明文显示输入的密码
 */
const DoPasswdField = React.memo((props: DoPasswdFieldProps & TextFieldProps) => {
  const [showPasswd, setShowPasswd] = React.useState(false)

  const {label, value, setValue, ...ps} = props

  const handleShowPasswd = () => setShowPasswd(prev => !prev)

  return (
    <TextField fullWidth label={label} value={value} type={showPasswd ? "text" : "password"}
               onChange={event => setValue(event.target.value)}
               InputProps={{
                 endAdornment: (
                   <InputAdornment position="end">
                     <IconButton onClick={handleShowPasswd}>
                       {showPasswd ? <VisibilityOff/> : <Visibility/>}
                     </IconButton>
                   </InputAdornment>
                 )
               }}

               {...ps}
    />
  )
})

export default DoPasswdField
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
   * 设置输入框状态值的 setState 函数。此属性为空时，setObject 才能生效
   *
   * 通常在 使用 useState 定义字符串变量时使用
   */
  setValue?: React.Dispatch<React.SetStateAction<string>>
  /**
   * 设置输入框状态值的自定义函数
   *
   * 可在 使用 useState 定义对象时使用，如这个对象包含 用户名、密码时设置密码
   * @param value 输入框的值
   */
  setObject?: (value: string) => void
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

  const {label, value, setValue, setObject, ...ps} = props

  const handleShowPasswd = () => setShowPasswd(prev => !prev)

  return (
    <TextField fullWidth label={label} size={"small"} type={showPasswd ? "text" : "password"}
               value={value}
               onChange={event => setValue ? setValue(event.target.value) :
                 setObject ? setObject(event.target.value) : console.log("[DoPasswdField] 设置状态的函数未定义")}
               InputProps={{
                 endAdornment: (
                   <InputAdornment position="end">
                     <IconButton onClick={handleShowPasswd}>
                       {showPasswd ? <VisibilityOff fontSize={ps.size || "small"}/> :
                         <Visibility fontSize={ps.size || "small"}/>}
                     </IconButton>
                   </InputAdornment>
                 )
               }}

               {...ps}
    />
  )
})

export default DoPasswdField
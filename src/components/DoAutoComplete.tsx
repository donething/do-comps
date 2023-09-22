import {
  Autocomplete,
  IconButton,
  ListItem,
  ListItemText,
  TextField
} from "@mui/material"
import React, {HTMLAttributes} from "react"
import DeleteIcon from '@mui/icons-material/Delete'

/**
 * 自动完成输入框组件的属性
 */
export type DoAutocompleteProps = {
  /**
   * 输入提示
   */
  label: string
  /**
   * 选项
   */
  options: Array<string>
  /**
   * 回车后的回调
   */
  onEnter: (option: string) => void
  /**
   * 删除选项
   */
  onDelOption?: (option: string) => void
}

/**
 * 自动完成输入框组件
 *
 * 含有选择列表的文本输入框，可根据输入文本过滤选择列表
 */
const DoAutocomplete = React.memo((props: DoAutocompleteProps) => {
  const {label, options, onEnter, onDelOption, ...ps} = props

  return (
    <Autocomplete size={"small"} disablePortal freeSolo clearText={"清空"} {...ps} options={options}
                  renderOption={(ops: HTMLAttributes<HTMLElement>, option: string) => {
                    return (
                      <ListItem {...ops}>
                        <ListItemText primary={option} onClick={() => onEnter(option)}/>
                        <IconButton title={"删除选项"} onClick={e => {
                          e.stopPropagation()
                          onDelOption && onDelOption(option)
                        }}>
                          <DeleteIcon/>
                        </IconButton>
                      </ListItem>
                    )
                  }}

                  renderInput={params =>
                    <TextField {...params} label={label} autoFocus
                               onKeyDown={e => {
                                 let keyword = (e.target as HTMLInputElement).value.trim()
                                 // 按回车键开始搜索
                                 if (e.code.toLowerCase() === "enter") {
                                   onEnter(keyword)
                                 }
                               }}
                    />
                  }
    />
  )
})

export default DoAutocomplete
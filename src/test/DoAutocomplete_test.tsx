import {DoAutocomplete} from "../main"
import React, {useState} from "react"
import {Button, Stack} from "@mui/material"

/**
 * 只更新计数时，不重新渲染 DoAutocomplete
 */
export const DoAutocompleteTest = () => {
  const [count, setCount] = useState(0)

  const [options, setOptions] = useState(["选项1", "选项2", "选项3"])

  const handleEnter = React.useCallback((option: string) => alert(`点击了选项 ${option}`), [])

  const handleDel = React.useCallback((option: string) => setOptions(prev => {
    let n = [...prev]
    n.splice(n.findIndex(item => item === option), 1)
    return n
  }), [])

  return (
    <Stack gap={2}>
      <div>{count}</div>
      <Button onClick={() => setCount(prev => ++prev)}>只更新计数时，不重新渲染</Button>

      <DoAutocomplete label={"输入姓名"} options={options} onEnter={handleEnter} onDelOption={handleDel}/>
    </Stack>
  )
}
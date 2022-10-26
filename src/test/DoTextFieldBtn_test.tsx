import {DoTextFieldBtn} from "../main"
import {Button, IconButton, Stack, SvgIcon} from "@mui/material"
import React from "react"
import Visibility from '@mui/icons-material/Visibility'
import DoPasswdField from "../components/DoPasswdField"

export const DoTextFieldBtnTest = () => {
  const [count, setCount] = React.useState(0)

  const [pass, setPass] = React.useState("")

  const handleEnter = React.useCallback((v: string) => console.log(v), [])
  const genSvgIcon = React.useMemo(() => <Visibility/>, [])

  return (
    <Stack padding={1} gap={2}>
      <Stack>
        <div>{count}</div>
        <Button onClick={() => setCount(prev => ++prev)}>只更新计数时，不重新渲染</Button>
      </Stack>

      <DoTextFieldBtn label={"输入框1"} enterNode={"确定"} onEnter={handleEnter}/>
      <DoTextFieldBtn label={"输入框3"} size={"small"} enterNode={genSvgIcon} onEnter={handleEnter}/>

      <DoPasswdField label={"密码"} value={pass} setValue={setPass}/>
    </Stack>
  )
}
import {DoTextFieldBtn} from "../main"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import {IconButton, Stack, SvgIcon} from "@mui/material"
// @ts-ignore
import {ReactComponent as IconSVG} from "../test/icons/settings.svg"
import React from "react"

export const DoTextFieldBtnTest = () => {
  return (
    <Stack>
      <DoTextFieldBtn label={"输入框1"} size={"small"} enterNode={"确定"} onEnter={v => alert(v)}/>
      <DoTextFieldBtn label={"输入框2"} size={"small"} enterNode={<AddOutlinedIcon/>} onEnter={v => alert(v)}/>
      <DoTextFieldBtn label={"输入框3"} size={"small"}
                      enterNode={<IconButton><SvgIcon component={IconSVG} viewBox="0 0 1024 1024"/></IconButton>}
                      onEnter={v => alert(v)}/>
    </Stack>
  )
}
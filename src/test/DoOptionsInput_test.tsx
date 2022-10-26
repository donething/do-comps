import {DoOptionsInput} from "../main"
import React from "react"
import {Button, Stack} from "@mui/material"

const list = [
  {
    label: "平台",
    options: [
      {"title": "哔哩", "value": "bili", "tip": "主播的UID，不是房间号"},
      {"title": "斗鱼", "value": "douyu", "tip": "斗鱼房间号"}
    ]
  },
  {
    label: "地区",
    options: [
      {"title": "国区", "value": "cn", "tip": "国区"},
      {"title": "美区", "value": "us", "tip": "美区"}
    ]
  }
]

export const DoOptionsInputTest = () => {
  const [count, setCount] = React.useState(0)

  const handleEnter = React.useCallback((value: string, sList: string[]) => alert(value), [])

  return (
    <Stack>
      <div>{count}</div>
      <Button onClick={() => setCount(prev => ++prev)}>只更新计数时，不重新渲染</Button>

      <DoOptionsInput size={"small"} optionsList={list} enterNode={"确定"}
                      placeholder={"提示输入"} onEnter={handleEnter}/>
    </Stack>
  )
}

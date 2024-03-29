import {DoListAdd, DoLItemProps, DoOptionsInputProps} from "../main"
import React, {useMemo, useState} from "react"
import {Button, Stack, Switch, SxProps} from "@mui/material"

// 初始数据
const source = [
  {
    id: 1,
    avatar: "https://huyaimg.msstatic.com/avatar/1050/ff/927a25d35eab6729f4cdb59f13ce37_180_135.jpg",
    primary: "hello",
    secondary: "world",
    isMarked: true
  },
  {
    id: 2,
    avatar: "https://huyaimg.msstatic.com/avatar/1050/ff/927a25d35eab6729f4cdb59f13ce37_180_135.jpg",
    primary: "zhang",
    secondary: "san"
  },
  {
    id: 3,
    avatar: "https://huyaimg.msstatic.com/avatar/1050/ff/927a25d35eab6729f4cdb59f13ce37_180_135.jpg",
    primary: "zhang",
    secondary: "san"
  },
  {
    id: 4,
    avatar: "",
    primary: "zhang",
    secondary: "san",
    isNewAdded: true,
    extra: <Stack direction={"row"} alignItems={"center"}>
      <span>测试</span>
      <Switch title={"开关1"}/>
      <Switch title={"开关2"}/>
    </Stack>
  }
]

export const DoListAddTest = () => {
  const [count, setCount] = useState(0)

  const [list, setList] = useState<Array<DoLItemProps>>(source)

  const genSx = useMemo((): SxProps => ({width: 500}), [])
  const genSlot = useMemo((): JSX.Element => (<Button>测试按钮</Button>), [])

  const getInput = useMemo((): DoOptionsInputProps => (
    {
      size: "small",
      enterNode: "确定",
      onEnter(value: string, sList: Array<string>) {
        setList(prev => {
          let n: DoLItemProps = {id: sList[0] + sList[1] + value, primary: value, avatar: ""}
          return [...prev, n]
        })
      },
      optionsList: [{
        label: "平台",
        options: [{"title": "哔哩", "value": "bili", "tip": "主播的UID，不是房间号"}, {
          "title": "斗鱼",
          "value": "douyu",
          "tip": "斗鱼房间号"
        }]
      }, {
        label: "地区",
        options: [{"title": "国区", "value": "cn", "tip": "国区"}, {"title": "俄罗斯", "value": "ru", "tip": "俄罗斯"}]
      }],
      placeholder: "输入框"
    }
  ), [])

  return (
    <Stack direction={"row"} gap={2} height={"100%"}>
      <Stack>
        <div>{count}</div>
        <Button onClick={() => setCount(prev => ++prev)}>只更新计数时，不重新渲染</Button>
      </Stack>

      <DoListAdd sx={genSx} title={"列表"} slot={genSlot} list={list} inputProps={getInput}/>
    </Stack>
  )
}
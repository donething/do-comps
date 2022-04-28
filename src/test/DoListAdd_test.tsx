import {DoListAdd, DoLItemProps, DoOptionsInputProps} from "../main"
import {useEffect, useState} from "react"
import {Stack, Switch} from "@mui/material"

export const DoListAddTest = () => {
  const [list, setList] = useState<Array<DoLItemProps>>([])

  const input: DoOptionsInputProps = {
    size: "small",
    enterNode: "确定",
    onEnter(value: string, sList: Array<string>) {
      alert(`${value}, ${JSON.stringify(sList)}`)
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

  useEffect(() => {
    const init = () => {
      setList(prev => [...prev, {
        id: 1,
        avatar: "https://huyaimg.msstatic.com/avatar/1050/ff/927a25d35eab6729f4cdb59f13ce37_180_135.jpg",
        primary: "hello",
        secondary: "world",
        isMarked: true
      }])
      setList(prev => [...prev, {
        id: 2,
        avatar: "https://huyaimg.msstatic.com/avatar/1050/ff/927a25d35eab6729f4cdb59f13ce37_180_135.jpg",
        primary: "zhang",
        secondary: "san"
      }])
      setList(prev => [...prev, {
        id: 3,
        avatar: "https://huyaimg.msstatic.com/avatar/1050/ff/927a25d35eab6729f4cdb59f13ce37_180_135.jpg",
        primary: "zhang",
        secondary: "san"
      }])
      setList(prev => [...prev, {
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
      }])
    }

    init()
  }, [])

  return (
    <DoListAdd sx={{width: 500}} title={"列表"} list={list} inputProps={input}/>
  )
}
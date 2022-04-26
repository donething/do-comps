import {DoListAdd, DoLItemProps} from "../main"
import {useEffect, useState} from "react"
import {DoOptionsInputProps} from "../main"

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
      setList(prev => [...prev, {id: 1, primary: "hello", secondary: "world", isMarked: true}])
      setList(prev => [...prev, {id: 2, primary: "zhang", secondary: "san"}])
      setList(prev => [...prev, {id: 3, primary: "zhang", secondary: "san"}])
      setList(prev => [...prev, {id: 4, primary: "zhang", secondary: "san", isNewAdded: true}])
    }

    init()
  }, [])

  return (
    <DoListAdd sx={{width: 500}} title={"列表"} list={list} inputProps={input}/>
  )
}
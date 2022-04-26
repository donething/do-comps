import {DoOptionsInput} from "../main"

export const DoOptionsInputTest = () => {
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
  return (
    <DoOptionsInput size={"small"} optionsList={list} enterNode={"确定"}
                    placeholder={"提示输入"} onEnter={v => alert(v)}/>
  )
}

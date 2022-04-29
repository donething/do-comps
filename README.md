# do-comps

使用`yarn build`编译完成后，需要删除`dist/types`文件夹

## 已编写组件

### DoBackupPanel、DoBackupPanelChromium

组件：备份、恢复面板

```jsx
import {DoBackupPanel} from "../main"
import {Stack} from "@mui/material"

export const DoBackupPanelTest = () => {
  return (
    <Stack>
      {/* 不可省略 title、filename */}
      <DoBackupPanel title={"配置"} filename={"data.json"} onClear={() => {
      }} onRead={() => ({})} onRestore={() => {
      }}/>

      {/* 可以省略 title、filename */}
      <DoBackupPanelChromium/>
    </Stack>
  )
}
```

### delRevoke

函数：删除、撤销

```jsx
import {Button} from "@mui/material"
import {useState} from "react"
import {delRevoke, useSharedSnackbar} from "../main"

export const DoDelRevokeTest = () => {
  const [nums, setNums] = useState([1, 2, 3])

  const {showSb} = useSharedSnackbar()

  const list = nums.map((item, index) => <li key={item}>
    <Button onClick={() => delRevoke < Array < number >> (item, nums, () => {
      // 删除
      setNums(prev => {
        let newArray = [...prev]
        newArray.splice(index, 1)
        return newArray
      })
    }, (data) => {
      // 撤销
      setNums(data)
    },
      showSb)}>{item}
    </Button></li>)

  return (
    <ul>
      {list}
    </ul>
  )
}
```

### DoDialog

组件：对话框

```jsx
import {AlertTitle, Button, Stack} from "@mui/material"
import {useSharedDialog} from "../main"

export const DoSnackbarTest = () => {
  const {showSb} = useSharedSnackbar()
  const {showDialog} = useSharedDialog()

  return (
    <Stack>
      <Button onClick={() => showDialog({
        open: true, title: "标题", message: "消息1。", content: <Button>测试按钮</Button>
      })}>
        打开 Dialog1
      </Button>

      <Button onClick={() => showDialog({
        open: true, title: "标题", message: "消息2。",
        modal: true,
        action: <Button onClick={() => showDialog({open: false})}>确定</Button>
      })}>
        打开 Dialog2
      </Button>

      <Button onClick={() => showDialog({
        open: true, title: "标题", message: "消息3。", fullWidth: true
      })}>
        打开 Dialog3
      </Button>
    </Stack>
  )
}
```

### DoListAdd

组件：含添加新项的列表

```jsx
import {DoListAdd, DoLItemProps} from "../main"
import {useEffect, useState} from "react"
import {DoOptionsInputProps} from "../main"

export const DoListAddTest = () => {
  const [list, setList] = useState < Array < DoLItemProps >> ([])

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
```

### DoOptionsInput

组件：带选择框（可多个）的输入面板

```jsx
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
```

### DoSnackbar

组件：提示消息

全局引用`<DoSnackbar/>`，再在需要的地方修改显示`showSb({open: true, message: "消息1。"})`：

```jsx
import {DoSnackbar, useSharedSnackbar} from "./main"

function App() {
  const {showSb} = useSharedSnackbar()

  return (
    <Stack>
      <DoSnackbar/>

      <Button onClick={() => showSb({open: true, message: "消息1。"})}>
        打开 Snakebar1
      </Button>

      <Button onClick={() => showSb({open: true, message: "消息2。"})}>
        打开 Snakebar2
      </Button>
    </Stack>
  )
}
```

### DoSvgIcon

组件：图标

可以将`SVG`文件缩放为适应父组件的大小，在需要的地方引用`<DoSvgIcon svg={IconSettings}/>`：

```jsx
import {DoSvgIcon} from "./main"
// webpack 中
import {ReactComponent as IconSettings} from "./test/icons/settings.svg"
// snowpack 中可配合`snowpack-plugin-svgr`插件使用

function App() {
  return (
    <Stack>
      <DoSvgIcon svg={IconSettings}/>
    </Stack>
  )
}
```

### DoTextFieldBtn

组件：带确认按钮的文本输入框

```jsx
import {DoTextFieldBtn} from "../main"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import {IconButton, Stack, SvgIcon} from "@mui/material"
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
```

### DoPanel

组件：默认固定高度为窗口高度，分 3 层的垂直面板，中间内容区可滚动

可通过指定属性`isRow`，转为水平布局的面板

```jsx
import {DoPanel} from "../main"
import {Button} from "@mui/material"

export const DoVpanelTest = () => {
  const v = Array.from(Array(100).keys()).map(item => <li key={item}>{item}</li>)
  return (
    <DoPanel title={"垂直面板垂直面板垂直面板垂直面板"}
              slot={<Button onClick={() => alert("按钮！")}>按钮</Button>}
              content={<ul>{v}</ul>}
              footer={<span>底部</span>}
              sx={{width: 250}}
    />
  )
}
```

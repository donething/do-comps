# do-comps

发布：使用`yarn build`编译完成后，需要**删除**`dist`文件夹下除了`main.*`以外的所有文件
文件夹

使用：在其它工程引用本库时，`import`的来源应为`do-comps`，不可以含路径，如`do-comps/dist/main`。

正确的引用语句：
```ts
import {DoAutocomplete, useSharedBackdrop, DoList, useSharedSnackbar} from "do-comps"
```

# 已编写组件

## DoBackupPanel、DoBackupPanelChromium

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

## delRevoke

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

## DoSnackbar

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

## DoDialog

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

## DoDrawer

组件：抽屉组件

```jsx
import {DoDrawer, useSharedDrawer} from "../main"

function App() {
  const {showDoDrawer} = useSharedDrawer()

  return (
    <Stack>
      <DoDrawer/>

      <Button onClick={() => showDrawer({open: true, content: "测试抽屉"})}>
        打开 Drawer
      </Button>
    </Stack>
  )
}
```

## DoBackdrop

组件：蒙版组件

```jsx
import {DoBackdrop, useSharedBackdrop} from "../main"

function App() {
  const {showDoBackdrop} = useSharedDrawer()

  return (
    <Stack>
      <DoBackdrop/>

      <Button onClick={() => showBackdrop({
        open: true,
        onClick: () => showBackdrop({open: false})
      })}>
        显示蒙版
      </Button>
    </Stack>
  )
}
```

## DoList

组件：列表组件，滑动到上下两端时可加载更多数据

```jsx
import {useState} from "react"
import {DoList} from "../main"
import {ListItem} from "@mui/material"

export const DoListTest = () => {
  const step = 20
  const [list, setList] = useState([...Array(step).keys()])

  return (
    <DoList width={"450px"} height={"100%"} border={"#AAA solid 1px"}
            content={
              list.map(item => <ListItem>{item}</ListItem>)
            }
            onLoadNext={() => {
              setList(prev => [...prev, ...Array(step).keys()])
            }}
            onLoadPrev={() => {
              setList(prev => [...Array(step).keys(), ...prev])
            }}
    />
  )
}
```

## DoListAdd

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

## DoOptionsInput

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

## DoSvgIcon

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

## DoTextFieldBtn

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

## DoPanel

组件：默认固定高度为窗口高度，分 3 层的垂直面板，中间内容区可滚动

可通过指定属性`isRow`，转为水平布局的面板

```jsx
import {DoPanel, DoPanelContent, DoPanelFooter, DoPanelHeader} from "../main"

export const DoVpanelTest = () => {
  const v = Array.from(Array(100).keys()).map(item => <li key={item}>{item}</li>)
  return (
    <DoPanel>
      <DoPanelHeader divider={true}>标题</DoPanelHeader>
      <DoPanelContent>{v}</DoPanelContent>
      <DoPanelFooter divider={true}>底部</DoPanelFooter>
    </DoPanel>
  )
}
```

## DoText

组件：可设置行数的文本组件

```jsx
import DoText from "../components/DoText"
import {Stack} from "@mui/material"

export const DoTextTest = () => {
  return (
    <Stack spacing={3}>
      <DoText sx={{color: "green", borderBottom: 1}} lines={2}>是的，它是一个比率</DoText>
    </Stack>
  )
}
```

## DoFileUpload

组件：文件上传组件

基础用法：

```jsx
import {DoFileUpload} from "../main"
import {Button, Stack} from "@mui/material"

export const DoFileUploadTest = () => {
  return (
    <Stack>
      <Button onClick={() => {
        (document.querySelector("#abc")as HTMLElement).click()
      }}>上传文件</Button>

      <DoFileUpload id={"abc"} apiURL={"https://example.com/upload"}/>
    </Stack>
  )
}
```

高级用法

当需要传递请求头`headers`，而值需要通过`await`异步获取时，可以使用`setState`，在点击了`Button`时更新`setHeaders`即可

## DoAutocomplete

组件：自动完成输入框组件

```jsx
import {DoAutocomplete} from "../main"
import {useState} from "react"

export const DoAutocompleteTest = () => {
  const [options, setOptions] = useState(["选项1", "选项2", "选项3"])

  return (
    <DoAutocomplete label={"输入姓名"} options={options}
                    onEnter={option => alert(`点击了选项${option}`)}

                    onDelOption={option => {
                      setOptions(prev => {
                        let n = [...prev]
                        n.splice(n.findIndex(item => item == option), 1)
                        return n
                      })
                    }}/>
  )
}
```

# 新添加组件的步骤

## 新建源码文件

在`src/components`目录下，新建组件文件，格式为`.tsx`

## 编写组件

完成后，并导出`组件`、`props属性类型`、`useShared*`（可选）

```jsx
   // 属性类型
   export type DoBackdropProps = {
      // 是否显示
      open: Boolean
   }
   
   // 在其它地方共享
   export const useSharedBackdrop = () => useBetween(useBackdrop)
   
   // 导出组件
   export default DoBackdrop
```

## 再次导出组件

在`main.tsx`中再次统一导出。如果自动提示无效，可以手动输入组件路径导出

```jsx
   import DoBackdrop, {DoBackdropProps, useSharedBackdrop} from "./components/DoBackdrop"
   
   export {DoBackdrop, useSharedBackdrop}
   export type {DoBackdropProps}
```

### 测试组件

1. 在`test`文件夹中新建测试文件`DoSnackbar_test.tsx`，编写使用对应组件的代码
2. 在`index.tsx`文件中添加第一步中测试组件的路由。如果该组件是全局组件，可以在`Router`上面一层全局引用
    ```jsx
   <Route path="/DoSnackbar_Dialog" element={<DoSnackbarTest/>}/>
   ```
3. 在`App.tsx`文件中添加路由的入口，注意`to`对应上步的`path`
    ```jsx
   <Link to={"DoSnackbar_Dialog"}><Button size={"large"}>DoSnackbar_Dialog</Button></Link>
   ```
4. 执行`yarn start`点击入口，测试功能

## 编译

1. 执行`yarn build`

## 发布

1. 根据文档开头的提示，删除不必要的文件、文件夹
2. 修改`package.json`中的版本信息`version`
3. 执行`npm publish`，推送到仓库
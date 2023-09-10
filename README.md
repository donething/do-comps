# do-comps

发布：使用`yarn build`编译完成后，只需发布`dist/main.*`文件到`npm`。由于已在`package.json`的`files`属性中配置，不需要手动删除`dist`中的其它文件

使用：在其它工程引用本库时，`import`的来源应为`do-comps`，不可以含路径，如`do-comps/dist/main`。

正确的引用语句：
```ts
  import {DoAutocomplete, useSharedBackdrop, DoList, useSharedSnackbar} from "do-comps"
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

# 已编写组件

## DoBackupPanel、DoBackupPanelChromium

组件：备份、恢复面板

```jsx
  const handleClear = React.useCallback(() => {}, [])

  const handleRead = React.useCallback(async () => ({a: 123, b: "test."}), [])

  const handleRestore = React.useCallback(() => {}, [])

  return (
    <Stack>
       <DoBackupPanel title={"配置"} filename={"data.json"} onClear={handleClear}
                      onRead={handleRead} onRestore={handleRestore}/>

       {/* 需要在 chromium 扩展中引用才不报错 */}
       {/*<DoBackupPanelChromium/>*/}
    </Stack>
  )
```

## DoSnackbar

组件：提示消息

全局引用`<DoSnackbar/>`，再在需要的地方修改显示`showSb({open: true, message: "消息1。"})`：

```jsx
  const {showSb} = useSharedSnackbar()

  return (
    <Stack>
       <DoSnackbar/>

       <Button onClick={() => showSb({open: true, message: "消息1。"})}>打开 Snakebar1</Button>
     
       <Button onClick={() => showSb({open: true, message: "消息2。"})}>打开 Snakebar</Button>
    </Stack>
)
```

## DoDialog

组件：对话框

```jsx
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
```

## DoDrawer

组件：抽屉组件

```jsx
  const {showDoDrawer} = useSharedDrawer()

  return (
   <Stack>
      <DoDrawer/>

      <Button onClick={() => showDrawer({open: true, content: "测试抽屉"})}>
        打开 Drawer
      </Button>
    </Stack>
  )
```

## DoBackdrop

组件：蒙版组件

```jsx
  const {showDoBackdrop} = useSharedDrawer()

  return (
    <Stack>
       <DoBackdrop/>

       <Button onClick={() => showBackdrop({open: true, onClick: () => showBackdrop({open: false})})}>
          显示蒙版
       </Button>
    </Stack>
  )
```

## DoList

组件：列表组件，滑动到上下两端时可加载更多数据

```jsx
// 每次产生的数据
  const step = 20

  const [list, setList] = useState([...Array(step).keys()])

  const genContent = React.useMemo(() => list.map(item => <ListItem key={item + Math.random()}>{item}</ListItem>), [list])

  const handleLoadNext = React.useCallback(() => {
    setList(prev => [...prev, ...Array(step).keys()])
  }, [])

  const handleLoadPrev = React.useCallback(() => {
    setList(prev => [...Array(step).keys(), ...prev])
  }, [])

  return (
    <Stack direction={"row"} gap={2} height={"100%"}>
       <Stack>
          <div>{count}</div>
          <Button onClick={() => setCount(prev => ++prev)}>只更新计数时，不重新渲染 DoAutocomplete</Button>
       </Stack>

       <DoList width={"450px"} height={"100%"} border={"#AAA solid 1px"} 
               content={genContent} 
               onLoadNext={handleLoadNext} 
               onLoadPrev={handleLoadPrev}
       />
    </Stack>
  )
```

## DoListAdd

组件：含添加新项的列表

```jsx
// 组件外
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

  // 组件中
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
```

## DoOptionsInput

组件：带选择框（可多个）的输入面板

```jsx
  // 组件外
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

  // 组件中
  const handleEnter = React.useCallback((value: string, sList: string[]) => alert(value), [])

  return (
    <Stack>
       <Button onClick={() => setCount(prev => ++prev)}>只更新计数时，不重新渲染</Button>
       
       <DoOptionsInput size={"small"} optionsList={list} enterNode={"确定"} 
                       placeholder={"提示输入"} onEnter={handleEnter}/>
    </Stack>
  )
```

## DoTextFieldBtn

组件：带确认按钮的文本输入框

```jsx
  const handleEnter = React.useCallback((v: string) => console.log(v), [])
  const genSvgIcon = React.useMemo(() => <Visibility/>, [])

  return (
    <Stack padding={1} gap={2}>
       <DoTextFieldBtn label={"输入框1"} enterNode={"确定"} onEnter={handleEnter} clearAfterEnter/>
       <DoTextFieldBtn label={"输入框3"} size={"small"} enterNode={genSvgIcon} onEnter={handleEnter}/>
    </Stack>
  )
```

## DoPasswdField

组件：密码输入框，可明文显示输入的密码

```jsx
  const [pass, setPass] = React.useState("")

  return (
    <DoPasswdField label={"密码"} value={pass} setValue={setPass}/>
  )
```

## DoPanel

组件：默认固定高度为窗口高度，分 3 层的垂直面板，中间内容区可滚动

可通过指定属性`isRow`，转为水平布局的面板

```jsx
  const v = React.useMemo(() => 
        Array.from(Array(100).keys()).map(item => <li key={item}>{item}</li>), [])

  const genDivider = React.useMemo(() => <Divider/>, [])

  // 如果直接作为 children 组件放在 DoPanel 中，
  // 每次当前组件更新时，传递到 DoPanel 的 children 组件的引用都不不一样
  // 可能导致不必要的更新
  // 所以使用`useMemo`生成
  const genChild = React.useMemo(() => (<>
     <DoPanelHeader divider={genDivider}>
        <DoTextTitle>标题</DoTextTitle>
        <Button>按钮</Button>
     </DoPanelHeader>
     <DoPanelContent component={"ul"}>{v}</DoPanelContent>
     <DoPanelFooter divider={genDivider}>底部</DoPanelFooter>
  </>), [v, genDivider])

  return (
    <DoPanel divider={genDivider} width={"500px"}>
       {genChild}
    </DoPanel>
  )
```

## DoText

组件：可设置行数的文本组件

```jsx
  const handleTitleClick = React.useCallback(() => console.log("点击了标题"), [])

  return (
    <Stack gap={2}>
       <DoTextTitle onClick={handleTitleClick}>测试标题</DoTextTitle>

       <DoText lines={2} color={"green"}>是的，它是一个比率：1.5 表示元素字体大小的 1.5 倍。所以它的含义与
          相同，但有一个重要例外：在继承中，当使用纯数字时，继承的是数字，而不是计算值。 因此，如果您有一个字体大小为 24pt
       </DoText>

       <DoText>
          but the problem is that this code makes everything in one-line. I want to go with 3 lines of text then... I
          in the Google about it and I find out we have a WebKit for it
       </DoText>
    </Stack>
  )
```

## DoFileUpload

组件：文件上传组件

基础用法：

```jsx
  const handleUpoad = React.useCallback((name: string) => {
    console.log("开始上传文件：", name)
  }, [])

  return (
    <Stack>
       <Button onClick={() => {
         (document.querySelector("#abc") as HTMLElement).click()
       }}>上传文件</Button>

       <DoFileUpload id={"abc"} apiURL={""} onUpload={handleUpoad}/>
    </Stack>
  )
```

高级用法

当需要传递请求头`headers`，而值需要通过`await`异步获取时，可以使用`setState`，在点击了`Button`时更新`setHeaders`即可

## DoAutocomplete

组件：自动完成输入框组件

```jsx
  const [options, setOptions] = useState(["选项1", "选项2", "选项3"])

  const handleEnter = React.useCallback((option: string) => alert(`点击了选项 ${option}`), [])

  const handleDel = React.useCallback((option: string) => setOptions(prev => {
    let n = [...prev]
     n.splice(n.findIndex(item => item === option), 1)
     return n
  }), [])

  return (
    <DoAutocomplete label={"输入姓名"} options={options} onEnter={handleEnter} onDelOption={handleDel}/>
  )
```

## delRevoke、delRevokeArray

函数：删除、撤销

```jsx
  const [nums, setNums] = useState([1, 2, 3])
  const [nums2, setNums2] = useState([19, 21, 32])

  const {showSb} = useSharedSnackbar()

  const list1 = nums.map((item, index) => <li key={item}>
     <Button onClick={() => delRevoke<Array<number>>(item, nums, () => {
        // 删除
        setNums(prev => {
          let newArray = [...prev]
           newArray.splice(index, 1)
           return newArray
         })
     }, (data) => {
        // 撤销
        setNums(data)
    }, showSb)}>{item}
    </Button>
  </li>)

  const list2 = nums2.map((item) => <li key={item}>
     <Button onClick={() => delRevokeArray<number>(item, showSb, item, nums2,
                   (d1, d2) => d1 === d2,
                   newDataList => setNums2(newDataList)
    )}>{item}
    </Button>
  </li>)

  return (
    <Stack spacing={3}>
       <ul>{list1}</ul>
       
      <ul>{list2}</ul>
    </Stack>
  )
```
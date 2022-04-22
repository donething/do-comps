# do-comps

使用`yarn build`编译完成后，需要删除`dist/types`文件夹

## 已编写组件

### DoSnackbar
全局引用`<DoSnackbar/>`，再在需要的地方修改显示`showSb({open: true, message: "消息1。"})`：

``` typescript
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

在需要的地方引用`<DoSvgIcon svg={IconSettings}/>`：

```typescript
import {DoSvgIcon} from "./main"
import {ReactComponent as IconSettings} from "./test/icons/settings.svg"

function App() {
  return (
    <Stack>
      <DoSvgIcon svg={IconSettings}/>
    </Stack>
  )
}
```
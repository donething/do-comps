import {DoBackupPanel} from "../main"
import {Button, Stack} from "@mui/material"
import React from "react"

export const DoBackupPanelTest = () => {
  const [count, setCount] = React.useState(0)

  const handleClear = React.useCallback(() => {
  }, [])

  const handleRead = React.useCallback(async () => ({a: 123, b: "test."}), [])

  const handleRestore = React.useCallback(() => {
  }, [])

  return (
    <Stack>
      <div>{count}</div>
      <Button onClick={() => setCount(prev => ++prev)}>只更新计数时，不重新渲染测试组件</Button>

      <DoBackupPanel title={"配置"} filename={"data.json"} onClear={handleClear}
                     onRead={handleRead} onRestore={handleRestore}/>

      {/* 需要在 chromium 扩展中引用才不报错 */}
      {/*<DoBackupPanelChromium/>*/}
    </Stack>
  )
}
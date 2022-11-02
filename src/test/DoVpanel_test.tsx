import {DoPanel, DoPanelContent, DoPanelFooter, DoPanelHeader, DoTextTitle} from "../main"
import {Button, Divider, Stack} from "@mui/material"
import React from "react"

export const DoVpanelTest = () => {
  const [count, setCount] = React.useState(0)

  const v = React.useMemo(() =>
    Array.from(Array(100).keys()).map(item => <li key={item}>{item}</li>), [])

  const genDivider = React.useMemo(() => <Divider/>, [])

  const genChild = React.useMemo(() => (<>
    <DoPanelHeader divider={genDivider}>
      <DoTextTitle>标题</DoTextTitle>
      <Button>按钮</Button>
    </DoPanelHeader>
    <DoPanelContent component={"ul"}>{v}</DoPanelContent>
    <DoPanelFooter divider={genDivider}>底部</DoPanelFooter>
  </>), [v, genDivider])

  return (
    <Stack direction={"row"} gap={2} height={"100%"}>
      <Stack>
        <div>{count}</div>
        <Button onClick={() => setCount(prev => ++prev)}>只更新计数时，不重新渲染</Button>
        {/* 不用DIV包围会导致文本垂直不居中 */}
        <div><Divider>分割线</Divider></div>
      </Stack>

      <DoPanel divider={genDivider} width={"500px"}>
        {genChild}
      </DoPanel>
    </Stack>
  )
}
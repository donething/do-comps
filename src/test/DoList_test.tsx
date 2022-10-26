import React, {useState} from "react"
import {DoList} from "../main"
import {Button, ListItem, Stack} from "@mui/material"

export const DoListTest = () => {
  // 每次产生的数据
  const step = 20

  const [count, setCount] = useState(0)

  const [list, setList] = useState([...Array(step).keys()])

  const genContent = React.useMemo(() => list.map(item => <ListItem
    key={item + Math.random()}>{item}</ListItem>), [list])

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
        <Button onClick={() => setCount(prev => ++prev)}>只更新计数时，不重新渲染</Button>
      </Stack>

      <DoList width={"450px"} height={"100%"} border={"#AAA solid 1px"}
              content={genContent}
              onLoadNext={handleLoadNext}
              onLoadPrev={handleLoadPrev}
      />
    </Stack>
  )
}
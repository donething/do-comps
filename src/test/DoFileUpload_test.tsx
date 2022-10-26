import {DoFileUpload} from "../main"
import {Button, Stack} from "@mui/material"
import React from "react"

export const DoFileUploadTest = () => {
  const [count, setCount] = React.useState(0)

  const handleUpoad = React.useCallback((name: string) => {
    console.log("开始上传文件：", name)
  }, [])

  return (
    <Stack>
      <div>{count}</div>
      <Button onClick={() => setCount(prev => ++prev)}>只更新计数时，不重新渲染</Button>

      <Button onClick={() => {
        (document.querySelector("#abc") as HTMLElement).click()
      }}>上传文件</Button>

      <DoFileUpload id={"abc"} apiURL={""} onUpload={handleUpoad}/>
    </Stack>
  )
}
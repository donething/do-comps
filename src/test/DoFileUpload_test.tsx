import {DoFileUpload} from "../main"
import {Button, Stack} from "@mui/material"

export const DoFileUploadTest = () => {
  return (
    <Stack>
      <Button onClick={() => {
        (document.querySelector("#abc") as HTMLElement).click()
      }}>上传文件</Button>

      <DoFileUpload id={"abc"} apiURL={""}/>
    </Stack>
  )
}
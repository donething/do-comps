import {DoBackupPanel} from "../main"
import {Stack} from "@mui/material"

export const DoBackupPanelTest = () => {
  return (
    <Stack>
      <DoBackupPanel title={"配置"} filename={"data.json"} onClear={() => {
      }} onRead={() => ({})} onRestore={() => {
      }}/>

      {/*<DoBackupPanelChromium/>*/}
    </Stack>
  )
}
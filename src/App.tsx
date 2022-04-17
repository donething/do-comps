import {Button, Stack} from "@mui/material"
import {DoSnackbar, DoSvgIcon, useSharedSnackbar} from "./main"
// @ts-ignore why?
import {ReactComponent as IconSettings} from "./test/icons/settings.svg"

function App() {
  const {showSb} = useSharedSnackbar()

  return (
    <Stack>
      <DoSnackbar/>

      <DoSvgIcon svg={IconSettings}/>

      <Button onClick={() => showSb({open: true, message: "消息1。"})}>
        打开 Snakebar1
      </Button>

      <Button onClick={() => showSb({open: true, message: "消息2。"})}>
        打开 Snakebar2
      </Button>
    </Stack>
  )
}

export default App

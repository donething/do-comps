import {Button, Stack} from "@mui/material"
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

export default App

import {Button, Stack} from "@mui/material"
import {Link} from "react-router-dom"

function App() {
  return (
    <Stack alignItems={"center"} gap={1}
           sx={{width: "100%", height: "100%", bgcolor: "background.paper", paddingTop: 10}}>
      <Link to={"DoSnackbar_Dialog"}><Button size={"large"}>DoSnackbar_Dialog</Button></Link>
      <Link to={"DoVpanel"}><Button size={"large"}>DoVpanel</Button></Link>
      <Link to={"DoTextFieldBtn"}><Button size={"large"}>DoTextFieldBtn</Button></Link>
      <Link to={"DoOptionsInput"}><Button size={"large"}>DoOptionsInput</Button></Link>
      <Link to={"DoListAdd"}><Button size={"large"}>DoListAdd</Button></Link>
      <Link to={"DoBackupPanel"}><Button size={"large"}>DoBackupPanel</Button></Link>
      <Link to={"DoDelRevoke"}><Button size={"large"}>DoDelRevoke</Button></Link>
      <Link to={"DoText"}><Button size={"large"}>DoText</Button></Link>
      <Link to={"DoFileUpload"}><Button size={"large"}>DoFileUpload</Button></Link>
      <Link to={"DoList"}><Button size={"large"}>DoList</Button></Link>
      <Link to={"DoAutocomplete"}><Button size={"large"}>DoAutocomplete</Button></Link>
    </Stack>
  )
}

export default App

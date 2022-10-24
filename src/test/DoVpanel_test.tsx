import {DoPanel, DoPanelContent, DoPanelFooter, DoPanelHeader} from "../main"
import {Divider} from "@mui/material"

export const DoVpanelTest = () => {
  const v = Array.from(Array(100).keys()).map(item => <li key={item}>{item}</li>)
  return (
    <DoPanel divider={<Divider/>}>
      <DoPanelHeader divider={<Divider/>}>标题</DoPanelHeader>
      <DoPanelContent component={"ul"}>{v}</DoPanelContent>
      <DoPanelFooter divider={<Divider/>}>底部</DoPanelFooter>
    </DoPanel>
  )
}
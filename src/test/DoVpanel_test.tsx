import {DoPanel, DoPanelContent, DoPanelFooter, DoPanelHeader} from "../main"

export const DoVpanelTest = () => {
  const v = Array.from(Array(100).keys()).map(item => <li key={item}>{item}</li>)
  return (
    <DoPanel>
      <DoPanelHeader divider={true}>标题</DoPanelHeader>
      <DoPanelContent alignContent={"space-between"}>{v}</DoPanelContent>
      <DoPanelFooter divider={true}>底部</DoPanelFooter>
    </DoPanel>
  )
}
import {DoPanel} from "../main"
import {Button} from "@mui/material"

export const DoVpanelTest = () => {
  const v = Array.from(Array(100).keys()).map(item => <li key={item}>{item}</li>)
  return (
    <DoPanel sx={{width: 300}} header={{
      title: "垂直面板垂直面板垂直面板垂直面板", action: <Button onClick={() => alert("按钮！")}>按钮</Button>
    }} content={v} footer={<span>底部</span>}/>
  )
}
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon, ListItemText,
  Toolbar,
  Typography
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import React, {Fragment, useState} from "react"
import {
  CloudDoneOutlined,
  PlaylistAddCheckOutlined,
  TuneOutlined,
  AudiotrackOutlined,
} from "@mui/icons-material"

// 应用导航信息
const navInfo = [
  {name: "音乐搜索", router: "music", icon: <AudiotrackOutlined/>},
  {name: "文件管理", router: "fserver", icon: <CloudDoneOutlined/>},
  {name: "任务状态", router: "tasks", icon: <PlaylistAddCheckOutlined/>},
  {name: "设置选项", router: "settings", icon: <TuneOutlined/>}
]

// 顶部应用栏，可点击显示应用菜单
const DoAppbar = () => {
  // 标题栏
  const [title, setTitle] = useState("首页")
  // 侧边栏是否开启
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <AppBar position="fixed" elevation={3}>
        <Toolbar variant={"dense"}>
          <IconButton size="large" edge="start" color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon/>
          </IconButton>

          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        <List>
          {navInfo.map((item, index) =>
            <ListItemButton key={index} onClick={() => {
              window.location.href = `/#/${item.router}`
              document.title = item.name
              setTitle(item.name)
              setOpen(false)
            }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name}/>
            </ListItemButton>)
          }
        </List>
      </Drawer>
    </Fragment>
  )
}

export default DoAppbar
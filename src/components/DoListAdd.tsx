import React from "react"
import {
  Avatar, Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText, Theme,
} from "@mui/material"
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import {DoOptionsInput, DoOptionsInputProps, DoVPanel} from "../main"
import {SxProps} from "@mui/system"

// 列表项的参数
export type DoLItemProps = {
  // 唯一 ID
  id: string | number
  // 主内容，可以是组件，如 <A>
  primary: React.ReactNode
  // 描述
  secondary?: React.ReactNode
  // 头像
  avatar?: string
  // 头像样式，其中宽、高度默认为 36
  avatarSx?: SxProps<Theme>

  // 项目间的分隔符
  divider?: boolean

  // 需要特殊标记（如在线、限免，背景变色）
  isMarked?: boolean
  // 是否为新添加的项（背景变色）
  isNewAdded?: boolean

  // 其它按钮
  extra?: Array<React.ReactNode>

  // 点击了删除按钮的回调
  onDel?: () => void
}

// 生成列表项
const LItem = (props: DoLItemProps): JSX.Element => {
  return (
    <ListItem component={"li"} divider alignItems={"center"}
              sx={{
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 1,
                paddingRight: 1,
                bgcolor: props.isNewAdded ? "#FFFFCC" : props.isMarked ? "#99CC99" : "inherit"
              }}
    >
      {
        // 头像
        props.avatar && <ListItemAvatar>
          <Avatar sx={{width: 36, height: 36, ...props.avatarSx}} src={props.avatar}/>
        </ListItemAvatar>
      }

      {/* 内容 */}
      <ListItemText primary={props.primary} secondary={props.secondary}/>

      {
        // 删除
        props.onDel && <IconButton color={"warning"} aria-label="删除" onClick={_ => props.onDel && props.onDel()}>
          <HighlightOffOutlinedIcon sx={{width: 28, height: 28}}/>
        </IconButton>
      }
    </ListItem>
  )
}

// 可添加新项的列表组件的属性
export type DoListAddProps = {
  // 面板头的标题
  title: string
  // 面板头右边的操作区域
  slot?: JSX.Element

  // 展示的数据
  list: Array<DoLItemProps>

  // 输入框的属性
  inputProps?: DoOptionsInputProps

  // CSS
  sx?: SxProps<Theme>
}

/**
 * 可添加新项的列表组件
 *
 * 顶部为卡片头，中部为列表以显示数据，底部为数据添加面板
 */
const DoListAdd = (props: DoListAddProps): JSX.Element => {
  return (
    <DoVPanel sx={props.sx} title={props.title} slot={props.slot} content={
      <Box component={"ul"}>
        {props.list.map(item => <LItem key={item.id} {...item}/>)}
      </Box>
    } footer={props.inputProps ? (<DoOptionsInput {...props.inputProps}/>) : undefined}
    />
  )
}

export default DoListAdd
import React from "react"
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText, SxProps, Theme} from "@mui/material"
import DoOptionsInput, {DoOptionsInputProps} from "./DoOptionsInput"
import DoPanel, {DoPanelHeader, DoPanelContent, DoPanelFooter} from "./DoPanel"
import {DoTextTitle} from "./DoText"
import {alpha} from '@mui/material/styles'

/**
 * 列表子项的属性
 */
export type DoLItemProps = {
  /**
   * 唯一 ID，用于指定`key`属性
   */
  id: string | number
  /**
   * 主要内容，可以是组件，如`Stack`
   */
  primary: React.ReactNode
  /**
   * 描述内容，可以是组件，如`Stack`
   */
  secondary?: React.ReactNode
  /**
   * 头像，为 undefined 时不渲染（此时头像不占空间）
   */
  avatar?: string
  /**
   * 头像样式，其中宽、高度默认为 36 px
   */
  avatarSx?: SxProps<Theme>
  /**
   * 项目间是否有分隔符
   */
  divider?: boolean
  /**
   * 需要特殊标记（如在线、限免），背景会变色
   */
  isMarked?: boolean
  /**
   * 是否为新添加的项（背景变色）
   */
  isNewAdded?: boolean
  /**
   * 其它工具按钮，在子项的右侧显示
   */
  extra?: React.ReactNode
}

// 生成列表项
const LItem = (props: DoLItemProps): JSX.Element => {
  return (
    <ListItem component={"li"} divider={props.divider} alignItems={"center"}
              sx={{
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 1,
                paddingRight: 1,
                bgcolor: props.isNewAdded ? alpha("#FFFFCC", 0.6) :
                  props.isMarked ? alpha("#99CC99", 0.6) :
                    "inherit"
              }}
    >
      {
        // 头像
        props.avatar !== undefined && <ListItemAvatar sx={{minWidth: 0, marginRight: 1}}>
          <Avatar src={props.avatar} sx={{width: 36, height: 36, ...props.avatarSx}}/>
        </ListItemAvatar>
      }

      {/* 内容 */}
      <ListItemText primary={props.primary} secondary={props.secondary}/>

      {/* 操作按钮 */}
      {props.extra}
    </ListItem>
  )
}

/**
 * 列表组件的属性
 */
export type DoListAddProps = {
  /**
   * 面板的标题
   */
  title: string
  /**
   * 面板头右边的操作按钮
   */
  slot?: React.ReactNode
  /**
   * 需要展示的列表数据
   */
  list: Array<DoLItemProps>
  /**
   * 输入框的属性
   */
  inputProps?: DoOptionsInputProps
  /**
   * 面板的样式
   */
  sx?: SxProps<Theme>
}

/**
 * 可添加项目的列表组件
 *
 * 顶部为卡片头，中部为列表以显示数据，底部为添加项目的工具栏
 */
const DoListAdd = React.memo((props: DoListAddProps): JSX.Element => {
  return (
    <DoPanel sx={props.sx} divider={<Divider/>}>
      <DoPanelHeader>
        <DoTextTitle>{props.title}</DoTextTitle>
        {props.slot}
      </DoPanelHeader>

      <DoPanelContent component={"ul"}>
        {props.list.map(item => <LItem key={item.id} {...item}/>)}
      </DoPanelContent>

      <DoPanelFooter marginBottom={1}>
        {props.inputProps ? (
          <DoOptionsInput clearAfterEnter={true} {...props.inputProps}/>) : undefined
        }
      </DoPanelFooter>
    </DoPanel>
  )
})

export default DoListAdd
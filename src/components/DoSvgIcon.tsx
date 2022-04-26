import SvgIcon from "@mui/material/SvgIcon"
import React, {MouseEventHandler} from "react"
import {OverridableStringUnion} from '@mui/types'

// 图标的属性
export type DoSvgIconProps = {
  svg: React.ElementType,
  size?: OverridableStringUnion<'inherit' | 'large' | 'medium' | 'small'>,
  title?: string,
  viewBox?: string,
  onClick?: MouseEventHandler<HTMLElement>
}

// 生成 Icon 图标
const DoSvgIcon = (
  {
    svg,
    title,
    size = "inherit",
    viewBox = "0 0 1024 1024",
    onClick,
  }: DoSvgIconProps
) => {
  // 需要指定 viewBox 参数，不然显示错位
  return (
    <SvgIcon component={svg} title={title} viewBox={viewBox} fontSize={size} onClick={onClick}/>
  )
}

export default DoSvgIcon
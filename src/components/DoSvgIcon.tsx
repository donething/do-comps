import SvgIcon from "@mui/material/SvgIcon"
import React, {FC, MouseEventHandler} from "react"
import {OverridableStringUnion} from '@mui/types'

export interface DoSvgIconProps {
  svg: React.ElementType,
  size?: OverridableStringUnion<'inherit' | 'large' | 'medium' | 'small'>,
  title?: string,
  viewBox?: string,
  onClick?: MouseEventHandler<HTMLElement>
}

// 生成 Icon 图标
const DoSvgIcon: FC<DoSvgIconProps> = (
  {
    svg,
    title,
    size = "inherit",
    viewBox = "0 0 1024 1024",
    onClick,
  }
) => {
  // 需要指定 viewBox 参数，不然显示错位
  return (
    <SvgIcon component={svg} title={title} viewBox={viewBox} fontSize={size} onClick={onClick}/>
  )
}

export default DoSvgIcon
import SvgIcon from "@mui/material/SvgIcon"
import React, {MouseEventHandler} from "react"
import {OverridableStringUnion} from '@mui/types'

/**
 * 图标的属性
 */
export type DoSvgIconProps = {
  /**
   * SVG 对象
   */
  svg: React.ElementType,
  /**
   * 大小
   */
  size?: OverridableStringUnion<'inherit' | 'large' | 'medium' | 'small'>,
  /**
   * 悬浮时的提示
   */
  title?: string,
  /**
   * 需要和实际SVG文件一致，才能完整显示SVG文件的内容，不错位
   */
  viewBox?: string,
  /**
   * 点击的回调
   */
  onClick?: MouseEventHandler<HTMLElement>
}

/**
 * 图标
 *
 * `import icon from "icon.svg"`
 *
 * `<DoSvgIcon svg={icon}/>`
 */
const DoSvgIcon = ({svg, title, size = "inherit", viewBox = "0 0 1024 1024", onClick,}: DoSvgIconProps) => {
  // 需要指定 viewBox 参数，不然显示错位
  return (
    <SvgIcon component={svg} title={title} viewBox={viewBox} fontSize={size} onClick={onClick}/>
  )
}

export default DoSvgIcon
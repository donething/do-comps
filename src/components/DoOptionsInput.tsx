import React, {ReactNode, useState} from "react"
import {FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material"
import DoTextFieldBtn from "./DoTextFieldBtn"

/**
 * 可为多个选择框的数据类型
 *
 * 每项对应一个选择框，常用的可放到数组前面
 */
export type OptionsListType = Array<{
  /**
   * 选择框的标签，如“平台”、“地区”，表示选项的类型
   */
  label: string,
  /**
   * 选择框的数组，每项对应一个选择框
   *
   * 每项内的属性依次为：标题、值、悬浮时的提示。如
   *
   * `[ { label: "平台", options: [{"title": "哔哩", "value": "bili", "tip": "主播的UID，不是房间号"},`
   * `{"title": "斗鱼", "value": "douyu", "tip": "斗鱼房间号"} ] },`
   * `{ label: "地区", options: [ {"title": "国区", "value": "cn", "tip": "国区"},`
   * `{"title": "美区", "value": "us", "tip": "美区"} ] } ]`
   */
  options: Array<{ title: string, value: string, tip?: string }>
}>

// 含前置选择框的输入框的选项
export type DoOptionsInputProps = {
  /**
   * 选择框的数据
   */
  optionsList: OptionsListType
  /**
   * 输入框的提示
   */
  placeholder?: string
  /**
   * 尺寸
   */
  size?: "small" | "medium"
  /**
   * 当执行回车回调后清空输入框的文本
   */
  clearAfterEnter?: boolean
  /**
   * 是否添加确认按钮，可为 ReactNode、文字
   */
  enterNode?: string | ReactNode,
  /**
   * 点击确认按钮后的回调函数，参数依次为：输入框的值、选择框中被选择的值（为了兼容多选的情况，传递数组）、事件对象
   * @param value
   * @param sList
   */
  onEnter: (value: string, sList: Array<string>) => void
}

/**
 * 含前置选择框的输入框
 */
const DoOptionsInput = React.memo((props: DoOptionsInputProps): JSX.Element => {
  // [多个]前置选择框被选择的值，该值将被在事件中传递到父组件
  const [sList, setSList] = useState<Array<string>>(props.optionsList.map(item => item.options[0].value))

  // 生成所有的选择框
  let selectsList: Array<JSX.Element> = []

  // 生成选择框
  let index = 0   // 第 n 个选择框
  for (const ops of props.optionsList) {
    // 当前选择框的选项
    let optionItems = []
    // 因为 setSList 的异步机制，导致直接使用 index 无法正确访问 sList 的指定值
    let i = index
    // 提取该选择框的选项
    for (const item of ops.options) {
      optionItems.push(
        <MenuItem key={item.value} value={item.value} title={item.tip}>{item.title}</MenuItem>
      )
    }

    // 创建选择框
    selectsList.push((
      <FormControl key={ops.label}>
        <InputLabel>{ops.label}</InputLabel>
        <Select size={props.size} value={sList[i]} label={ops.label}
                onChange={event => setSList(prev => {
                  let newList = [...prev]
                  newList[i] = event.target.value
                  return newList
                })}>{optionItems}
        </Select>
      </FormControl>
    ))

    index++
  }

  return (
    <Stack direction={"row"} boxSizing={"border-box"} width={"100%"}>
      <Stack direction={"row"}>
        {selectsList}
      </Stack>
      <DoTextFieldBtn label={props.placeholder} size={props.size} enterNode={props.enterNode}
                      clearAfterEnter={props.clearAfterEnter}
                      onEnter={value => props.onEnter(value, sList)}
      />
    </Stack>
  )
})

export default DoOptionsInput
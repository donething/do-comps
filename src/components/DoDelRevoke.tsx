import {DoSnackbarProps} from "./DoSnackbar"
import {Button} from "@mui/material"
import React from "react"

/**
 * 删除项目，并提供撤销功能
 *
 * 该函数没有具体实现删除、撤销，需要在传递的参数 `remove`、`revoke`函数中自己实现
 *
 * @param title 待删除元素的标题。不需要完整提示，如 “弥珠(162345)”
 * @param data 待删除的数据。将用于撤销删除
 * @param remove 删除操作。注意保存数据。如果有响应式的显示数据，也要相应删除
 * @param revoke 撤销删除操作。恢复被删除的 `data`，并保存数据。如果有响应式的显示数据，也要相应恢复
 * @param showSb 显示提示和撤销按钮
 */
export const delRevoke = <T, >(title: string | number,
                               data: T,
                               remove: () => (Error | undefined),
                               revoke: (origin: T) => (Error | undefined),
                               showSb: (ps: DoSnackbarProps) => void) => {
  // 开始删除信息（因为响应式，同时更新了界面）
  // 注意要保存修改
  const err = remove()
  if (err) {
    console.log(`删除 ${title} 出错`, err)
    showSb({open: true, message: `删除 ${title} 出错`, severity: "error"})
    return
  }
  console.log(`已删除 ${title}`)

  showSb({
    open: true,
    autoHideDuration: 6000,
    message: `是否撤销删除 ${title}`,
    showCloseBn: true,
    action: <Button variant={"text"} color={"primary"} onClick={() => {
      const err = revoke(data)
      if (err) {
        console.log(`恢复 ${title} 出错：`, err)
        showSb({open: true, message: `恢复 ${title} 出错`, severity: "error"})
        return
      }

      console.log(`已恢复 ${title}`)
      showSb({open: false})
    }}>撤销</Button>
  })
}

/**
 * 删除数组中的元素，并提供撤销功能
 *
 * @param title 已删除元素的标题。不需要完整提示，如 “弥珠(162345)”
 * @param showSb 显示提示和撤销按钮
 * @param data 待删除的数据
 * @param dataList 包含待删除元素的数组
 * @param findData 查找待删除数据的索引的回调函数
 * @param info 待删除的元素的信息
 * @param setInfos 删除、撤销信息的函数
 * @param findInfo 查找待删除信息的索引
 * @param update 保存数据
 */
export const delRevokeArray = <D, M = void>(title: string | number,
                                            showSb: (ps: DoSnackbarProps) => void,
                                            data: D,
                                            dataList: Array<D>,
                                            findData: (d1: D, d2: D) => boolean,
                                            update: (newDataList: Array<D>) => void,
                                            info?: M,
                                            setInfos?: React.Dispatch<React.SetStateAction<Array<M>>>,
                                            findInfo?: (m1: M, m2: M) => boolean): void => {
  // 查找待删除项目的索引
  let iData = dataList.findIndex(item => findData(item, data))
  if (iData < 0) {
    console.log("删除失败：无法找到待删除元素的索引")
    showSb({open: true, message: `删除 ${title} 失败：无法找到待删除元素的索引`, severity: "error"})
    return
  }

  // 如果存在元素的信息，删除
  let iInfo: number
  let deledInfoList: Array<M> | undefined = undefined
  if (info && setInfos && findInfo) {
    setInfos(prev => {
      iInfo = prev.findIndex(item => findInfo(item, info))
      if (iInfo < 0) {
        console.log("删除失败：无法找到待删除元素的信息的索引")
        showSb({open: true, message: `删除 ${title} 失败：无法找到待删除元素的信息的索引`, severity: "error"})
        return prev
      }

      // 删除项目的信息
      let newInfoList = [...prev]
      deledInfoList = newInfoList.splice(iInfo, 1)
      return newInfoList
    })
  }

  // 正式删除元素，并保存被删除的元素，以便恢复
  let deledDataList = dataList.splice(iData, 1)

  // 保存修改、更新界面，如保存到 chromium storage
  update(dataList)

  // 显示撤销删除的按钮
  showSb({
    open: true,
    autoHideDuration: 6000,
    message: `是否撤销删除 ${title}`,
    showCloseBn: true,
    action: <Button variant={"text"} color={"primary"} onClick={() => {
      // 恢复项目
      dataList.splice(iData, 0, deledDataList[0])
      update(dataList)

      // 如果存在项目的信息，恢复相应的数据
      if (setInfos && deledInfoList) {
        setInfos(prev => {
          if (deledInfoList) {
            let revokedInfos = [...prev]
            revokedInfos.splice(iInfo, 0, deledInfoList[0])
            return revokedInfos
          }
          return []
        })
      }

      showSb({open: false})
    }}>撤销</Button>
  })
}
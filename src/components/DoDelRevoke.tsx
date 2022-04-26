import {DoSnackbarProps} from "../main"
import {Button} from "@mui/material"

/**
 * 删除项目，并提供撤销功能
 * 依赖 <DoSnackbar/> 组件，可在`index.tsx`全局引入
 * @param title 已删除元素的标题，不需要完整提示，如 “弥珠(162345)”
 * @param data 包含被删数据的对象，用于撤销删除，如 chromium storage 中存储的对象
 * @param remove 删除组件绑定的状态，并保存
 * @param revoke 撤销删除，恢复数据，并保存
 * @param showSb 控制 DoSnackbar ，显示撤销按钮
 */
export const delRevoke = function <T>(title: string | number,
                                      data: T,
                                      remove: () => void,
                                      revoke: (origin: T) => void,
                                      showSb: (ps: DoSnackbarProps) => void) {
  // 预先保存被删除的信息，以供撤销删除
  let deledData = JSON.stringify(data)

  // 开始正常删除信息（因为响应式，同时更新了界面）
  // 注意要保存修改
  remove()
  console.log(`已删除 "${title}"`)

  showSb({
    open: true,
    autoHideDuration: 6000,
    message: `是否撤销删除 "${title}"`,
    action: <Button variant={"text"} color={"primary"} onClick={() => {
      revoke(JSON.parse(deledData))
      console.log(`已恢复 "${title}"`)

      showSb({open: false})
    }}>撤销</Button>
  })
}

/**
 * 删除数组中的项目，并提供撤销功能
 * 依赖 <DoSnackbar/> 组件，可在`index.tsx`全局引入
 * @param title 已删除元素的标题，不需要完整提示，如 “弥珠(162345)”
 * @param showSb 控制 DoSnackbar ，显示撤销按钮
 * @param data 待删除的项目
 * @param info 待删除的项目的信息
 * @param dataList 包含待删除数据的数组
 * @param infoList 包含待删除数据信息的数组
 * @param findData 查找待删除数据所在的索引
 * @param findInfo 查找待删除数据的信息所在的索引
 * @param update 保存数据到存储、更新界面
 */
export const delRevokeArray = function <D, M = void>(title: string | number,
                                                     showSb: (ps: DoSnackbarProps) => void,
                                                     data: D,
                                                     dataList: Array<D>,
                                                     findData: (d1: D, d2: D) => boolean,
                                                     update: (newDataList: Array<D>, newInfoList?: Array<M>) => void,
                                                     info?: M,
                                                     infoList?: Array<M>,
                                                     findInfo?: (m1: M, m2: M) => boolean): void {
  // 查找待删除项目的索引
  let iData = dataList.findIndex(item => findData(item, data))
  if (iData < 0) {
    console.log("待删除的数据不存在，直接返回")
    return
  }

  // 删除项目，保存被删除的数据
  let deledDataList = dataList.splice(iData, 1)

  // 如果存在项目的信息，删除相应的数据
  let iInfo: number
  let newInfoList: Array<M> | undefined = undefined
  let deledInfoList: Array<M> | undefined = undefined
  if (info && infoList && findInfo) {
    iInfo = infoList.findIndex(item => findInfo(item, info))
    if (iInfo < 0) {
      console.log("无法找到待删除数据的索引，直接返回")
      return
    }

    // 删除项目的信息
    newInfoList = [...infoList]
    deledInfoList = newInfoList.splice(iInfo, 1)
  }

  // 保存修改、更新界面，如保存到 chromium storage
  update(dataList, newInfoList)

  // 显示撤销删除的按钮
  showSb({
    open: true,
    autoHideDuration: 6000,
    message: `是否撤销删除 "${title}"`,
    action: <Button variant={"text"} color={"primary"} onClick={() => {
      // 恢复项目
      dataList.splice(iData, 0, deledDataList[0])
      // 如果存在项目的信息，恢复相应的数据
      let revokedInfoListRevoked: Array<M> | undefined = undefined
      if (newInfoList && deledInfoList) {
        revokedInfoListRevoked = [...newInfoList]
        revokedInfoListRevoked.splice(iInfo, 0, deledInfoList[0])
      }

      update(dataList, revokedInfoListRevoked)
      showSb({open: false})
    }}>撤销</Button>
  })
}
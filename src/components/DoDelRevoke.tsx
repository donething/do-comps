import {DoSnackbarProps} from "../main"
import {Button} from "@mui/material"

/**
 * 删除项目，并提供撤销功能
 * 依赖 <DoSnackbar/> 组件，可在`index.tsx`全局引入
 * @param title 已删除元素的标题，不需要完整提示，如 “弥珠(162345)”
 * @param data 包含被删数据的对象，用于撤销删除，如 chromium storage 中存储的对象
 * @param remove 删除组件绑定的状态，并保存
 * @param revoke 撤销删除，恢复数据，并保存
 * @param showSb 显示撤销按钮
 */
export const delRevoke = function <T>(title: string | number, data: T,
                                      remove: () => void,
                                      revoke: (data: T) => void,
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
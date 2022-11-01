import {Button, Card, CardContent, CardHeader, CardProps, Divider} from "@mui/material"
import {useSharedDialog} from "./DoDialog"
import {useSharedSnackbar} from "./DoSnackbar"
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import CenterFocusStrongOutlinedIcon from '@mui/icons-material/CenterFocusStrongOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import React from "react"

/**
 * 备份面板的基础属性
 */
export type DoBackupPanelBaseProps = {
  /**
   * 标题
   */
  title?: string
  /**
   * 保存配置到本地时的文件名
   */
  filename?: string
  /**
   * 面板整体的属性
   */
  cardProps?: CardProps
}

/**
 * 备份面板的属性
 */
export type DoBackupPanelProps = DoBackupPanelBaseProps & {
  /**
   * 清除数据的函数
   */
  onClear: () => void
  /**
   * 读取数据的函数
   *
   * 注意函数需要修饰为 async，以返回 Promise 数据
   */
  onRead: () => Promise<object>
  /**
   * 恢复数据，可用 async 将异步函数同步执行
   * @param obj
   */
  onRestore: (obj: object) => void
}

/**
 * 备份、恢复数据面板
 *
 * **依赖** DoSnackbar、DoDialog 组件，提供消息提示，可在`index.tsx`全局引入
 */
const DoBackupPanel = React.memo((props: DoBackupPanelProps): JSX.Element => {
  const {showSb} = useSharedSnackbar()
  const {showDialog} = useSharedDialog()

  console.log("重新渲染 组件")

  return (
    <Card sx={{width: 300}} {...props.cardProps}>
      <CardHeader title={props.title} action={<Button color={"warning"} onClick={() => {
        showDialog({
          open: true,
          title: `清除 ${props.title} 存储的数据`,
          message: "不可恢复！",
          btnOK: {
            text: "确定清除",
            props: {color: "warning"},
            // 清除
            onClick: () => {
              props.onClear()
              console.log("已清除存储的数据")
              // 刷新组件
              window.location.reload()
            }
          },
          btnCancel: {
            text: "取消"
          }
        })
      }}>清除</Button>}/>

      <Divider/>

      <CardContent sx={{display: "flex", flexFlow: "column nowrap", gap: 4}}>
        {/* 从文件恢复配置 */}
        <label htmlFor="do-backup-file">
          <input accept={"*"} type="file" id={"do-backup-file"} hidden onChange={async event => {
            let files = event.target.files
            if (!files || files.length === 0) {
              console.log("没有选择备份文件")
              return
            }

            // 解析数据
            let text = await files[0].text()
            let data: { sync?: object, local?: object } = {}
            try {
              data = JSON.parse(text)
            } catch (e) {
              console.error("导入备份数据出错，无法解析JSON文本：", e)
              showSb({open: true, message: "导入备份数据出错，无法解析JSON文本", severity: "error"})
              return
            }

            // 恢复
            await props.onRestore(data)

            console.log("已恢复备份的数据")
            showSb({open: true, message: "已恢复备份的数据", severity: "success"})
            // 刷新组件
            window.location.reload()
            // 取消上传文件的操作
            return false
          }}/>
          {/* `component`属性须为`span`，点击按钮时才会弹文件出选择框 */}
          <Button variant="outlined" fullWidth component="span" startIcon={<FileUploadOutlinedIcon/>}>
            导入配置
          </Button>
        </label>

        {/* 浏览配置 */}
        <Button variant="outlined" startIcon={<CenterFocusStrongOutlinedIcon/>}
                onClick={async _ => {
                  // 读取数据
                  let data = await props.onRead()

                  showDialog({
                    open: true,
                    title: `${props.title} 存储的数据`,
                    fullWidth: true,
                    message: JSON.stringify(data, null, 2)
                  })
                }}>
          浏览配置
        </Button>

        {/*  保存配置到本地 */}
        <Button variant="outlined" startIcon={<FileDownloadOutlinedIcon/>} onClick={async _ => {
          // 下载
          download(await props.onRead(), props.filename || `${Date.now()}.json`)
          console.log("已保存配置到下载目录")
        }}>下载配置</Button>
      </CardContent>
    </Card>
  )
})

/**
 * 备份、恢复 chromium storage 的数据面板
 *
 * 用于 chromium 扩展程序的数据备份和恢复
 *
 * **依赖** DoSnackbar、DoDialog 组件，可在`index.tsx`全局引入
 */
export const DoBackupPanelChromium = React.memo((props: DoBackupPanelBaseProps): JSX.Element => {
  return (
    <DoBackupPanel title={props.title || "Storage"}
                   filename={props.filename || `${chrome.runtime.getManifest().name}.json`}

                   onClear={async () => {
                     // 清空存储的配置
                     await chrome.storage.sync.clear()
                     await chrome.storage.local.clear()

                     // 刷新组件
                     window.location.reload()
                   }}

                   onRestore={async data => {
                     // 分别恢复到 sync、local 存储
                     // @ts-ignore
                     await chrome.storage.sync.set(data.sync)
                     // @ts-ignore
                     await chrome.storage.local.set(data.local)
                   }}

                   onRead={async () => {
                     // 读取数据
                     let sync = await chrome.storage.sync.get(null)
                     let local = await chrome.storage.local.get(null)
                     return {sync: sync, local: local}
                   }}
    />
  )
})

/**
 * 保存数据到本地
 * @param data 文本或JSON对象的数据
 * @param filename 指定文件名
 * @see https://juejin.cn/post/6844903699496566792
 */
const download = (data: string | object, filename: string) => {
  let bdata: Array<string>
  switch (typeof data) {
    // 如果是对象，先转为JSON字符串，再保存
    case "object":
      let str = JSON.stringify(data)
      // [data]表示将 data 转为数组
      bdata = [str]
      break
    case "string":
      // [data]表示将 data 转为数组
      bdata = [data]
      break
  }

  let blob = new Blob(bdata)
  let a = document.createElement('a')
  let url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => window.URL.revokeObjectURL(url), 10)
}

export default DoBackupPanel
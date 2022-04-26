import {Button, Card, CardContent, CardHeader, CardProps, Stack} from "@mui/material"
import {useSharedDialog, useSharedSnackbar} from "../main"
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import CenterFocusStrongOutlinedIcon from '@mui/icons-material/CenterFocusStrongOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import {download} from "do-utils/dist/elem"

// 备份面板的基础属性
export type DoBackupPanelBaseProps = {
  // 标题
  title?: string

  // 保存配置到本地时的文件名
  filename?: string

  // Card 的属性
  cardProps?: CardProps
}

// 备份面板的属性
export type DoBackupPanelProps = DoBackupPanelBaseProps & {
  // 清除存储
  onClear: () => void

  // 保存存储到本地
  onRead: () => object

  // 恢复，可用 async 将异步函数同步执行
  onRestore: (obj: object) => void
}

// 备份、恢复数据面板
//
// 依赖 <DoSnackbar/>、<DoDialog/> 组件，可在`index.tsx`全局引入
const DoBackupPanel = (props: DoBackupPanelProps): JSX.Element => {
  const {showSb} = useSharedSnackbar()
  const {showDialog} = useSharedDialog()

  return (
    <Card sx={{width: 300}} {...props.cardProps}>
      <CardHeader title={props.title} action={<Button variant={"outlined"} color={"warning"} onClick={() => {
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

      <CardContent>
        <Stack spacing={2}>
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
          <Button variant="outlined" startIcon={<CenterFocusStrongOutlinedIcon/>} onClick={async _ => {
            // 读取数据
            let data = await props.onRead()

            showDialog({
              open: true,
              title: `${props.title} 存储的数据`,
              fullWidth: true,
              message: JSON.stringify(data, null, 2)
            })
          }}>浏览配置</Button>

          {/*  保存配置到本地 */}
          <Button variant="outlined" startIcon={<FileDownloadOutlinedIcon/>} onClick={async _ => {
            // 下载
            download(props.onRead(), props.filename || `${Date.now()}.json`)
            console.log("已保存配置到下载目录")
          }}>下载配置</Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

// 备份、恢复 chromium storage 的数据面板
//
// 依赖 <DoSnackbar/>、<DoDialog/> 组件，可在`index.tsx`全局引入
export const DoBackupPanelChromium = (props: DoBackupPanelBaseProps): JSX.Element => {
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
}

export default DoBackupPanel
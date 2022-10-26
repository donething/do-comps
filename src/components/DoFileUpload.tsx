import React from "react"

/**
 * 文件上传组件的属性
 */
export type DoFilesUploadProps = {
  /**
   * 文件上传 input 的 ID，用于之后触发文件选择：`document.querySelector(`#${id}`).click()`
   */
  id: string,
  /**
   * 文件上传地址
   */
  apiURL: string,
  /**
   * 可选择的文件类型，默认不限制类型，具体类型参考 HTML 标准
   */
  accept?: string
  /**
   * 上传文件时可能需要发送的请求头，可用于根据请求头验证访问权限的场景
   */
  headers?: HeadersInit
  /**
   * 当选择完文件后真正发起上传的网络请求，可以自定义
   */
  handleChoose?: (e: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * 每个文件**开始**上传后的回调，可用于显示提示“开始上传”
   * @param name 文件名
   */
  onUpload?: (name: string) => void
  /**
   * 每个文件上传**完成**后的回调
   * @param name 文件名
   * @param err 上传是否出错，不为空时表示上传出错
   */
  onFinish?: (name: string, err?: Error) => void
}

/**
 * 文件上传组件
 *
 * 需要通过代码触发点击事件，弹出文件选择框。参考`DoFilesUploadProps`的`id`属性
 */
const DoFilesUpload = React.memo((props: DoFilesUploadProps) => {
  // 当选择了文件时触发上传文件事件
  const handleChooseDefault = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files
    if (!files) {
      console.log("没有需要上传的文件")
      return
    }

    for (let i = 0; i < files.length; i++) {
      let name = files[i].name
      // 开始上传前
      // 此句需放在 input 的 onInput 事件中
      // props.onUpload && props.onUpload(name)

      // 正式上传
      let form = new FormData()
      form.append(name, files[i])
      let resp = await fetch(props.apiURL, {method: "POST", headers: props.headers, body: form})
      let obj = await resp.json()

      // 通过回调返回上传结果
      props.onFinish && props.onFinish(name, obj && obj.code === 0 ? undefined :
        new Error(obj?.data[name] || "无法连接服务端"))
    }

    // 以便在选择相同的文件再次触发 onChange
    e.target.value = ""
  }

  return (
    <input type="file" accept={props.accept || "*"} id={props.id} multiple hidden
           onChange={props.handleChoose || handleChooseDefault}
           onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
             // 和 onChange 分开，以避免在上传完成后在 filesStatus 中找不到项目的问题
             let files = e.target.files
             if (!files) return

             for (let i = 0; i < files.length; i++) {
               props.onUpload && props.onUpload(files[i].name)
             }
           }}
    />
  )
})

export default DoFilesUpload
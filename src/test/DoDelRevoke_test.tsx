import {Button} from "@mui/material"
import {useState} from "react"
import {delRevoke, useSharedSnackbar} from "../main"

export const DoDelRevokeTest = () => {
  const [nums, setNums] = useState([1, 2, 3])

  const {showSb} = useSharedSnackbar()

  const list = nums.map((item, index) => <li key={item}>
    <Button onClick={() => delRevoke<Array<number>>(item, nums, () => {
        // 删除
        setNums(prev => {
          let newArray = [...prev]
          newArray.splice(index, 1)
          return newArray
        })
      }, (data) => {
        // 撤销
        setNums(data)
      },
      showSb)}>{item}
    </Button></li>)

  return (
    <ul>
      {list}
    </ul>
  )
}
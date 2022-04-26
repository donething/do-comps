import {Button, Stack} from "@mui/material"
import {useState} from "react"
import {delRevoke, useSharedSnackbar} from "../main"
import {delRevokeArray} from "../components/DoDelRevoke"

export const DoDelRevokeTest = () => {
  const [nums, setNums] = useState([1, 2, 3])
  const [nums2, setNums2] = useState([19, 21, 32])

  const {showSb} = useSharedSnackbar()

  const list1 = nums.map((item, index) => <li key={item}>
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
    </Button>
  </li>)

  const list2 = nums2.map((item) => <li key={item}>
    <Button onClick={() => delRevokeArray<number>(item, showSb, item, nums2,
      (d1, d2) => d1 === d2,
      newDataList => setNums2(newDataList)
    )}>{item}
    </Button>
  </li>)

  return (
    <Stack spacing={3}>
      <ul>
        {list1}
      </ul>

      <ul>
        {list2}
      </ul>
    </Stack>
  )
}
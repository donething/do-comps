import {Button, Stack} from "@mui/material"
import {useState} from "react"
import {delRevoke, useSharedSnackbar} from "../main"
import {delRevokeArray} from "../main"

export const DoDelRevokeTest = () => {
  const [count, setCount] = useState(0)

  const [nums, setNums] = useState([1, 2, 3])
  const [nums2, setNums2] = useState([19, 21, 32])

  const {showSb} = useSharedSnackbar()

  const list1 = nums.map((item, index) => <li key={item}>
    <Button onClick={() => delRevoke<number>(item, item, async () => {
        // 删除
        setNums(prev => {
          const newArray = [...prev]
          const i = newArray.findIndex((n) => n === item)
          newArray.splice(i, 1)
          return newArray
        })
        return undefined
      }, async data => {
        // 撤销
        setNums(prev => [...prev, data])
        return undefined
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
      <div>{count}</div>
      <Button onClick={() => setCount(prev => ++prev)}>只更新计数时，不重新渲染 DoAutocomplete</Button>

      <ul>
        {list1}
      </ul>

      <ul>
        {list2}
      </ul>
    </Stack>
  )
}
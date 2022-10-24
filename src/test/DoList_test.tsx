import {useState} from "react"
import {DoList} from "../main"
import {ListItem} from "@mui/material"

export const DoListTest = () => {
  const step = 20
  const [list, setList] = useState([...Array(step).keys()])

  return (
    <DoList width={"450px"} height={"100%"} border={"#AAA solid 1px"}
            content={
              list.map(item => <ListItem key={item + Math.random()}>{item}</ListItem>)
            }
            onLoadNext={() => {
              setList(prev => [...prev, ...Array(step).keys()])
            }}
            onLoadPrev={() => {
              setList(prev => [...Array(step).keys(), ...prev])
            }}
    />
  )
}
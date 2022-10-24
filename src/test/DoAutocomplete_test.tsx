import {DoAutocomplete} from "../main"
import {useState} from "react"

export const DoAutocompleteTest = () => {
  const [options, setOptions] = useState(["选项1", "选项2", "选项3"])

  return (
    <DoAutocomplete label={"输入姓名"} options={options}
                    onEnter={option => alert(`点击了选项${option}`)}

                    onDelOption={option => {
                      setOptions(prev => {
                        let n = [...prev]
                        n.splice(n.findIndex(item => item === option), 1)
                        return n
                      })
                    }}/>
  )
}
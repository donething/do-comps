import Button from "@mui/material/Button"
import React from "react"
import {DoButtonLeftAligned} from "../main"
import {Stack} from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp'

export const DoButtonLeftAlignedTest = () => {
  return (
    <Stack gap={2}>
      <DoButtonLeftAligned startIcon={<VolumeUpIcon/>} variant={"outlined"}>左对齐按钮</DoButtonLeftAligned>

      <Button startIcon={<VolumeUpIcon/>} variant={"outlined"}>普通按钮</Button>
    </Stack>
  )
}
import DoText from "../components/DoText"
import {Stack} from "@mui/material"

export const DoTextTest = () => {
  return (
    <Stack spacing={3}>
      <DoText sx={{color: "green", borderBottom: 1}} lines={2}>是的，它是一个比率：1.5 表示元素字体大小的 1.5 倍。所以它的含义与 1.5em 或 150%
        相同，但有一个重要例外：在继承中，当使用纯数字时，继承的是数字，而不是计算值。 因此，如果您有一个字体大小为 24pt 的元素，line-height: 1.5请将行高设置为
        36pt。但是如果元素有一个子元素，即内部元素，字体大小为 10pt，并且没有设置任何行高，那么子元素继承line-height1.5 的值，这意味着该元素为
        15pt。另一方面，如果将行高设置为1.5em或150%，则子级将继承计算值 36pt，从而产生怪诞的行距。 从技术上讲，这隐藏在一个表述下。对于用作line-height值的纯数字：“计算值与指定值相同。”
        因此，名义上，子代继承了“计算”值 1.5，然后将在子代的上下文中进行解释（其字体大小的 1.5 倍）。</DoText>

      <DoText sx={{color: "green", borderBottom: 1}} lines={5}>是的，它是一个比率：1.5 表示元素字体大小的 1.5 倍。所以它的含义与 1.5em 或 150%
        相同，但有一个重要例外：在继承中，当使用纯数字时，继承的是数字，而不是计算值。 因此，如果您有一个字体大小为 24pt 的元素，line-height: 1.5请将行高设置为
        36pt。但是如果元素有一个子元素，即内部元素，字体大小为 10pt，并且没有设置任何行高，那么子元素继承line-height1.5 的值，这意味着该元素为
        15pt。另一方面，如果将行高设置为1.5em或150%，则子级将继承计算值 36pt，从而产生怪诞的行距。 从技术上讲，这隐藏在一个表述下。对于用作line-height值的纯数字：“计算值与指定值相同。”
        因此，名义上，子代继承了“计算”值 1.5，然后将在子代的上下文中进行解释（其字体大小的 1.5 倍）。</DoText>

      <DoText sx={{color: "green", borderBottom: 1}} lines={2}>
        but the problem is that this code makes everything in one-line. I want to go with 3 lines of text then... I
        searched
        in the Google about it and I find out we have a WebKit for itbut the problem is that this code makes everything
        in one-line. I want to go with 3 lines of text then... I
        searched
        in the Google about it and I find out we have a WebKit for itbut the problem is that this code makes everything
        in one-line. I want to go with 3 lines of text then... I
        searched
        in the Google about it and I find out we have a WebKit for it
        but the problem is that this code makes everything in one-line. I want to go with 3 lines of text then... I
        searched
        in the Google about it and I find out we have a WebKit for it
        but the problem is that this code makes everything in one-line. I want to go with 3 lines of text then... I
        searched
        in the Google about it and I find out we have a WebKit for it
      </DoText>
    </Stack>
  )
}
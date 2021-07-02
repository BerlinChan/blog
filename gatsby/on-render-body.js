const React = require('react')

const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    // 修正整个内容会滚动
    // React.createElement('style', {
    //   key: 'fix-window-scroll',
    //   dangerouslySetInnerHTML: {
    //     __html: `
    //       div[role="group"][tabindex] {
    //         overflow: hidden;
    //       }
    //     `
    //   },
    // }),
  ])
}

module.exports = onRenderBody

exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "zh-Hans", prefix: "og: http://ogp.me/ns#" });
};

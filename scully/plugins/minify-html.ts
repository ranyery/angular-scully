import { setPluginConfig } from '@scullyio/scully';
import { Options as HtmlMinifierTerserOptions } from 'html-minifier-terser';
import { MinifyHtml as MinifyHtmlPlugin } from 'scully-plugin-minify-html';

setPluginConfig(MinifyHtmlPlugin, {
  minifyOptions: {
    caseSensitive: true,
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    minifyCSS: true,
    // Minifying JavaScript can cause problems with Scully Transfer State
    minifyJS: false,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    // don't remove attribute quotes, not all social media platforms can parse this over-optimization
    removeAttributeQuotes: false,
    // don't remove optional tags, like the head, not all social media platforms can parse this over-optimization
    removeOptionalTags: false,
    // scully specific HTML comments
    // this will always be added in the final minifyOptions config
    ignoreCustomComments: [/scullyContent-(begin|end)/],
    // scully specific data injection
    // this will always be added in the final minifyOptions config
    ignoreCustomFragments: [/\/\*\* ___SCULLY_STATE_(START|END)___ \*\//],
  } as HtmlMinifierTerserOptions,
});

export default MinifyHtmlPlugin;

import '@scullyio/scully-plugin-puppeteer';

import { RouteTypes, ScullyConfig } from '@scullyio/scully';

import MinifyHtmlPlugin from './plugins/minify-html';
import RegexPlugin from './plugins/regex';

// https://developers.google.com/search/blog/2010/04/to-slash-or-not-to-slash?hl=pt-br

const postRenderers = ['seoHrefOptimise', RegexPlugin, MinifyHtmlPlugin];

export const config: ScullyConfig = {
  projectName: 'angular-scully',
  projectRoot: './src',
  outDir: './dist/static',
  handle404: 'index',
  defaultPostRenderers: postRenderers,
  routes: {
    '/': { type: RouteTypes.default },
    '/products': { type: RouteTypes.default },
  },
};

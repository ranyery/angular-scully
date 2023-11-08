import { getRegexPlugin } from '@gammastream/scully-plugin-regex';
import { setPluginConfig } from '@scullyio/scully';

const RegexPlugin = getRegexPlugin();
setPluginConfig(RegexPlugin, {
  replacements: [
    { from: '<meta name="generator" content="Scully 0.0.0">', to: '' },
    { from: ' scully-version="0.0.0"', to: '' },
  ],
});

export default RegexPlugin;

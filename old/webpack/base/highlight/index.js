import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/atom-one-dark.css';
import diff from 'highlight.js/lib/languages/diff';
import shell from 'highlight.js/lib/languages/shell';
import yaml from 'highlight.js/lib/languages/yaml';

import terraform from './highlightjs-terraform';

hljs.registerLanguage('diff', diff);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('terraform', terraform);

hljs.initHighlightingOnLoad();

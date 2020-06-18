import highlightjs from 'highlight.js';
import hljsTerraform from './highlightjs-terraform';
import 'highlight.js/styles/atom-one-dark.css';

highlightjs.registerLanguage('terraform', hljsTerraform);

highlightjs.initHighlightingOnLoad();

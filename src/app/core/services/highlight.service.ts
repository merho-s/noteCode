import { Injectable, Inject } from '@angular/core';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CODES_LANGUAGES } from 'src/app/shared/global_constants/languages.const';

import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-csharp';
// import 'prismjs/components/prism-cpp';
// import 'prismjs/components/prism-c';
// import 'prismjs/components/prism-fsharp';
// import 'prismjs/components/prism-fortran';
// import 'prismjs/components/prism-json';
// import 'prismjs/components/prism-lua';
// import 'prismjs/components/prism-markdown';
// import 'prismjs/components/prism-latex';
// import 'prismjs/components/prism-matlab';
// import 'prismjs/components/prism-php';
// import 'prismjs/components/prism-plsql';
// import 'prismjs/components/prism-powershell';
// import 'prismjs/components/prism-bash';
// import 'prismjs/components/prism-python';
// import 'prismjs/components/prism-qsharp';
// import 'prismjs/components/prism-rust';
// import 'prismjs/components/prism-yaml';
// import 'prismjs/components/prism-xml-doc';
// import 'prismjs/components/prism-graphql';
// import 'prismjs/components/prism-objectivec';
// import 'prismjs/components/prism-kotlin';

declare var Prism: any;

@Injectable()
export class HighlightService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  highlight() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
}
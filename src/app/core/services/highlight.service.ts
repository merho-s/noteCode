import { Injectable, Inject } from '@angular/core';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
// import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-java';
// import 'prismjs/components/prism-markup';
// import 'prismjs/components/prism-typescript';
// import 'prismjs/components/prism-sass';
// import 'prismjs/components/prism-scss';
// import 'prismjs/components/prism-csharp';

declare var Prism: any;

@Injectable()
export class HighlightService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  highlight(prismLanguage: string) {
    if (isPlatformBrowser(this.platformId)) {
      import(`prismjs/components/prism-${prismLanguage}`);
      Prism.highlightAll();
    }
  }
}
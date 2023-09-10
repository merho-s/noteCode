import { Component, Input } from '@angular/core';
import { CodeSnippet } from 'src/app/core/models/codesnippet.interface';
import { HighlightService } from 'src/app/core/services/highlight.service';
import { CODES_LANGUAGES } from 'src/app/shared/global_constants/languages.const';

@Component({
  selector: 'app-code-card',
  templateUrl: './code-card.component.html',
  styleUrls: ['./code-card.component.scss']
})
export class CodeCardComponent {

  @Input() codeSnippet!: CodeSnippet;
  prismLanguage!: string;
  

  constructor(private highlightService: HighlightService) {}
  
  ngOnInit() {
    let codeLanguage = CODES_LANGUAGES.find(l => l.language === this.codeSnippet.language);
    if (codeLanguage)
      this.prismLanguage = codeLanguage.alias;
  }

  ngAfterViewChecked() {
    this.highlightService.highlight();
  }
}

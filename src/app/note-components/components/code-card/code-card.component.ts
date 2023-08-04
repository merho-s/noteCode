import { Component, Input } from '@angular/core';
import { CodeSnippet } from 'src/app/core/models/codesnippet.model';
import { HighlightService } from 'src/app/core/services/highlight.service';
import { CodeLanguages } from 'src/app/shared/global_constants/languages.const';

@Component({
  selector: 'app-code-card',
  templateUrl: './code-card.component.html',
  styleUrls: ['./code-card.component.scss']
})
export class CodeCardComponent {

  @Input() singleCode!: CodeSnippet;
  prismLanguage!: string;
  

  constructor(private highlightService: HighlightService) {}
  
  ngOnInit() {
    let codeLanguage = CodeLanguages.find(l => l.language === this.singleCode.language);
    if (codeLanguage)
      this.prismLanguage = codeLanguage.alias;
  }

  ngAfterViewChecked() {
    this.highlightService.highlight(this.prismLanguage);
  }
}

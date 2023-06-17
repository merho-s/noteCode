import { Component, Input } from '@angular/core';
import { CodeSnippet } from 'src/app/core/models/codesnippet.model';
import { HighlightService } from 'src/app/core/services/highlight.service';

@Component({
  selector: 'app-code-card',
  templateUrl: './code-card.component.html',
  styleUrls: ['./code-card.component.scss']
})
export class CodeCardComponent {
  @Input() singleCode!: CodeSnippet;

  constructor(private highlightService: HighlightService) {}

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}

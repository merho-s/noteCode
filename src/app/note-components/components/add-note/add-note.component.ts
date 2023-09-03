import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CodeSnippet } from 'src/app/core/models/codesnippet.model';
import { Note } from 'src/app/core/models/note.model';
import { HighlightService } from 'src/app/core/services/highlight.service';
import { NoteService } from 'src/app/core/services/note.service';
import { TagService } from 'src/app/core/services/tag.service';
import { CODES_LANGUAGES } from 'src/app/shared/global_constants/languages.const';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  @Input() tagsEditingMode: boolean = true;
  @Input() descriptionEditingMode: boolean = true;
  @Input() codesEditingModes: boolean[] = [];
  @Input() singleNote!: Note;
  codeLanguages = CODES_LANGUAGES;
  noteForm!: FormGroup;
  tagSearch!: string;
  allTags!: string[];
  searchedTags!: string[];
  tagsFound: boolean = false;
  prismLanguage!: string;
  
  get codes() {
    return this.noteForm.get('codes') as FormArray;
  }

  get codetags() {
    return this.noteForm.get('codetags') as FormArray;
  }

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private noteService: NoteService,
              private tagService: TagService,
              private elementRef: ElementRef,
              private renderer: Renderer2,
              private highlightService: HighlightService) {}

  ngOnInit(): void {
    this.tagService.getAllCodetags().subscribe(tags => this.allTags = tags);
    if (this.singleNote) {
      this.noteForm = this.formBuilder.group({
        title: [this.singleNote.title],
        description: [this.singleNote.description],
        codetags: this.formBuilder.array(this.singleNote.codetags ? this.singleNote.codetags : []),
        codes: this.formBuilder.array([])
      });
      if(this.singleNote.codes) {
        for(let i = 0; i < this.singleNote.codes.length; i++) {
          this.codesEditingModes.push(false);
          this.onAddCode(this.singleNote.codes[i]);
        }
      }
    } else {
      this.noteForm = this.formBuilder.group({
        title: [''],
        description: [''],
        codetags: this.formBuilder.array([]),
        codes: this.formBuilder.array([])
      });
    }
 
  }

  // ngAfterViewInit() {
  //   let allTextareas = this.elementRef.nativeElement.querySelectorAll('textarea');
  //   allTextareas.forEach((textarea: HTMLTextAreaElement) => {
  //     this.autoResizeTextarea(textarea)
  //   });
  // }

  highlight() {
    this.highlightService.highlight();
  }

  autoResizeTextarea(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    // this.renderer.setStyle(element, 'height', 0);
    // this.renderer.setStyle(element, 'height', element.scrollHeight);
  }

  onAddCode(code?: CodeSnippet) {
    const codeForm = this.formBuilder.group({
      code: [code ? code.code : '', Validators.required],
      description: [code ? code.description : ''],
      language: [code ? code.language : '', Validators.required]
    });
    this.codes.push(codeForm);
  }

  onDeleteCode(id: number) {
    this.codes.removeAt(id);
  }

  onAddTag(tagName: string) {
    let codetagsArray: string[] = this.codetags.value;
    if(!codetagsArray.find(tag => tag.toLowerCase() === tagName.toLowerCase())) {
      this.codetags.push(this.formBuilder.control(tagName));
    }
  }

  onDeleteTag(id: number) {
    this.codetags.removeAt(id);
  }

  onSearchTagTyping(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if(inputValue !== '') {
      if(inputValue.length <= 1) {
        this.searchedTags = this.allTags.filter(value => value.toLocaleLowerCase().startsWith(inputValue.toLocaleLowerCase()));
      } else this.searchedTags = this.allTags.filter(value => value.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()));
    } else this.searchedTags = []
    if(this.searchedTags.length !== 0) {
      this.tagsFound = true;
    } else this.tagsFound = false;
  }

  enableTagsEditingMode() {
    this.tagsEditingMode = true;
  }

  disableTagsEditingMode() {
    this.tagsEditingMode = false;
  }

  enableCodeEditingMode(index: number) {
    this.codesEditingModes[index] = true;
  }

  disableCodeEditingMode(index: number) {
    this.codesEditingModes[index] = false;
  }

  onSubmitForm() {
    for(let c of this.codes.value) {
      if (c.language !== 'Plain Text') {
        this.onAddTag(c.language);
      }
    }
    if (this.noteForm.value.title === '') {
      if(this.noteForm.value.description !== '')
        this.noteForm.value.title = this.noteForm.value.description.substring(0, 10); 
      else this.noteForm.value.title = 'No Title';
    } 
    this.noteService.addNote(this.noteForm.value).pipe(
      tap(note => {
        this.router.navigateByUrl(`/notes/${note.id}`);
      })
    ).subscribe();
  }
}

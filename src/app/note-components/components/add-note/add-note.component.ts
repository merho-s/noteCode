import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CodeSnippet } from 'src/app/core/models/codesnippet.interface';
import { Codetag } from 'src/app/core/models/codetag.interface';
import { Note } from 'src/app/core/models/note.interface';
import { HighlightService } from 'src/app/core/services/highlight.service';
import { NoteService } from 'src/app/core/services/note.service';
import { TagService } from 'src/app/core/services/tag.service';
import { CODES_LANGUAGES } from 'src/app/shared/global_constants/languages.const';

interface CodeCard {
  codeForm: FormGroup;
  isEditMode: boolean;
  languageAlias?: string;
  isRefreshingCodeLanguage: boolean;
}

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})

export class AddNoteComponent implements OnInit {
  @Input() tagsEditingMode: boolean = true;
  @Input() descriptionEditingMode: boolean = true;
  @Input() singleNote!: Note;
  noteForm!: FormGroup;
  isNoteChanged: boolean = false;
  codeCards: CodeCard[] = [];
  codeLanguages!: any[];
  tagSearch!: string;
  allTags!: string[];
  searchedTags!: string[];
  areTagsFound: boolean = false;
  
  get codes() {
    return this.noteForm.get('codes') as FormArray;
  }

  get codetags() {
    return this.noteForm.get('codetags') as FormArray;
  }

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private noteService: NoteService,
              private tagService: TagService) {}


  ngOnInit(): void {
    this.loadLanguages();
    this.loadTags();
    if (this.singleNote) {
      this.noteForm = this.formBuilder.group({
        title: [this.singleNote.title],
        description: [this.singleNote.description],
        codetags: this.formBuilder.array(this.singleNote.codetags ? this.singleNote.codetags : []),
        codes: this.formBuilder.array([])
      });
      if(this.singleNote.codes) {
        console.log(this.singleNote);
        for(let code of this.singleNote.codes) {
          console.log(code.code);
          this.onAddCode(undefined, code, false);
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
    this.noteForm.valueChanges.subscribe(() => {
      this.checkIsNoteChanged();
    })
  }

  loadTags() {
    this.tagService.getAllCodetags().subscribe(tags => this.allTags = tags.map(t => t.name).sort((a: string, b: string) => {
      if(a.toLocaleLowerCase() < b.toLocaleLowerCase()) {
        return -1;
      }
      if(a.toLocaleLowerCase() > b.toLocaleLowerCase()) {
        return 1;
      }
      return 0;
    }));
  }

  loadLanguages() {
    this.codeLanguages = CODES_LANGUAGES.sort(function(a, b) {
      if(a.language.toLocaleLowerCase() < b.language.toLocaleLowerCase()) {
        return -1;
      }
      if(a.language.toLocaleLowerCase() > b.language.toLocaleLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  checkIsNoteChanged() {
    this.isNoteChanged = true;
    if(this.singleNote) {
      this.isNoteChanged = false;
      if (this.singleNote.title !== this.noteForm.value.title ||
        this.singleNote.description !== this.noteForm.value.description ||
        this.singleNote.codetags.length !== this.noteForm.value.codetags.length ||
        this.singleNote.codes.length !== this.noteForm.value.codes.length) {
          this.isNoteChanged = true;
      } else {
        for(let codetag of this.noteForm.value.codetags) {
          if(!this.singleNote.codetags.find(t => t.name === codetag.name)) {
            this.isNoteChanged = true;
          }
        }
        for(let i = 0; i < this.singleNote.codes.length; i++) {
          if (this.singleNote.codes[i].code !== this.noteForm.value.codes[i].code ||
            this.singleNote.codes[i].description !== this.noteForm.value.codes[i].description ||
            this.singleNote.codes[i].language !== this.noteForm.value.codes[i].language) {
              this.isNoteChanged = true;
          }
        } 
      }
    }
  }

  refreshLanguageHighlight(codeCard: CodeCard) {
    if(codeCard.codeForm.value.code !== '') {
      codeCard.isRefreshingCodeLanguage = true;
      const alias = this.codeLanguages.find(l => l.language === codeCard.codeForm.value.language)?.alias;
      codeCard.languageAlias = alias;
      codeCard.isEditMode = true;
      setTimeout(() => {
        codeCard.isEditMode = false;
        codeCard.isRefreshingCodeLanguage = false;
      }, 500);
    }
  }

  onAddCode(insertAt?: number, code?: CodeSnippet, isEditMode: boolean = true) {
    let codeForm: FormGroup = this.formBuilder.group({});
    if(code) {
      codeForm = this.formBuilder.group({
        id: [code.id],
        code: [code.code, Validators.required],
        description: [code.description],
        language: [code.language ? code.language : 'Plain Text', Validators.required]
      });
    } else {
      codeForm = this.formBuilder.group({
        code: ['', Validators.required],
        description: [''],
        language: ['Plain Text', Validators.required]
      });
    }
    const newCodeCard = {
      codeForm: codeForm,
      isEditMode: isEditMode,
      isRefreshingCodeLanguage: false
    };
    if(insertAt !== undefined) {
      this.codeCards.splice(insertAt, 0, newCodeCard);
      this.codes.insert(insertAt, codeForm);
    }
    else {
      this.codeCards.push(newCodeCard);
      this.codes.push(codeForm);
    }
  }

  onDeleteCode(id: number) {
    this.codes.removeAt(id);
    this.codeCards.splice(id, 1);
  }

  onAddTag(tagName: string) {
    let codetagsArray: string[] = this.codetags.value.map((t: Codetag) => t.name);
    if(!codetagsArray.find(tag => tag.toLocaleLowerCase() === tagName.toLocaleLowerCase())) {
      this.codetags.push(this.formBuilder.control({ name: tagName }));
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
      this.areTagsFound = true;
    } else this.areTagsFound = false;
  }

  enableTagsEditingMode() {
    this.tagsEditingMode = true;
  }

  disableTagsEditingMode() {
    this.tagsEditingMode = false;
  }

  enableCodeEditingMode(codeCard: CodeCard) {
    codeCard.isEditMode = true;
  }

  disableCodeEditingMode(codeCard: CodeCard) {
    codeCard.isEditMode = false;
  }

  onSubmitForm() {
    //ADD CODE SNIPPETS LANGUAGES AS TAGS
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
    for(let codeCard of this.codeCards) {
      codeCard.isEditMode = false;
    }
    if(!this.singleNote) {
      this.noteService.addNote(this.noteForm.value).pipe(
        tap(note => {
          this.router.navigateByUrl(`/notes/${note.id}`);
        })
      ).subscribe();
    } else {
      const noteToEdit: Note = {
        id: this.singleNote.id,
        ...this.noteForm.value,
      }
      this.noteService.editNote(noteToEdit).pipe(
        tap(note => {
          this.router.navigateByUrl(`/notes/${note.id}`);
          this.isNoteChanged = false;
        })
      ).subscribe();
    }

  }
}

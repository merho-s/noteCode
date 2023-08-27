import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CodeSnippet } from 'src/app/core/models/codesnippet.model';
import { NoteService } from 'src/app/core/services/note.service';
import { TagService } from 'src/app/core/services/tag.service';
import { CODES_LANGUAGES } from 'src/app/shared/global_constants/languages.const';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  codeLanguages: string[] = CODES_LANGUAGES.map(l => l.language);
  noteForm!: FormGroup;
  tagSearch!: string;
  allTags!: string[];
  searchedTags!: string[];
  tagsFound: boolean = false;
  @Input() newCode!: CodeSnippet;
  
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
    this.tagService.getAllCodetags().subscribe(tags => this.allTags = tags);
    this.noteForm = this.formBuilder.group({
      title: [''],
      description: [''],
      codetags: this.formBuilder.array([]),
      codes: this.formBuilder.array([])
    });
  }

  onAddCode() {
    const codeForm = this.formBuilder.group({
      code: ['', Validators.required],
      description: [''],
      language: ['', Validators.required]
    });
    this.codes.push(codeForm);
  }

  onDeleteCode(id: number) {
    this.codes.removeAt(id);
  }

  onAddTag(tagName: string) {
    //THIS IS THE OLD TAG ADD METHOD
    // const tagForm = this.formBuilder.group({
    //   name: [tagName, Validators.required]
    // });
    // const tagCtrl = [tagName, Validators.required]
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

  onSubmitForm() {
    for(let c of this.codes.value) {
      if (c.language !== 'Plain Text') {
        this.onAddTag(c.language);
        console.log('plaon');
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

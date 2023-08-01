import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CodeSnippet } from 'src/app/core/models/codesnippet.model';
import { Note } from 'src/app/core/models/note.model';
import { NoteService } from 'src/app/core/services/note.service';
import { TagService } from 'src/app/core/services/tag.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  noteForm!: FormGroup;
  tagSearch!: string;
  allTags!: string[];
  searchedTags!: string[];
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
      title: ['', Validators.required],
      description: ['', Validators.required],
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
    // const tagForm = this.formBuilder.group({
    //   name: [tagName, Validators.required]
    // });
    // const tagCtrl = [tagName, Validators.required]
    this.codetags.push(this.formBuilder.control(tagName));
    console.log(this.codetags);
  }

  onDeleteTag(id: number) {
    this.codetags.removeAt(id);
  }

  onSearchTyping(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if(inputValue !== '') {
      if(inputValue.length <= 1) {
        this.searchedTags = this.allTags.filter(value => value.toLocaleLowerCase().startsWith(inputValue.toLocaleLowerCase()));
      } else this.searchedTags = this.allTags.filter(value => value.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()));
    } else this.searchedTags = []
  }

  onSubmitForm() {
    console.log(this.noteForm.value);
    this.noteService.addNote(this.noteForm.value).pipe(
      tap(note => {
        this.router.navigateByUrl(`/notes/${note.id}`);
      })
    ).subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { categories } from '../categories';
import { Books } from '../books.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeform!: FormGroup

  categoriesForm: any;
  categories = categories;


  books: Books[] = []
  author: any;

  constructor(public http: HttpClient) {

   }

  ngOnInit(): void {
    this.homeform = new FormGroup({
      categoriesForm: new FormControl(null, Validators.required)
    })
  }

  getCategory(): Observable<any>{
    return this.http.get('https://openlibrary.org/subjects/' +
    this.homeform.controls['categoriesForm'].value + '.json')
  }

  getData(){
    try {
      this.getCategory().subscribe((data: any) => {
        this.books = data.works;
      })
    }
    catch(error){
      console.log(error);
    }
  }

  onSubmit(){
    this.getData()
  }


}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Books } from '../books.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  key: any;
  book: any;
  description: any;


  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.book = new Object();
   }

  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get("key");
    this.getData();
  }

  getDetail(): Observable<any>{
    return this.http.get<Books[]>('https://openlibrary.org' + this.key + '.json');
  }

  getData(){
    try {
      this.getDetail().subscribe((data: any) => {
        this.book = data;
        this.description = this.book.description;
      })
    }
    catch(error){
      console.log(error);
    }
  }
  }



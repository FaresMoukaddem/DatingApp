import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private http: HttpClient) { }

  books: any;

  ngOnInit() 
  {
    this.GetBooks();
  }

  private GetBooks()
  {
    this.http.get("http://localhost:5000/book").subscribe(resp => 
    {
      this.books = resp;
    }, error => 
    {
      console.log(error);
    });
  }
}

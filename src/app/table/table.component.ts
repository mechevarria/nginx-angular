import {Component, OnInit} from '@angular/core';
import {MessageService} from '../services/message.service';
import {CommentService} from '../services/comment.service';
import {Comment} from '../comment';
import {PaginationConfig, PaginationEvent, TableConfig} from 'patternfly-ng';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  constructor(private messageService: MessageService, private commentService: CommentService) {
  }

  viewName = 'Table View';
  rows: Comment[];
  allRows: Comment[];

  columns: any[] = [
    {name: 'ID', prop: 'id', sortable: false},
    {name: 'Post ID', prop: 'postId', sortable: false},
    {name: 'Name', prop: 'name', sortable: false},
    {name: 'E-Mail', prop: 'email', sortable: false},
    {name: 'Body', prop: 'body', sortable: false}
  ];

  paginationConfig: PaginationConfig = {
    pageSize: 5,
    pageNumber: 1,
    totalItems: 0
  };

  tableConfig: TableConfig = {
    showCheckbox: false,
    paginationConfig: this.paginationConfig
  };

  handlePage($event: PaginationEvent): void {
    this.updateRows();
  }

  updateRows(): void {
    this.rows = this.allRows.slice((this.paginationConfig.pageNumber - 1) * this.paginationConfig.pageSize,
      this.paginationConfig.totalItems).slice(0, this.paginationConfig.pageSize);
  }

  load(): void {
    this.commentService.getComments()
      .subscribe(res => {
        this.allRows = res;

        if (this.allRows.length > 0) {
          this.messageService.success(`Successfully loaded ${this.allRows.length} comments from service`);
          this.paginationConfig.totalItems = this.allRows.length;
          this.updateRows();
        }
      });
  }

  clear(): void {
    this.allRows = [];
    this.messageService.info('Cleared data');
    this.updateRows();
  }

  ngOnInit() {
  }

}

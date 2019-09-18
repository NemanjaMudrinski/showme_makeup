import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  clients : Client[] = [];
  student : Client = new Client();
  displayedColumns: string[] = ['id', 'personalData.firstName', 'personalData.lastName'];
  dataSource = new MatTableDataSource<Client>(this.clients);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientService: ClientService) {

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  getAll(){
    this.clientService.getAll().subscribe((data: Client[]) => {
      this.clients = data;
      this.dataSource.data = data;
      this.dataSource.filterPredicate = function(data, filter): boolean {
        return data.personalData.firstName.toLowerCase().includes(filter) ||
                data.personalData.lastName.toLowerCase().includes(filter) ; 
                // data.personalData.phoneNumber.toLowerCase().includes(filter) ||
                // data.personalData.profileImagePath.toLowerCase().includes(filter) || 
                // data.accountData.email.toLowerCase().includes(filter) ||
                // data.accountData.username.toLowerCase().includes(filter);
      };
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

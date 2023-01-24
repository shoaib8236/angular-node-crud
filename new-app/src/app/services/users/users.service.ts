import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrls = 'http://localhost:8080';
  endpoints = {
    users: '/users-data',
    deleteUsers: '/delete-user',
    addUser: '/add-user',
    updateUser: '/update-user',
  };

  constructor(private http: HttpClient) {}

   getUsers() {
    return this.http.get(`${this.baseUrls}${this.endpoints.users}`);
  }
  deleteUsers(ids: any) {
    return this.http.delete(
      `${this.baseUrls}${this.endpoints.deleteUsers}/${ids}`
    );
  }
  addUser(data: object) {
    return this.http.post(`${this.baseUrls}${this.endpoints.addUser}`, data);
  }
  updateUser(data: object, id: string) {
    return this.http.put(
      `${this.baseUrls}${this.endpoints.updateUser}/${id}`,
      data
    );
  }
}

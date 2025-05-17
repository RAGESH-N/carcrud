import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://localhost:3000/api/cars'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all cars
  getCars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Update car data
  updateCar(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Book a car
  bookCar(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/book/${id}`, {});
  }
  cancelBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cancel/${bookingId}`);
  }
  deleteCar(carId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${carId}`);
  }
}


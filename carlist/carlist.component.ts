import { Component, OnInit } from '@angular/core';
import { CarService } from '../servies/car-service.service';

interface RentalDetails {
  pricePerKm: number;
  discount: number;
  perDayCost: number;
}

interface Car {
  _id: string;
  name: string;
  image: string;
  model: string;
  type: 'basic' | 'mid-range' | 'high-end';
  rentalDetails: RentalDetails;
  userDistance?: number;
  rentalDays?: number;
  details: string;
  gearType: 'manual' | 'automatic';
  isFrequentRenter?: boolean;
  loyaltyPoints?: number;
  extraDiscountRides?: number;
}

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css'],
})
export class CarlistComponent implements OnInit {
  cars: Car[] = [];
  selectedType: string = 'all';
  selectedGearType: string = 'all';
  editingCarId: string | null = null; // Track which car is being edited

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.fetchCars();
  }

  fetchCars(): void {
    this.carService.getCars().subscribe(
      (data) => {
        this.cars = data;
      },
      (error) => {
        console.error('Error fetching cars:', error);
      }
    );
  }

  enableEdit(carId: string): void {
    this.editingCarId = carId; // Set the car ID being edited
  }

  saveCar(car: Car): void {
    this.carService.updateCar(car._id, car).subscribe(
      (response) => {
        alert(`Car ${car.name} updated successfully!`);
        this.editingCarId = null; // Exit edit mode
        this.fetchCars(); // Refresh the car list
      },
      (error) => {
        console.error('Error updating car:', error);
      }
    );
  }

  cancelEdit(): void {
    this.editingCarId = null; // Exit edit mode without saving
  }
  deleteCar(carId: string): void {
  console.log('Attempting to delete car with ID:', carId); // Debug log
  if (confirm('Are you sure you want to delete this car?')) {
    this.carService.deleteCar(carId).subscribe(
      (response) => {
        console.log('Delete response:', response); // Debug log
        alert('Car deleted successfully.');
        this.fetchCars(); // Refresh the car list
      },
      (error) => {
        console.error('Error deleting car:', error);
        alert('Failed to delete the car. Please try again.');
      }
    );
  }
}
}
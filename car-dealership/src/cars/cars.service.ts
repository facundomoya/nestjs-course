import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
    private cars: Car[] = [
  /*       {
            id: uuidv4(),
            brand: "Toyota",
            model: "Corolla"
        }  */
    ]

    findAllCars() {
        return this.cars;
    }

    findCarById(id: string) {
        const car = this.cars.find(car => car.id === id);
        if (!car) {
            throw new NotFoundException();
        }
        return car;
    }

    updateCar(id: string, updateCarDto: UpdateCarDto) {//siempre viene el id
        let carDB = this.findCarById(id);
        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id
                }
            return carDB;
            }
         return car;
        }
        )

        return carDB;
    }

    create(createCarDto: CreateCarDto) {
        const car = {
            id: uuidv4(),
            ...createCarDto
        }
        this.cars.push(car);
        return car;
    }

    deleteCar(id: string) {
        const car = this.findCarById(id);
        this.cars = this.cars.filter(car => car.id !== id);
        return car;
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }
}

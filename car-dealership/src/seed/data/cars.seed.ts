import { Car } from "src/cars/interfaces/car.interface";
import { v4 as uuid } from 'uuid';

export const CARS_SEED: Car[] = [
{
    id: uuid(),
    brand: "Fiat",
    model: "Toro"
},

{
    id: uuid(),
    brand: "Chevrolet",
    model: "Camaro"
},
{
    id: uuid(),
    brand: "Ford",
    model: "Mustang"
}
]
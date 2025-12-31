import { Brand } from '../../brands/entities/brand.entity';
import { v4 as uuid } from 'uuid';

export const BRANDS_SEED: Brand[] = [
{
    id: uuid(),
    name: "Fiat",
    createdAt: new Date()
},

{
    id: uuid(),
    name: "Chevrolet",
    createdAt: new Date()
},
{
    id: uuid(),
    name: "Ford",
    createdAt: new Date()
}
]
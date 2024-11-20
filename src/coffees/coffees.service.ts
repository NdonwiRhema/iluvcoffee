import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees = [
        {
            id:'1',
            brand:'Ship',
            name:'Brewed',
            flavors:["chocolate","strawberry"]
        },
    ];

    findAll(){
        return this.coffees;
    }
    findOne(id:string){
        const cofee = this.coffees.filter(item => item.id === id)
        if(!cofee || cofee.length === 0){
            throw new NotFoundException(`Coffee ${id} not found`)
        }
        return cofee
    }

    create(coffeeDetail){
      this.coffees.push(coffeeDetail)
      return coffeeDetail
    }

    update(id : string, data):boolean{
        console.log(data)
        const coffeeExist = this.findOne(id)
        if(coffeeExist.length >0){
            // update the existing
            const coffeeNotExisting = this.coffees.filter(item => item!== coffeeExist[0])
            const newCoffeeObject = [...[data],...coffeeNotExisting]
            this.coffees = newCoffeeObject
            console.log(this.coffees)
            return true
        }
       return false
    }
    

    remove (id :string): boolean {
        const coffeeIndex = this.coffees.findIndex(item => item.id === id)
        if(coffeeIndex >= 0){
             this.coffees.splice(coffeeIndex,1)
             return true
        }

        return false       
    }

}

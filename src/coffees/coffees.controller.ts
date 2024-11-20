import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeesService){}
   @Get()
   findAll(@Query() paginationQuery){
        // const {limit,offset} =paginationQuery
       
        // response.status(200).send('Gets all coffees') // the express way 
        //Advised to use the nestjs way inorder to use interceptors provided by nest
       return this.coffeeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:number){
        console.log(typeof id)
        return this.coffeeService.findOne(''+id)
    }

    @Post()
    // @HttpCode(HttpStatus.GONE)
    create(@Body() createCoffeeDto:CreateCoffeeDto){
        console.log(createCoffeeDto instanceof CreateCoffeeDto)
      return this.coffeeService.create(createCoffeeDto)
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updateCoffeeDto:UpdateCoffeeDto){      
       if(this.coffeeService.update(id,updateCoffeeDto)){
        return ' updated successfully'
       }
       return 'Failed to update'
    }

    @Delete(':id')
    remove(@Param('id') id:string){
       return this.coffeeService.remove(id)
    }
}

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ElecteursService } from './electeurs.service';
import { electeur } from './electeurs.entity';

@Controller('electeurs')
export class ElecteursController {
    constructor(private readonly electeursService: ElecteursService) {}

    @Post()
    async create(@Body() electeurData: Partial<electeur>): Promise<electeur> {
        return await this.electeursService.create(electeurData);
    }

    @Get()
    async findAll(): Promise<electeur[]> {
        return await this.electeursService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<electeur> {
        return await this.electeursService.findOne(Number(id));
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateData: Partial<electeur>,
    ): Promise<electeur> {
        return await this.electeursService.update(Number(id), updateData);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return await this.electeursService.remove(Number(id));
    }
}
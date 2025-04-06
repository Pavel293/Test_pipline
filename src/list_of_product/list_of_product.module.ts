import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListOfProduct } from './list_of_product.entity';
import { ListOfProductController } from './list_of_product.controller';
import { ListOfProductService } from './list_of_product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ListOfProduct])],
  controllers: [ListOfProductController],
  providers: [ListOfProductService],
  exports: [ListOfProductService],
})
export class ListOfProductModule {}

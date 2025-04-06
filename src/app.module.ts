import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { ListOfProductModule } from './list_of_product/list_of_product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Apuzis_60',
      database: 'merchstore_sunrent_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EmployeeModule,
    OrderModule,
    ProductModule,
    ListOfProductModule,
  ],
})
export class AppModule {}

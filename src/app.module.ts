import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsModule } from './document/document.module';
import { IngestionModule } from './ingestion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // or your database type
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DocumentsModule,
    IngestionModule,
  ],
})
export class AppModule {}

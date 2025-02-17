import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opening } from './opening.entity';
import { OpeningService } from './opening.service';

@Module({
  imports: [TypeOrmModule.forFeature([Opening])],
  controllers: [],
  providers: [OpeningService],
  exports: [OpeningService],
})
export class OpeningModule {}

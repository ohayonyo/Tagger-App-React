// database.module.ts
import { Module } from '@nestjs/common';
import { DatabaseService } from '../services/database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], // Make DatabaseService available for injection in other modules
})
export class DatabaseModule {}
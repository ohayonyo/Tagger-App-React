import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'mydb.db',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true
  // Add any other configuration options you need
};

export default config;
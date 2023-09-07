import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FileSharingController } from './file-sharing/file-sharing.controller';

@Module({
  imports: [],
  controllers: [AppController, FileSharingController],
  providers: [],
})
export class AppModule {}

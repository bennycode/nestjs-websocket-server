import {Module} from '@nestjs/common';
import {ChatModule} from './chat/ChatModule';

@Module({
  controllers: [],
  imports: [ChatModule],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';

@Module({
    imports: [],
    providers: [
        BoardsService, //
        BoardsResolver, //
    ], // 의존성주입 -> new AppController(AppService)
})
export class BoardsModule {}

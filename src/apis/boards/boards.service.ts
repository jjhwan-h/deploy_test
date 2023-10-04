import { Injectable, Scope } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { IBoardServiceCreate } from './interfaces/boards-service.interface';
// DEFAULT -> singleTon
// Request -> 매 요청마다
// Transient -> 매 주입마다
@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
    findAll(): Board[] {
        const result = [
            { number: 1, writer: 'jang', title: '1', contents: '1234' },
            { number: 2, writer: 'jeong', title: '2', contents: '5678' },
            { number: 3, writer: 'hwan', title: '3', contents: '9101112' },
        ];

        return result;
    }

    create({ createBoardInput }: IBoardServiceCreate): string {
        console.log(createBoardInput.writer);
        console.log(createBoardInput.title);
        console.log(createBoardInput.contents);

        return 'success';
    }
}

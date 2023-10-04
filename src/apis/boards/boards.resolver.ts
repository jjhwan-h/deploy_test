import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
// @Controller()
@Resolver()
export class BoardsResolver {
    constructor(
        private readonly boardsService: BoardsService, //
    ) {}

    //   @Get('/products/buy')
    //메서드의 반환타입과 데코레이터의 반환값은 일치하여야한다.
    @Query(() => [Board], { nullable: true })
    fetchBoard(): Board[] {
        return this.boardsService.findAll();
    }

    @Mutation(() => String)
    createBoard(
        // @Args({ name: 'writer', nullable: true }) writer: string,
        // @Args('title') title: string,
        // @Args('contents') contents: string,
        @Args('createBoardInput') createBoardInput: CreateBoardInput,
    ): string {
        // const { writer, title, contents } = createBoardInput;
        return this.boardsService.create({ createBoardInput });
    }
}

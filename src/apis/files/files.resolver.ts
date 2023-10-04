import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
//yarn add grapqhl-upload -> js버전 , yarn add @types/graphql-upload -> typescript버전 방식

@Resolver()
export class FilesResolver {
    constructor(
        private readonly filesService: FilesService, //
    ) {}

    @Mutation(() => String)
    uploadFile(
        //브라우저에서 파일 받아온다.
        //GraphQlUpload -> gql의 타입, FileUpload -> ts의 타입
        @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    ): string {
        return this.filesService.upload({ file });
    }
}

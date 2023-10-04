import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
    upload({ file }: IFilesServiceUpload): string {
        console.log(file);
        //1. 파일을 클라우드 스토리지에 저장

        // 1-1) 스토리지세팅
        const storage = new Storage({
            projectId: 'backend-397418',
            keyFilename: 'backend-397418-0d66bc85c8f7.json',
        }).bucket('jjh-storage');
        //1-2) 스토리지에 파일업로드
        //await는 promise에 붙일 수 있다.(ex axios.get(), fetch...)
        //file.createReadStream을 promise로 바꾸어줘야한다.
        file.createReadStream()
            .pipe(storage.file(file.filename).createWriteStream())
            .on('finish', () => {
                console.log('성공');
            })
            .on('error', () => {
                console.log('실패');
            });

        console.log('파일 전송이 완료되었습니다.');

        return 'complete';
    }
}

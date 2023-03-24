import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { ErrorHelper } from '../../helpers';
import { ILinkResponse } from '../../interfaces';
import { IImgurResponse } from './../../interfaces/imgur';

@Injectable()
export class CloudsService {
  constructor(private readonly httpService: HttpService) {}

  async uploadImage(image: Express.Multer.File): Promise<ILinkResponse> {
    const base64FromBuffer = Buffer.from(image.buffer).toString('base64');

    const data = {
      image: base64FromBuffer,
      type: 'base64',
      name: image.originalname,
      title: image.originalname,
      desc: image.originalname,
    };

    const uploadedImage = await firstValueFrom<any>(
      this.httpService
        .post('https://api.imgur.com/3/upload/', data, {
          headers: {
            Authorization: 'Bearer bbf7699055fe8e4b429ee5ad367e969ab7e94a68',
          },
        })
        .pipe(
          catchError((err): any => {
            console.log({ err: err });
            ErrorHelper.ForbiddenException('API not available');
          }),
        ),
    );

    const imgurResponse: IImgurResponse = uploadedImage?.data;

    return {
      link: imgurResponse.data.link,
    };
  }
}

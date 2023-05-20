import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards';
import { IPaginationResponse } from '../../interfaces';
import { BannersService } from './banners.service';
import { Banner } from '../../entities/banners.entity';
import { CreateBannerDto, GetFilterBannersDto, UpdateBannerDto } from './dto/banners.dto';

@Controller('banners')
@UseGuards(AuthGuard(), RolesGuard)
export class BannersController {
  constructor(private bannersService: BannersService) {}

  @Post()
  create(@Body() createBannerDto: CreateBannerDto): Promise<string> {
    return this.bannersService.create(createBannerDto);
  }

  @Get()
  readList(
    @Query() getFilterBanners: GetFilterBannersDto,
  ): Promise<IPaginationResponse<Banner[]>> {
    return this.bannersService.readList(getFilterBanners);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/:id')
  readOne(@Param('id') id): Promise<Banner> {
    return this.bannersService.readOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
  ): Promise<string> {
    return this.bannersService.update(Number(id), updateBannerDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<string> {
    return this.bannersService.delete(id);
  }
}

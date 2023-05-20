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
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto, GetFilterVoucherDto, UpdateVoucherDto } from './dto/vouchers.dto';
import { Voucher } from '../../entities/vouchers.entity';

@Controller('vouchers')
@UseGuards(AuthGuard(), RolesGuard)
export class VouchersController {
  constructor(private voucherService: VouchersService) {}

  @Post()
  create(@Body() createBannerDto: CreateVoucherDto): Promise<string> {
    return this.voucherService.create(createBannerDto);
  }

  @Get()
  readList(
    @Query() getFilterBanners: GetFilterVoucherDto,
  ): Promise<IPaginationResponse<Voucher[]>> {
    return this.voucherService.readList(getFilterBanners);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/:id')
  readOne(@Param('id') id): Promise<Voucher> {
    return this.voucherService.readOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateVoucherDto,
  ): Promise<string> {
    return this.voucherService.update(Number(id), updateBannerDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<string> {
    return this.voucherService.delete(id);
  }
}

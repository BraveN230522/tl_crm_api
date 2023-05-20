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
import { UserDecorator } from '../../common';
import { RolesGuard } from '../../common/guards';
import { Campaign } from '../../entities/campaigns.entity';
import { IPaginationResponse } from '../../interfaces';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto, GetCampaignDto, UpdateCampaignDto } from './dto/campaigns.dto';

@Controller('campaigns')
@UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class CampaignsController {
  constructor(private campaignsService: CampaignsService) {}

  @Post()
  create(
    @Body() createBannerDto: CreateCampaignDto,
    @UserDecorator() currentUser,
  ): Promise<string> {
    return this.campaignsService.create(createBannerDto, currentUser);
  }

  @Get()
  readList(@Query() getFilterBanners: GetCampaignDto): Promise<IPaginationResponse<Campaign[]>> {
    return this.campaignsService.readList(getFilterBanners);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/:id')
  readOne(@Param('id') id): Promise<Campaign> {
    return this.campaignsService.readOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateCampaignDto): Promise<string> {
    return this.campaignsService.update(id, updateBannerDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<string> {
    return this.campaignsService.delete(id);
  }
}

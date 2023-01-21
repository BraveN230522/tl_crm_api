import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersRepository } from './members.repository';

@Injectable()
export class MembersService {
  constructor(@InjectRepository(MembersRepository) private membersRepository: MembersRepository) {}
}

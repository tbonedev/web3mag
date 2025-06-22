import { Uuid } from 'src/common/types/common.type';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SYSTEM_USER_ID } from 'src/constants/app.constant';
import { ErrorCode } from 'src/constants/error-code.constant';
import { UserEntity } from './entities/user.entity';
import { UserResDto } from './dto/user.res.dto';
import { CreateUserReqDto } from './dto/create-user.req.dto';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { ValidationException } from 'src/common/exceptions/validation.exception';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserReqDto): Promise<UserResDto> {
    const { username, email, password } = dto;

    const user = await this.userRepository.findOne({
      where: [
        {
          username,
        },
        {
          email,
        },
      ],
    });

    if (user) {
      throw new ValidationException(ErrorCode.E001); //
    }

    const newUser = new UserEntity({
      username,
      email,
      password,
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });

    const savedUser = await this.userRepository.save(newUser);
    this.logger.debug(savedUser);

    return plainToInstance(UserResDto, savedUser);
  }

  async findOne(id: Uuid): Promise<UserResDto> {
    // security check
    const user = await this.userRepository.findOneByOrFail({ id });

    return user.toDto(UserResDto);
  }

  // create update func

  async remove(id: Uuid) {
    await this.userRepository.findOneByOrFail({ id });
    await this.userRepository.softDelete(id);
  }
}

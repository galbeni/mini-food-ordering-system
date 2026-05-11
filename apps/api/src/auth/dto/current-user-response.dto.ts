import { ApiProperty } from '@nestjs/swagger';

export class CurrentUserResponseDto {
  @ApiProperty({
    example: '8f1d7f2e-5c92-4f8e-b8f1-b4d4df4c6d91',
  })
  id!: string;

  @ApiProperty({
    example: 'John Customer',
  })
  name!: string;

  @ApiProperty({
    example: 'john@example.com',
  })
  email!: string;

  @ApiProperty({
    example: '2026-05-11T10:00:00.000Z',
  })
  createdAt!: Date;
}

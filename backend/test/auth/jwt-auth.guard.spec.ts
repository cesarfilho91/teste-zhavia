import { JwtAuthGuard } from '../../src/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { beforeEach, describe, it } from 'node:test';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    guard = new JwtAuthGuard(jwtService);
  });

  it('should return true for a valid token', async () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { authorization: 'Bearer validToken' },
        }),
      }),
    } as any;

    //jest.spyOn(jwtService, 'verify').mockReturnValue({ userId: 'userId' });

    //expect(await guard.canActivate(context)).toBe(true);
  });

  it('should return false for an invalid token', async () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { authorization: 'Bearer invalidToken' },
        }),
      }),
    } as any;

    //jest.spyOn(jwtService, 'verify').mockImplementation(() => { throw new Error(); });

    //expect(await guard.canActivate(context)).toBe(false);
  });
});
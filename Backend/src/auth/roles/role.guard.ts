import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  roles: string | string[];
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // No roles defined, allow access
    }

    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.substring(7);
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        const user_role = decodedToken.roles;
        const user_id = decodedToken.id;
        console.log(user_role);
        console.log(user_id);

        if (!user_role) {
          return false;
        }

        const userRoles = Array.isArray(user_role) ? user_role : [user_role];

        const hasRequiredRoles = requiredRoles.some((role) => userRoles.includes(role));

        return hasRequiredRoles;
      } catch (error) {
        console.error('Token verification failed:', error.message);
        throw new UnauthorizedException('Invalid token');
      }
    } else {
      throw new UnauthorizedException('No JWT Token found in the Authorization header');
    }
  }
}
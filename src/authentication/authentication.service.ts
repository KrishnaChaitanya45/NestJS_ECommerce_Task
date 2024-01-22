import { Injectable } from '@nestjs/common';
import { Register_User, User } from './dto/USER.dto';
import { JwtService } from '@nestjs/jwt';
import { promises as fs } from 'fs';
@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}
  async registerUser(user: Register_User) {
    try {
      const usersJson = await fs.readFile('src/db/users.json', 'utf-8'); // Read the users.json file
      const { users } = JSON.parse(usersJson); // Parse the JSON string into an object
      const UserExists = users.find((u: User) => u.email === user.email);
      if (UserExists) {
        return {
          success: false,
          error: 'User already exists',
        };
      }
      const userToAppend = {
        ...user,
        id: users.length + 1,
        cart: [],
        token: null,
      };
      const payload = { id: userToAppend.id, email: userToAppend.email };
      const jwtToken = this.jwtService.sign(payload);
      userToAppend.token = jwtToken;
      await fs.writeFile(
        'src/db/users.json',
        JSON.stringify({ users: [...users, userToAppend] }),
      );
      return {
        success: true,
        token: jwtToken,
        user: userToAppend,
      };
    } catch (error) {
      console.log('ERROR', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getUsers() {
    try {
      const usersJson = await fs.readFile('src/db/users.json', 'utf-8');
      const { users } = JSON.parse(usersJson);
      return {
        success: true,
        users: users,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

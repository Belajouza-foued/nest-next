import { Controller, Get, Param, Delete, Put, Body, UseGuards,Request,ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Pour protéger les routes
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard) // Toutes les routes ici nécessitent un JWT valide
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
//pour editer//
  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user._id);
  }
//por editer//
  // Récupérer tous les utilisateurs
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Récupérer un utilisateur par ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // Modifier un utilisateur
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    if (req.user._id !== id) {
      throw new ForbiddenException('Tu ne peux modifier que ton propre profil');
    }
    return this.usersService.update(id, updateUserDto);
  }

  // Supprimer un utilisateur
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

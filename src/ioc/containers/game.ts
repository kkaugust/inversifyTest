import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from '../types/game';
import { Warrior, Weapon, ThrowableWeapon } from '../../interfaces/game';
import { Ninja, Katana, Shuriken } from '../../entities/game';

let warriors = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
  bind<Warrior>(TYPES.Warrior).to(Ninja);
});

let weapons = new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind
  ) => {
    bind<Weapon>(TYPES.Weapon).to(Katana);
    bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);
  }
);

let gameContainer = new Container();
gameContainer.load(warriors, weapons);

export { gameContainer };

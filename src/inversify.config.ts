import { gameContainer } from './ioc/containers/game';
import { TYPES } from './ioc/types/game';
import { Warrior } from './interfaces/game';

export const ninja = gameContainer.get<Warrior>(TYPES.Warrior);

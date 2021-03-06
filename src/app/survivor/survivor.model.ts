import { SurvivorLevel } from './survivor-level.model';
import { SurvivorBox } from './survivor-box.model';

export interface Survivor {
    name: string;
    codename: string;
    level: SurvivorLevel;
    box: SurvivorBox;
}

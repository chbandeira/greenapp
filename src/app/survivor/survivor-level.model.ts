import { SkillContent } from '../skill/skill-content.model';

export interface SurvivorLevel {
    blue: string[];
    yellow: string[];
    orange: string[];
    red: string[];
    skillBlue?: SkillContent[];
    skillYellow?: SkillContent[];
    skillOrange?: SkillContent[];
    skillRed?: SkillContent[];
}

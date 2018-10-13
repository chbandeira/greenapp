import { SkillDetail } from './skill-detail.model';

export interface SkillContent {
    en: SkillDetail;
    pt: SkillDetail;
    exclusive?: string;
}

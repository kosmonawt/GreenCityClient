import { HabitTranslationDto } from './HabitTranslationDto';

export class HabitItemDto {
      id: number;
      image: string;
      defaultDuration: number;
      habitTranslation: HabitTranslationDto;
}

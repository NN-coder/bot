import { students } from '../collections.ts';
import { Command } from '../types/bot.ts';
import { Role } from '../types/schemas.ts';

export const studentListCommand: Command = async (context, next) => {
  if (context.session.student?.role !== Role.ASHOT) {
    await context.reply(
      'У тебя недостаточно прав для выполнения этой команды(',
    );
  } else {
    const allStudents = await students.find().toArray();

    await context.reply(
      allStudents.map(({ name, group, stars, hearts, usedWords }) =>
        [
          `Имя - ${name}`,
          `Группа - ${group}`,
          `Звёзды - ${stars}`,
          `Жизни - ${hearts}`,
          `Использованные ключевые слова - ${usedWords.join(', ')}`,
        ].join('\n')
      ).join('\n\n'),
    );
  }

  return next();
};

studentListCommand.description = 'Вывести список студентов';

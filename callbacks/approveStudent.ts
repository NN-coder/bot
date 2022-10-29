import { prismaClient } from '../prisma/mod.ts';
import { Callback } from '../types/Callbacks.ts';

export const approveStudentCallback: Callback = async (context, next) => {
  const { tgChatId } = await prismaClient.student.update({
    where: { id: BigInt(context.callbackQuery.data.split(':')[1]) },
    data: { isApproved: true },
  });

  await context.reply('✅ Студент подтверждён.');

  await context.api.sendMessage(
    Number(tgChatId),
    '✅ Куратор принял тебя в проект.',
  );

  return next();
};

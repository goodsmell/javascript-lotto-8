import { MissionUtils } from '@woowacourse/mission-utils';
import { RANK_INFO } from '../constants/prize.js';
export const Output = {
  printIssuedLottos: (lottos) => {
    MissionUtils.Console.print(`\n${lottos.length}개를 구매했습니다.`);
    lottos.forEach((ticket) => {
      MissionUtils.Console.print(`[${ticket.getNumbers().join(', ')}]`);
    });
  },

  printResult: (stat, yields) => {
    MissionUtils.Console.print('\n당첨 통계');
    MissionUtils.Console.print('---');
    RANK_INFO.forEach(({ key, text, prize }) => {
      const count = stat[key] ?? 0;
      MissionUtils.Console.print(`${text} (${prize.toLocaleString()}원) - ${count}개`);
    });

    MissionUtils.Console.print(`총 수익률은 ${yields.toFixed(1)}%입니다.`);
  },

  printErrorMessage: (message) => {
    MissionUtils.Console.print(message);
  },
};

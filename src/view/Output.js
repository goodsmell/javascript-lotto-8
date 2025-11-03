import { MissionUtils } from '@woowacourse/mission-utils';
import { RANK_INFO } from '../constants/prize.js';
import { OUTPUT_MESSAGE } from '../constants/messages.js';
export const Output = {
  printIssuedLottos: (lottos) => {
    MissionUtils.Console.print(OUTPUT_MESSAGE.PURCHASE_RESULT(lottos.length));
    lottos.forEach((ticket) => {
      MissionUtils.Console.print(`[${ticket.getNumbers().join(', ')}]`);
    });
  },

  printResult: (stat, yields) => {
    MissionUtils.Console.print(OUTPUT_MESSAGE.RESULT_TITLE);
    MissionUtils.Console.print(OUTPUT_MESSAGE.RESULT_DIVIDER);
    RANK_INFO.forEach(({ key, text, prize }) => {
      const count = stat[key] ?? 0;
      MissionUtils.Console.print(`${text} (${prize.toLocaleString()}원) - ${count}개`);
    });

    MissionUtils.Console.print(OUTPUT_MESSAGE.PROFIT_RATE(yields.toFixed(1)));
  },

  printErrorMessage: (message) => {
    MissionUtils.Console.print(message);
  },
};

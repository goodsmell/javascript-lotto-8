import { MissionUtils } from '@woowacourse/mission-utils';
import { RANK_INFO } from '../constants/prize.js';
export const Output = {
  printIssuedLottos: (lottos) => {
    MissionUtils.Console.print(`\n${lottos.length}개를 구매했습니다.`);
    lottos.forEach((ticket) => {
      MissionUtils.Console.print(`[${ticket.getNumbers().join(', ')}]`);
    });
  },

};

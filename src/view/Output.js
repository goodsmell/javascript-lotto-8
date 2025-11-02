import { MissionUtils } from '@woowacourse/mission-utils';

export const Output = {
  printIssueLottosCount: (count) => {
    MissionUtils.Console.print('');
    MissionUtils.Console.print(`${count}개를 구매했습니다.`);
  },
  printIssuedLottos: (lottos) => {
    MissionUtils.Console.print(lottos);
  },

};

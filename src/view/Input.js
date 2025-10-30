import { MissionUtils } from '@woowacourse/mission-utils';

export const Input = {
  askPurchaseAmount: async () => MissionUtils.Console.readLineAsync('구입금액을 입력해 주세요.\n'),
};

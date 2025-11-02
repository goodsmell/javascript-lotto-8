import { MissionUtils } from '@woowacourse/mission-utils';

export class Input {
  static async askWinningNumber() {
    const input = await MissionUtils.Console.readLineAsync('당첨 번호를 입력해주세요.\n');
    return input; 
  }

  static async askPurchaseAmount() {
    const input = await MissionUtils.Console.readLineAsync('구입금액을 입력해주세요.\n');
    return input; 
  }
}

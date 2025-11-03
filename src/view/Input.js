import { MissionUtils } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from '../constants/messages.js';
export class Input {
  static async askWinningNumber() {
    const input = await MissionUtils.Console.readLineAsync(INPUT_MESSAGE.WINNING_NUMBER);
    return input;
  }

  static async askPurchaseAmount() {
    const input = await MissionUtils.Console.readLineAsync(INPUT_MESSAGE.PURCHASE_AMOUNT);
    return input;
  }
  static async askBonusNumber() {
    const input = await MissionUtils.Console.readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
    return input;
  }
}

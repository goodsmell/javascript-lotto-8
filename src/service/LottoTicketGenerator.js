import { MissionUtils } from '@woowacourse/mission-utils';
import Lotto from '../model/Lotto.js';
import { LOTTO_CONFIG } from '../constants/game.js';
class LottoTicketGenerator {
  static generateOne() {
    const numbers = MissionUtils.Random.pickUniqueNumbersInRange(
      LOTTO_CONFIG.MIN_NUMBER,
      LOTTO_CONFIG.MAX_NUMBER,
      LOTTO_CONFIG.NUMBER_COUNT,
    );
    return new Lotto(numbers);
  }

  static generateMany(count) {
    return Array.from({ length: count }, () => LottoTicketGenerator.generateOne());
  }
}
export default LottoTicketGenerator;

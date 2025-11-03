import { MissionUtils } from '@woowacourse/mission-utils';
import Lotto from '../model/Lotto.js';
import { LOTTO_CONFIG } from '../constants/game.js';

class LottoTicketGenerator {
  static generateSingleLottoTicket() {
    const numbers = MissionUtils.Random.pickUniqueNumbersInRange(
      LOTTO_CONFIG.MIN_NUMBER,
      LOTTO_CONFIG.MAX_NUMBER,
      LOTTO_CONFIG.NUMBER_COUNT,
    );
    return new Lotto(numbers);
  }

  static generateMultipleLottoTickets(count) {
    return Array.from({ length: count }, () => this.generateSingleLottoTicket());
  }
}
export default LottoTicketGenerator;

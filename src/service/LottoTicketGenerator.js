import { MissionUtils } from '@woowacourse/mission-utils';
import Lotto from '../model/Lotto.js';

class LottoTicketGenerator {
  static generateOne() {
    const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
    return new Lotto(numbers);
  }

  static generateMany(count) {
    return Array.from({ length: count }, () => LottoTicketGenerator.generateOne());
  }
}
export default LottoTicketGenerator;

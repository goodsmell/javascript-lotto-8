import { MissionUtils } from '@woowacourse/mission-utils';
import LottoTicket from '../model/LottoTicket.js';

class LottoTicketGenerator {
  static generateOne() {
    const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
    return new LottoTicket(numbers);
  }
}
export default LottoTicketGenerator;

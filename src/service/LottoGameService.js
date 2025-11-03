import LottoTicketGenerator from './LottoTicketGenerator.js';
import LottoResult from './LottoResult.js';
import PurchaseAmount from '../model/PurchaseAmount.js';
import WinningLotto from '../model/WinningLotto.js';
import { INPUT_DELIMITER } from '../constants/game.js';

const LottoGameService = {
  createPurchaseAmount(raw) {
    return new PurchaseAmount(raw);
  },

  generateLottos(purchaseAmount) {
    const count = purchaseAmount.getCountLotto();
    return LottoTicketGenerator.generateManyLottos(count);
  },

  createWinningLotto(raw) {
    const numbers = raw.split(INPUT_DELIMITER).map((n) => Number(n.trim()));
    const winningLotto = new WinningLotto();
    winningLotto.setNumbers(numbers);
    return winningLotto;
  },

  addBonusNumber(winningLotto, raw) {
    const bonus = Number(raw.trim());
    winningLotto.setBonus(bonus);
    return winningLotto;
  },

  calculateResult(rankInputs) {
    const { lottos, winningLotto, purchaseAmount } = rankInputs;
    const rankStat = LottoResult.countRanks(lottos, winningLotto);
    const profitRate = LottoResult.calculateProfitRate(
      rankStat,
      purchaseAmount.getPurchaseAmount(),
    );
    return { rankStat, profitRate };
  },
};

export default LottoGameService;

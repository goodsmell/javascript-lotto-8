import LottoTicketGenerator from './LottoTicketGenerator.js';
import PurchaseAmount from '../model/PurchaseAmount.js';
import WinningLotto from '../model/WinningLotto.js';
import { INPUT_DELIMITER } from '../constants/game.js';

const LottoGameManager = {
  generatePurchaseAmountModel(raw) {
    return new PurchaseAmount(raw);
  },

  generateLottoTicketsByPurchaseAmount(purchaseAmount) {
    const count = purchaseAmount.getLottoCount();
    return LottoTicketGenerator.generateMultipleLottoTickets(count);
  },

  generateWinningLotto(raw) {
    const numbers = raw.split(INPUT_DELIMITER).map((n) => Number(n.trim()));
    const winningLotto = new WinningLotto();
    winningLotto.setWinningNumbers(numbers);
    return winningLotto;
  },

  applyBonusNumberToWinningLotto(winningLotto, raw) {
    const bonus = Number(raw.trim());
    winningLotto.setBonus(bonus);
    return winningLotto;
  },

};

export default LottoGameManager;

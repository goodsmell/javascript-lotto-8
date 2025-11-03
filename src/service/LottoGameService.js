import LottoTicketGenerator from './LottoTicketGenerator.js';
import LottoResult from './LottoResult.js';
import PurchaseAmount from '../model/PurchaseAmount.js';
import WinningLotto from '../model/WinningLotto.js';

const LottoGameService = {
  setPurchaseAmount(raw) {
    return new PurchaseAmount(raw);
  },

  issueTickets(purchaseAmount) {
    const count = purchaseAmount.getCountTicket();
    return LottoTicketGenerator.generateMany(count);
  },

  setWinningNumbers(raw) {
    const numbers = raw.split(',').map((n) => Number(n.trim()));
    const winning = new WinningLotto();
    winning.setNumbers(numbers);
    return winning;
  },

  setBonus(winning, raw) {
    const bonus = Number(raw.trim());
    winning.setBonus(bonus);
    return winning;
  },

  computeResult(rankInputs) {
    const { tickets, winning, purchaseAmount } = rankInputs;
    const rankStat = LottoResult.countRanks(tickets, winning);
    const profitRate = LottoResult.calculateProfitRate(
      rankStat,
      purchaseAmount.getPurchaseAmount(),
    );
    return { rankStat, profitRate };
  },
};

export default LottoGameService;

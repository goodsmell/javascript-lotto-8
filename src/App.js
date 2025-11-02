import { Input } from './view/Input.js';
import { Output } from './view/Output.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import PurchaseAmount from './model/PurchaseAmount.js';
import LottoTicketGenerator from './service/LottoTicketGenerator.js';
import WinningLotto from './model/WinningLotto.js';
import LottoResult from './service/LottoResult.js';

class App {
  async run() {
    const purchaseAmount = await this.#getMoney();
    const issuedTicketCount = purchaseAmount.getCountTicket();
    const tickets = LottoTicketGenerator.generateMany(issuedTicketCount);

    Output.printIssuedLottos(tickets);

    const winningLotto = new WinningLotto();
    await this.#getWinningNumber(winningLotto);
    await this.#getBonusNumber(winningLotto);

    const rankStat = LottoResult.countRanks(tickets, winningLotto);

    const profitRate = LottoResult.calculateProfitRate(
      rankStat,
      purchaseAmount.getPurchaseAmount(),
    );

  }

  async #getMoney() {
    while (true) {
      try {
        const input = await Input.askPurchaseAmount();
        const purchaseAmount = new PurchaseAmount(input);
        return purchaseAmount;
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  }

  async #getWinningNumber(winningLotto) {
    while (true) {
      try {
        const input = await Input.askWinningNumber();
        const winingNumber = input.split(',').map((n) => Number(n.trim()));
        winningLotto.setNumbers(winingNumber);
        return;
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  }

  async #getBonusNumber(winningLotto) {
    while (true) {
      try {
        const input = await Input.askBonusNumber();
        const bonus = Number(input.trim());
        console.log(bonus);
        winningLotto.setBonus(bonus);
        return;
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  }
}

export default App;

import { Input } from './view/Input.js';
import { Output } from './view/Output.js';
import LottoGameService from './service/LottoGameService.js';

class App {
  async run() {
    const purchaseAmount = await this.#getPurchaseAmount();
    const tickets = this.#issueTickets(purchaseAmount);
    const winning = await this.#getWinningNumbers();
    await this.#setBonusNumber(winning);

    const { rankStat, profitRate } = LottoGameService.computeResult({
      tickets,
      winning,
      purchaseAmount,
    });

    Output.printResult(rankStat, profitRate);
  }

  async #getPurchaseAmount() {
    return this.#retry(async () => {
      const raw = await Input.askPurchaseAmount();
      return LottoGameService.setPurchaseAmount(raw);
    });
  }

  #issueTickets(purchaseAmount) {
    const tickets = LottoGameService.issueTickets(purchaseAmount);
    Output.printIssuedLottos(tickets);
    return tickets;
  }

  async #getWinningNumbers() {
    return this.#retry(async () => {
      const raw = await Input.askWinningNumber();
      return LottoGameService.setWinningNumbers(raw);
    });
  }

  async #setBonusNumber(winning) {
    await this.#retry(async () => {
      const raw = await Input.askBonusNumber();
      LottoGameService.setBonus(winning, raw);
    });
  }

  async #retry(task) {
    while (true) {
      try {
        return await task();
      } catch (e) {
        Output.printErrorMessage(e.message);
      }
    }
  }
}

export default App;

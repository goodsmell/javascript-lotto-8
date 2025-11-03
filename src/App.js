import { Input } from './view/Input.js';
import { Output } from './view/Output.js';
import LottoGameManager from './service/LottoGameManager.js';
import LottoResultCalculator from './service/LottoResultCalculator.js';

class App {
  async run() {
    const purchaseAmount = await this.#getPurchaseAmount();
    const lottos = this.#issueLottos(purchaseAmount);
    const winningLotto = await this.#getWinningLotto();
    await this.#setBonusNumber(winningLotto);

    const { rankStat, profitRate } = LottoResultCalculator.summarize({
      lottos,
      winningLotto,
      purchaseAmount: purchaseAmount.getPurchaseAmount(),
    });

    Output.printResult(rankStat, profitRate);
  }

  async #getPurchaseAmount() {
    return this.#retry(async () => {
      const raw = await Input.askPurchaseAmount();
      return LottoGameManager.generatePurchaseAmountModel(raw);
    });
  }

  #issueLottos(purchaseAmount) {
    const lottos = LottoGameManager.generateLottoTicketsByPurchaseAmount(purchaseAmount);
    Output.printIssuedLottos(lottos);
    return lottos;
  }

  async #getWinningLotto() {
    return this.#retry(async () => {
      const raw = await Input.askWinningNumber();
      return LottoGameManager.generateWinningLotto(raw);
    });
  }

  async #setBonusNumber(winningLotto) {
    await this.#retry(async () => {
      const raw = await Input.askBonusNumber();
      LottoGameManager.applyBonusNumberToWinningLotto(winningLotto, raw);
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

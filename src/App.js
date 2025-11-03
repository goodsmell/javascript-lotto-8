import { Input } from './view/Input.js';
import { Output } from './view/Output.js';
import LottoGameService from './service/LottoGameService.js';

class App {
  async run() {
    const purchaseAmount = await this.#getPurchaseAmount();
    const lottos = this.#issueLottos(purchaseAmount);
    const winningLotto = await this.#getWinningLotto();
    await this.#setBonusNumber(winningLotto);

    const { rankStat, profitRate } = LottoGameService.calculateResult({
      lottos,
      winningLotto,
      purchaseAmount,
    });

    Output.printResult(rankStat, profitRate);
  }

  async #getPurchaseAmount() {
    return this.#retry(async () => {
      const raw = await Input.askPurchaseAmount();
      return LottoGameService.createPurchaseAmount(raw);
    });
  }

  #issueLottos(purchaseAmount) {
    const lottos = LottoGameService.generateLottos(purchaseAmount);
    Output.printIssuedLottos(lottos);
    return lottos;
  }

  async #getWinningLotto() {
    return this.#retry(async () => {
      const raw = await Input.askWinningNumber();
      return LottoGameService.createWinningLotto(raw);
    });
  }

  async #setBonusNumber(winningLotto) {
    await this.#retry(async () => {
      const raw = await Input.askBonusNumber();
      LottoGameService.addBonusNumber(winningLotto, raw);
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

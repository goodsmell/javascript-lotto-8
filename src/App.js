import { Input } from './view/Input.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import PurchaseAmount from './model/PurchaseAmount.js';

class App {
  async run() {
    const purchaseAmountManager = await this.#getMoney();
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
}

export default App;

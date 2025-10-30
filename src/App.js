import { Input } from './view/Input.js';
import { isNumber, isEmpty, isZero, isThousandUnits } from './validator.js';
import { MissionUtils } from '@woowacourse/mission-utils';

class App {
  async run() {
    const money = await this.#getMoney();
  }

  async #getMoney() {
    while (true) {
      try {
        const parchaseAmount = await Input.askPurchaseAmount();
        this.#validateMoney(parchaseAmount.trim());
        return Number(parchaseAmount);
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  }

  #validateMoney(money) {
    isEmpty(money);
    isZero(Number(money));
    isNumber(Number(money));
    isThousandUnits(Number(money));
  }
}

export default App;

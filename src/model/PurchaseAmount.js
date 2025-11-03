import { LOTTO_CONFIG } from '../constants/game.js';
import { MONEY_ERROR_MESSAGE } from '../constants/messages.js';

class PurchaseAmount {
  #money;

  constructor(money) {
    this.#validate(money);
    this.#money = Number(money);
  }

  getPurchaseAmount() {
    return this.#money;
  }

  getCountLotto() {
    return this.#money / LOTTO_CONFIG.PRICE_PER_LOTTO;
  }

  #validate(money) {
    this.#assertNotEmpty(money);
    this.#assertIsNumber(Number(money));
    this.#assertNotZero(Number(money));
    this.#assertMultipleOfPrice(Number(money));
  }

  #assertNotEmpty = (money) => {
    if (!money) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_EMPTY);
    }
  };

  #assertIsNumber = (money) => {
    if (Number.isNaN(money)) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_NUMBER);
    }
  };

  #assertNotZero = (money) => {
    if (money === 0) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_ZERO);
    }
  };

  #assertMultipleOfPrice = (money) => {
    if (money % LOTTO_CONFIG.PRICE_PER_LOTTO !== 0) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_THOUSAND_UNIT);
    }
  };
}

export default PurchaseAmount;

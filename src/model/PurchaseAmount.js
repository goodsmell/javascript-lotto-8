import { LOTTO_CONFIG } from '../constants/game.js';
import { MONEY_ERROR_MESSAGE } from '../constants/messages.js';

class PurchaseAmount {
  #amount;

  constructor(amount) {
    this.#validate(amount);
    this.#amount = Number(amount);
  }

  getPurchaseAmount() {
    return this.#amount;
  }

  getLottoCount() {
    return this.#amount / LOTTO_CONFIG.PRICE_PER_LOTTO;
  }

  #validate(amount) {
    this.#assertNotEmpty(amount);
    this.#assertIsNumber(Number(amount));
    this.#assertNotZero(Number(amount));
    this.#assertMultipleOfPrice(Number(amount));
  }

  #assertNotEmpty = (amount) => {
    if (!amount) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_EMPTY);
    }
  };

  #assertIsNumber = (amount) => {
    if (Number.isNaN(amount)) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_NUMBER);
    }
  };

  #assertNotZero = (amount) => {
    if (amount === 0) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_ZERO);
    }
  };

  #assertMultipleOfPrice = (amount) => {
    if (amount % LOTTO_CONFIG.PRICE_PER_LOTTO !== 0) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_THOUSAND_UNIT);
    }
  };
}

export default PurchaseAmount;

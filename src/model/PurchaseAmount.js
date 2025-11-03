import { isNumber, isEmpty, isZero, isThousandUnits } from '../validator.js';
import { LOTTO_CONFIG } from '../constants/game.js';
class PurchaseAmount {
  #money;

  constructor(money) {
    this.#validate(money);
    this.#money = Number(money);
  }

  getPurchaseAmount() {
    return this.#money;
  }

  #validate(money) {
    isEmpty(money);
    isNumber(Number(money));
    isZero(Number(money));
    isThousandUnits(Number(money));
  }

  getCountTicket() {
    return this.#money / LOTTO_CONFIG.PRICE_PER_TICKET;
  }
}

export default PurchaseAmount;

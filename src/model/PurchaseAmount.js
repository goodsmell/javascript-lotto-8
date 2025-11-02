import { isNumber, isEmpty, isZero, isThousandUnits } from '../validator.js';

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
    isZero(Number(money));
    isNumber(Number(money));
    isThousandUnits(Number(money));
  }

  getCountTicket() {
    return this.#money / 1000;
  }
}

export default PurchaseAmount;

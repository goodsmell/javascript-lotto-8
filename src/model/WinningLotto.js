import Lotto from './Lotto.js';
import { BONUS_ERROR_MESSAGE } from '../constants/messages.js';

class WinningLotto {
  #winningNumber;
  #bonus;

  setNumbers(numbers) {
    this.#winningNumber = new Lotto(numbers);
  }

  setBonus(bonus) {
    this.#validateBonus(bonus);
    this.#bonus = bonus;
  }

  #validateBonus(bonus) {
    if (!Number.isFinite(bonus)) {
      throw new Error(BONUS_ERROR_MESSAGE.INPUT_NOT_NUMBER);
    }

    if (!Number.isInteger(bonus)) {
      throw new Error(BONUS_ERROR_MESSAGE.INPUT_NOT_INTEGER);
    }

    if (bonus < 1 || bonus > 45) {
      throw new Error(BONUS_ERROR_MESSAGE.INPUT_OUT_OF_RANGE);
    }

    const winningNumbers = this.#winningNumber.getNumbers();
    if (winningNumbers.includes(bonus)) {
      throw new Error(BONUS_ERROR_MESSAGE.INPUT_DUPLICATE);
    }
  }

  getWinningNumbers() {
    return this.#winningNumber.getNumbers();
  }

  getBonus() {
    return this.#bonus;
  }
}

export default WinningLotto;

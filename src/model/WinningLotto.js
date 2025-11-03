import Lotto from './Lotto.js';
import { BONUS_ERROR_MESSAGE } from '../constants/messages.js';
import { LOTTO_CONFIG } from '../constants/game.js';

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

  getWinningNumbers() {
    return this.#winningNumber.getNumbers();
  }

  getBonus() {
    return this.#bonus;
  }

  getMatchResult(lotto) {
    const winningNumbers = this.#winningNumber.getNumbers();
    const myNumbers = lotto.getNumbers();

    const matchCount = myNumbers.filter((n) => winningNumbers.includes(n)).length;
    const hasBonus = myNumbers.includes(this.#bonus);

    return { matchCount, hasBonus };
  }

  #validateBonus(bonus) {
    this.#assertFiniteNumber(bonus);
    this.#assertInteger(bonus);
    this.#assertInRange(bonus);
    this.#assertNotDuplicate(bonus);
  }

  #assertFiniteNumber(bonus) {
    if (!Number.isFinite(bonus)) {
      throw new Error(BONUS_ERROR_MESSAGE.INPUT_NOT_NUMBER);
    }
  }

  #assertInteger(bonus) {
    if (!Number.isInteger(bonus)) {
      throw new Error(BONUS_ERROR_MESSAGE.INPUT_NOT_INTEGER);
    }
  }

  #assertInRange(bonus) {
    const { MIN_NUMBER, MAX_NUMBER } = LOTTO_CONFIG;
    if (bonus < MIN_NUMBER || bonus > MAX_NUMBER) {
      throw new Error(BONUS_ERROR_MESSAGE.INPUT_OUT_OF_RANGE);
    }
  }

  #assertNotDuplicate(bonus) {
    const winningNumbers = this.#winningNumber.getNumbers();
    if (winningNumbers.includes(bonus)) {
      throw new Error(BONUS_ERROR_MESSAGE.INPUT_DUPLICATE);
    }
  }
}

export default WinningLotto;

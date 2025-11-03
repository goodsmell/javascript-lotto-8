import { LOTTO_ERROR_MESSAGE } from '../constants/messages.js';
import { LOTTO_CONFIG } from '../constants/game.js';
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  #validate(numbers) {
    const isAllNumber = numbers.every((num) => Number.isFinite(num));
    const isAllInt = numbers.every((num) => Number.isInteger(num));

    if (!isAllNumber) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_NOT_NUMBER);
    }

    if (!isAllInt) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_NOT_INTEGER);
    }

    if (numbers.some((num) => num < LOTTO_CONFIG.MIN_NUMBER || num > LOTTO_CONFIG.MAX_NUMBER)) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_OUT_OF_RANGE);
    }

    if (numbers.length !== LOTTO_CONFIG.NUMBER_COUNT) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_NOT_SIX_NUMBERS);
    }

    if (new Set(numbers).size !== numbers.length) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}
export default Lotto;

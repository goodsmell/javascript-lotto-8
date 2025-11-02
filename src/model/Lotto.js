import { LOTTO_ERROR_MESSAGE } from '../constants/messages.js';
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

    if (numbers.some((num) => num < 1 || num > 45)) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_OUT_OF_RANGE);
    }

    if (numbers.length !== 6) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_NOT_SIX_NUMBERS);
    }

    if (new Set(numbers).size != numbers.length) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}
export default Lotto;

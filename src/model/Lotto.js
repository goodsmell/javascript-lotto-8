import { LOTTO_ERROR_MESSAGE } from '../constants/messages.js';
import { LOTTO_CONFIG } from '../constants/game.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  #assertAllFiniteIntegers(numbers) {
    const allFinite = numbers.every((n) => Number.isFinite(n));
    if (!allFinite) throw new Error(LOTTO_ERROR_MESSAGE.INPUT_NOT_NUMBER);

    const allInt = numbers.every((n) => Number.isInteger(n));
    if (!allInt) throw new Error(LOTTO_ERROR_MESSAGE.INPUT_NOT_INTEGER);
  }

  #assertInRange(numbers) {
    const { MIN_NUMBER, MAX_NUMBER } = LOTTO_CONFIG;
    const outOfRange = numbers.some((n) => n < MIN_NUMBER || n > MAX_NUMBER);
    if (outOfRange) throw new Error(LOTTO_ERROR_MESSAGE.INPUT_OUT_OF_RANGE);
  }

  #assertNoDuplicate(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
    }
  }
  #assertLength(numbers) {
    if (numbers.length !== LOTTO_CONFIG.NUMBER_COUNT) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_NOT_SIX_NUMBERS);
    }
  }

  #validate(numbers) {
    this.#assertLength(numbers);
    this.#assertAllFiniteIntegers(numbers);
    this.#assertInRange(numbers);
    this.#assertNoDuplicate(numbers);
  }

  getNumbers() {
    return [...this.#numbers];
  }
}
export default Lotto;

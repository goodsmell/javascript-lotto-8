import Lotto from '../src/model/Lotto.js';
import { LOTTO_ERROR_MESSAGE } from '../src/constants/messages.js';

describe('로또 클래스 테스트', () => {
  test('로또 번호에 문자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 'a', 4, 5, 6]);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_NOT_NUMBER);
  });

  test('로또 번호에 정수가 아닌 번호가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3.4, 4, 5, 5]);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_NOT_INTEGER);
  });

  test.each([
    [[0, 2, 3, 4, 5, 6], '0이 포함된 경우'],
    [[1, 2, 3, 4, 5, 46], '46이 포함된 경우'],
    [[-1, 2, 3, 4, 5, 6], '음수가 포함된 경우'],
  ])('로또 번호가 1~45 범위를 벗어나면 예외가 발생한다. (%s)', (numbers) => {
    expect(() => new Lotto(numbers)).toThrow(LOTTO_ERROR_MESSAGE.INPUT_OUT_OF_RANGE);
  });

  test.each([
    [[1, 2, 3, 4, 5, 6, 7], '7개인 경우'],
    [[1, 2, 3, 4, 5], '5개인 경우'],
  ])('로또 번호의 개수가 6개가 아니면 예외가 발생한다. (%s)', (numbers) => {
    expect(() => new Lotto(numbers)).toThrow(LOTTO_ERROR_MESSAGE.INPUT_NOT_SIX_NUMBERS);
  });

  test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
  });
});

import WinningLotto from '../src/model/WinningLotto.js';
import { BONUS_ERROR_MESSAGE } from '../src/constants/messages.js';

describe('WinningLotto 클래스 테스트', () => {
  let winningLotto;

  beforeEach(() => {
    winningLotto = new WinningLotto();
    winningLotto.setNumbers([1, 2, 3, 4, 5, 6]);
  });

  test.each([
    ['a', '문자 입력된 경우'],
    [NaN, 'NaN인 경우'],
    [Infinity, 'Infinity인 경우'],
  ])('보너스 번호가 숫자가 아니면 예외가 발생한다. (%s)', (bonus) => {
    expect(() => winningLotto.setBonus(bonus)).toThrow(BONUS_ERROR_MESSAGE.INPUT_NOT_NUMBER);
  });

  test('보너스 번호가 정수가 아니면 예외가 발생한다.', () => {
    expect(() => winningLotto.setBonus(1.2)).toThrow(BONUS_ERROR_MESSAGE.INPUT_NOT_INTEGER);
  });

  test.each([
    [0, '0이 포함된 경우'],
    [46, '46이 포함된 경우'],
    [-1, '음수가 포함된 경우'],
  ])('보너스 번호가 1~45 범위를 벗어나면 예외가 발생한다. (%s)', (bonus) => {
    expect(() => winningLotto.setBonus(bonus)).toThrow(BONUS_ERROR_MESSAGE.INPUT_OUT_OF_RANGE);
  });

  test('보너스 번호가 당첨 번호와 중복되면 예외가 발생한다.', () => {
    expect(() => winningLotto.setBonus(1)).toThrow(BONUS_ERROR_MESSAGE.INPUT_DUPLICATE);
  });

  test('올바른 보너스 번호 입력 시 정상적으로 설정된다.', () => {
    winningLotto.setBonus(7);
    expect(winningLotto.getBonus()).toBe(7);
  });
});

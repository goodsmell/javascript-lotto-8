import WinningLotto from '../../src/model/WinningLotto.js';
import Lotto from '../../src/model/Lotto.js';
import { BONUS_ERROR_MESSAGE } from '../../src/constants/messages.js';

describe('WinningLotto 클래스', () => {
  let winningLotto;

  beforeEach(() => {
    winningLotto = new WinningLotto();
    winningLotto.setWinningNumbers([1, 2, 3, 4, 5, 6]);
  });

  describe('보너스 번호 검증', () => {
    test.each([
      ['문자 입력', 'a', BONUS_ERROR_MESSAGE.INPUT_NOT_NUMBER],
      ['NaN 입력', NaN, BONUS_ERROR_MESSAGE.INPUT_NOT_NUMBER],
      ['Infinity 입력', Infinity, BONUS_ERROR_MESSAGE.INPUT_NOT_NUMBER],
    ])('%s 시 예외 발생', (_, bonus, expectedError) => {
      expect(() => winningLotto.setBonus(bonus)).toThrow(expectedError);
    });

    test.each([
      ['소수 입력', 1.5, BONUS_ERROR_MESSAGE.INPUT_NOT_INTEGER],
      ['음수 입력', -1, BONUS_ERROR_MESSAGE.INPUT_OUT_OF_RANGE],
      ['0 입력', 0, BONUS_ERROR_MESSAGE.INPUT_OUT_OF_RANGE],
      ['46 입력', 46, BONUS_ERROR_MESSAGE.INPUT_OUT_OF_RANGE],
    ])('%s 시 예외 발생', (_, bonus, expectedError) => {
      expect(() => winningLotto.setBonus(bonus)).toThrow(expectedError);
    });

    test('당첨 번호와 중복된 보너스 번호 입력 시 예외 발생', () => {
      expect(() => winningLotto.setBonus(1)).toThrow(BONUS_ERROR_MESSAGE.INPUT_DUPLICATE);
    });

    test('올바른 보너스 번호 입력 시 정상적으로 설정된다.', () => {
      winningLotto.setBonus(7);
      expect(winningLotto.getBonus()).toBe(7);
    });
  });

  describe('getter 동작', () => {
    test('getWinningNumbers()는 새로운 배열을 반환한다.', () => {
      const numbers = winningLotto.getWinningNumbers();
      expect(numbers).toEqual([1, 2, 3, 4, 5, 6]);

      numbers.push(99);
      expect(winningLotto.getWinningNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('getBonus()는 설정된 보너스 번호를 반환한다.', () => {
      winningLotto.setBonus(10);
      expect(winningLotto.getBonus()).toBe(10);
    });
  });

  describe('getMatchResult()', () => {
    test('당첨 번호 3개 일치 시 matchCount=3, hasBonus=false를 반환한다.', () => {
      const lotto = new Lotto([1, 2, 3, 10, 20, 30]);
      winningLotto.setBonus(7);

      const result = winningLotto.getMatchResult(lotto);
      expect(result).toEqual({ matchCount: 3, hasBonus: false });
    });

    test('5개 일치 + 보너스 번호 일치 시 hasBonus=true를 반환한다.', () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 7]);
      winningLotto.setBonus(7);

      const result = winningLotto.getMatchResult(lotto);
      expect(result).toEqual({ matchCount: 5, hasBonus: true });
    });

    test('6개 모두 일치 시 matchCount=6, hasBonus=false를 반환한다.', () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      winningLotto.setBonus(7);

      const result = winningLotto.getMatchResult(lotto);
      expect(result).toEqual({ matchCount: 6, hasBonus: false });
    });

    test('보너스 번호만 일치하는 경우 matchCount는 0, hasBonus=true를 반환한다.', () => {
      const lotto = new Lotto([7, 8, 9, 10, 11, 12]);
      winningLotto.setBonus(7);

      const result = winningLotto.getMatchResult(lotto);
      expect(result).toEqual({ matchCount: 0, hasBonus: true });
    });
  });
});

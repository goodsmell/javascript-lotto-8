import { isNumber, isEmpty, isZero, isThousandUnits } from '../src/validator.js';
import { ERROR_MESSAGE } from '../src/constants/messages.js';

describe('구입 금액 검증 테스트', () => {
  describe('숫자 검증', () => {
    test.each([
      ['a', '문자가 들어오면'],
      ['100a', '문자+숫자가 섞이면'],
    ])('%s 입력 시 예외가 발생한다.', (input) => {
      expect(() => isNumber(Number(input))).toThrow(ERROR_MESSAGE.INPUT_NOT_NUMBER);
    });
  });

  describe('빈 값 검증', () => {
    expect(() => isEmpty('')).toThrow(ERROR_MESSAGE.INPUT_EMPTY);
  });

  describe('0 검증', () => {
    expect(() => isZero(Number('0'))).toThrow(ERROR_MESSAGE.INPUT_ZERO);
  });

  describe('1000원 단위 검증', () => {
    test.each([
      [1, '1 입력 시'],
      [1500, '1500 입력 시'],
      [999, '999 입력 시'],
      [1000.5, '소수 입력 시'],
    ])('%s 입력 시 예외가 발생한다.', (input) => {
      expect(() => isThousandUnits(Number(input))).toThrow(ERROR_MESSAGE.INPUT_NOT_THOUSAND_UNIT);
    });
  });
});

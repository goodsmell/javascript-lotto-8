// __tests__/PurchaseAmount.test.js
import { ERROR_MESSAGE } from '../src/constants/messages.js';
import PurchaseAmount from '../src/model/PurchaseAmount.js';

describe('구입금액 테스트', () => {
  test('유효한 금액이면 인스턴스가 생성된다.', () => {
    const amount = new PurchaseAmount('5000');
    expect(amount.getValue()).toBe(5000);
  });

  test('구입 금액이 숫자가 아니면 예외가 발생한다.', () => {
    expect(() => new PurchaseAmount('1a00')).toThrow(ERROR_MESSAGE.INPUT_NOT_NUMBER);
  });

  test('구입 금액이 빈 값이면 예외가 발생한다.', () => {
    expect(() => new PurchaseAmount('')).toThrow(ERROR_MESSAGE.INPUT_EMPTY);
  });

  test('구입 금액이 0이면 예외가 발생한다.', () => {
    expect(() => new PurchaseAmount('0')).toThrow(ERROR_MESSAGE.INPUT_ZERO);
  });

  test('구입 금액이 1000원 단위가 아니면 예외가 발생한다.', () => {
    expect(() => new PurchaseAmount('1500')).toThrow(ERROR_MESSAGE.INPUT_NOT_THOUSAND_UNIT);
  });
});

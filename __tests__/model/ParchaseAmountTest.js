import PurchaseAmount from '../../src/model/PurchaseAmount.js';
import { LOTTO_CONFIG } from '../../src/constants/game.js';
import { MONEY_ERROR_MESSAGE } from '../../src/constants/messages.js';

describe('PurchaseAmount 클래스', () => {
  describe('유효성 검증', () => {
    test('빈 값 입력 시 예외가 발생한다.', () => {
      expect(() => new PurchaseAmount('')).toThrow(MONEY_ERROR_MESSAGE.INPUT_EMPTY);
      expect(() => new PurchaseAmount(null)).toThrow(MONEY_ERROR_MESSAGE.INPUT_EMPTY);
    });

    test('숫자가 아닌 값 입력 시 예외가 발생한다.', () => {
      expect(() => new PurchaseAmount('abc')).toThrow(MONEY_ERROR_MESSAGE.INPUT_NOT_NUMBER);
      expect(() => new PurchaseAmount('1000a')).toThrow(MONEY_ERROR_MESSAGE.INPUT_NOT_NUMBER);
    });

    test('0 입력 시 예외가 발생한다.', () => {
      expect(() => new PurchaseAmount('0')).toThrow(MONEY_ERROR_MESSAGE.INPUT_ZERO);
    });

    test('1000원 단위가 아닐 경우 예외가 발생한다.', () => {
      expect(() => new PurchaseAmount('1500')).toThrow(MONEY_ERROR_MESSAGE.INPUT_NOT_THOUSAND_UNIT);
      expect(() => new PurchaseAmount('999')).toThrow(MONEY_ERROR_MESSAGE.INPUT_NOT_THOUSAND_UNIT);
    });

    test('정상 입력 시 예외가 발생하지 않는다.', () => {
      expect(() => new PurchaseAmount('3000')).not.toThrow();
    });
  });

  describe('금액 저장 및 계산 기능', () => {
    const AMOUNT = 5000;
    const purchaseAmount = new PurchaseAmount(AMOUNT);

    test('getPurchaseAmount()는 입력받은 금액을 숫자로 반환한다.', () => {
      expect(purchaseAmount.getPurchaseAmount()).toBe(AMOUNT);
    });

    test('getLottoCount()는 로또 구매 장 수를 반환한다.', () => {
      const expectedCount = AMOUNT / LOTTO_CONFIG.PRICE_PER_LOTTO;
      expect(purchaseAmount.getLottoCount()).toBe(expectedCount);
    });

    test('구입 금액이 1000원일 경우 로또 1장을 반환한다.', () => {
      const oneTicket = new PurchaseAmount(1000);
      expect(oneTicket.getLottoCount()).toBe(1);
    });
  });
});

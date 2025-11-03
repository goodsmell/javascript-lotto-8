// __tests__/LottoGameManager.test.js
import LottoGameManager from '../../src/service/LottoGameManager.js';
import { LOTTO_CONFIG } from '../../src/constants/game.js';
describe('LottoGameManager - 입력 → 출력 중심 테스트', () => {
  test('구입 금액 "3000" → PurchaseAmount: 금액 3000, 장수 3', () => {
    const model = LottoGameManager.generatePurchaseAmountModel('3000');

    expect(model.getPurchaseAmount()).toBe(3000);
    expect(model.getLottoCount()).toBe(3);
  });

  test('구입 금액 5000 → 로또 티켓 5장 생성', () => {
    const purchaseAmount = LottoGameManager.generatePurchaseAmountModel('5000');
    const tickets = LottoGameManager.generateLottoTicketsByPurchaseAmount(purchaseAmount);

    expect(Array.isArray(tickets)).toBe(true);
    expect(tickets).toHaveLength(5);

    tickets.forEach((ticket) => {
      const nums = ticket.getNumbers();
      expect(nums).toHaveLength(6);
      expect([...nums].sort((a, b) => a - b)).toEqual(nums);
      nums.forEach((n) => {
        expect(Number.isInteger(n)).toBe(true);
        expect(n).toBeGreaterThanOrEqual(LOTTO_CONFIG.MIN_NUMBER);
        expect(n).toBeLessThanOrEqual(LOTTO_CONFIG.MAX_NUMBER);
      });
      expect(new Set(nums).size).toBe(LOTTO_CONFIG.NUMBER_COUNT);
    });
  });

  test('당첨 번호 "1,2,3,4,5,6" → WinningLotto에 [1,2,3,4,5,6] 세팅', () => {
    const winning = LottoGameManager.generateWinningLotto('1,2,3,4,5,6');
    expect(winning.getWinningNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('당첨 번호에 공백이 섞여도 정상 파싱됨: " 1 , 2 ,3 , 4,5 , 6 "', () => {
    const winning = LottoGameManager.generateWinningLotto(' 1 , 2 ,3 , 4,5 , 6 ');
    expect(winning.getWinningNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('보너스 번호 "7" 적용 → getBonus() === 7', () => {
    const winning = LottoGameManager.generateWinningLotto('1,2,3,4,5,6');
    LottoGameManager.applyBonusNumberToWinningLotto(winning, '7');
    expect(winning.getBonus()).toBe(7);
  });

  test('보너스 번호가 당첨 번호와 중복이면 예외', () => {
    const winning = LottoGameManager.generateWinningLotto('1,2,3,4,5,6');
    expect(() => LottoGameManager.applyBonusNumberToWinningLotto(winning, '6')).toThrow();
  });

  test('보너스 번호에 공백이 있어도 정상 파싱됨: "  10  "', () => {
    const winning = LottoGameManager.generateWinningLotto('1,2,3,4,5,6');
    LottoGameManager.applyBonusNumberToWinningLotto(winning, '  10  ');
    expect(winning.getBonus()).toBe(10);
  });
});

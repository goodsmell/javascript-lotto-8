import WinningLotto from '../src/model/WinningLotto.js';
import Lotto from '../src/model/Lotto.js';
import LottoResult from '../src/service/LottoResult.js';

describe('LottoResult 클래스 테스트', () => {
  let winningLotto;

  beforeEach(() => {
    winningLotto = new WinningLotto();
    winningLotto.setNumbers([1, 2, 3, 4, 5, 6]);
    winningLotto.setBonus(7);
  });

  test('티켓 개수만큼 결과가 반환된다.', () => {
    const tickets = [
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([1, 2, 3, 40, 41, 42]),
      new Lotto([10, 11, 12, 13, 14, 7]),
    ];

    const result = LottoResult.calculate(tickets, winningLotto);

    expect(result).toHaveLength(3);
  });

  test('각 티켓의 당첨 결과를 올바르게 계산한다.', () => {
    const tickets = [
      new Lotto([1, 2, 3, 4, 5, 6]), // 6개 일치
      new Lotto([1, 2, 3, 4, 5, 7]), // 5개 + 보너스
      new Lotto([10, 11, 12, 13, 14, 7]), // 0개 + 보너스
      new Lotto([1, 2, 3, 10, 11, 12]), // 3개
    ];

    const result = LottoResult.calculate(tickets, winningLotto);

    expect(result).toEqual([
      { matchCount: 6, hasBonus: false },
      { matchCount: 5, hasBonus: true },
      { matchCount: 0, hasBonus: true },
      { matchCount: 3, hasBonus: false },
    ]);
  });
});

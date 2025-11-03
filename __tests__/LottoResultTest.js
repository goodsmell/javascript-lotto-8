import LottoResult from '../src/service/LottoResult.js';

describe('LottoResult', () => {
  describe('등수 집계 테스트', () => {
    test.each([
      [6, false, { first: 1 }, '6개 일치 → 1등'],
      [5, true, { second: 1 }, '5개 일치 + 보너스 일치 → 2등'],
      [5, false, { third: 1 }, '5개 일치 → 3등'],
      [4, false, { fourth: 1 }, '4개 일치 → 4등'],
      [3, false, { fifth: 1 }, '3개 일치 → 5등'],
      [2, false, {}, '2개 이하 일치 → 등수 없음'],
    ])('%s개 일치 / 보너스 %s (%s)', (matchCount, hasBonus, expected, desc) => {
      const tickets = [{}];
      const winningLotto = {
        getMatchResult: jest.fn().mockReturnValue({ matchCount, hasBonus }),
      };

      const result = LottoResult.countRanks(tickets, winningLotto);

      const base = { first: 0, second: 0, third: 0, fourth: 0, fifth: 0 };
      const expectedStat = { ...base, ...expected };

      expect(result).toEqual(expectedStat);
    });

    test('여러 장이 섞여 있어도 등수별로 누적해서 집계된다.', () => {
      const tickets = [{}, {}, {}, {}, {}, {}];
      const winningLotto = {
        getMatchResult: jest
          .fn()
          .mockReturnValueOnce({ matchCount: 6, hasBonus: false }) // 1등
          .mockReturnValueOnce({ matchCount: 5, hasBonus: true }) // 2등
          .mockReturnValueOnce({ matchCount: 5, hasBonus: false }) // 3등
          .mockReturnValueOnce({ matchCount: 4, hasBonus: false }) // 4등
          .mockReturnValueOnce({ matchCount: 3, hasBonus: false }) // 5등
          .mockReturnValueOnce({ matchCount: 3, hasBonus: false }), // 5등
      };

      const result = LottoResult.countRanks(tickets, winningLotto);

      expect(result).toEqual({
        first: 1,
        second: 1,
        third: 1,
        fourth: 1,
        fifth: 2,
      });
    });

    test('등수 규칙에 없는 matchCount는 집계되지 않는다.', () => {
      const tickets = [{}, {}, {}];
      const winningLotto = {
        getMatchResult: jest
          .fn()
          .mockReturnValueOnce({ matchCount: 2, hasBonus: false })
          .mockReturnValueOnce({ matchCount: 0, hasBonus: false })
          .mockReturnValueOnce({ matchCount: 1, hasBonus: true }),
      };

      const result = LottoResult.countRanks(tickets, winningLotto);

      expect(result).toEqual({
        first: 0,
        second: 0,
        third: 0,
        fourth: 0,
        fifth: 0,
      });
    });
  });

  describe('calculateProfitRate()', () => {
    test('등수별 당첨금으로 수익률을 계산한다.', () => {
      const rankCount = {
        first: 0,
        second: 0,
        third: 1, // 1,500,000
        fourth: 1, // 50,000
        fifth: 2, // 10,000
      };
      const purchaseAmount = 200_000; // 20만원

      const profitRate = LottoResult.calculateProfitRate(rankCount, purchaseAmount);

      expect(profitRate).toBe(780);
    });

    test('당첨이 없으면 0.0을 반환한다.', () => {
      const rankCount = { first: 0, second: 0, third: 0, fourth: 0, fifth: 0 };
      const purchaseAmount = 50_000;

      const profitRate = LottoResult.calculateProfitRate(rankCount, purchaseAmount);

      expect(profitRate).toBe(0);
    });
  });
});

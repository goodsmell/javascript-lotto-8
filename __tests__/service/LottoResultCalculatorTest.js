import LottoResultCalculator from '../../src/service/LottoResultCalculator.js';

describe('LottoResultCalculator 클래스 테스트', () => {
  describe('calculateProfitRate()', () => {
    test('등수별 당첨금 합으로 수익률을 계산한다.', () => {
      const rankCount = { first: 0, second: 0, third: 1, fourth: 1, fifth: 2 };
      const purchaseAmount = 200_000;

      const rate = LottoResultCalculator.calculateProfitRate(rankCount, purchaseAmount);

      expect(rate).toBe(780);
    });

    test('당첨이 하나도 없으면 0을 반환한다.', () => {
      const rankCount = { first: 0, second: 0, third: 0, fourth: 0, fifth: 0 };
      const purchaseAmount = 50_000;

      const rate = LottoResultCalculator.calculateProfitRate(rankCount, purchaseAmount);

      expect(rate).toBe(0);
    });
  });

  describe('calculateWinningRankStatistics()', () => {
    test.each([
      [6, false, { first: 1 }, '6개 일치 → 1등'],
      [5, true,  { second: 1 }, '5개 + 보너스 → 2등'],
      [5, false, { third: 1 }, '5개 일치 → 3등'],
      [4, false, { fourth: 1 }, '4개 일치 → 4등'],
      [3, false, { fifth: 1 }, '3개 일치 → 5등'],
      [2, false, {},             '2개 이하 → 등수 없음'],
    ])('%s개/보너스:%s (%s)', (matchCount, hasBonus, expected) => {
      const lottos = [{}]; 
      const winningLotto = {
        getMatchResult: jest.fn().mockReturnValue({ matchCount, hasBonus }),
      };

      const stat = LottoResultCalculator.calculateWinningRankStatistics(lottos, winningLotto);

      const base = { first: 0, second: 0, third: 0, fourth: 0, fifth: 0 };
      expect(stat).toEqual({ ...base, ...expected });
    });

    test('여러 장이 섞여 있어도 등수별로 누적된다.', () => {
      const lottos = [{}, {}, {}, {}, {}, {}];
      const winningLotto = {
        getMatchResult: jest
          .fn()
          .mockReturnValueOnce({ matchCount: 6, hasBonus: false }) // 1등
          .mockReturnValueOnce({ matchCount: 5, hasBonus: true })  // 2등
          .mockReturnValueOnce({ matchCount: 5, hasBonus: false }) // 3등
          .mockReturnValueOnce({ matchCount: 4, hasBonus: false }) // 4등
          .mockReturnValueOnce({ matchCount: 3, hasBonus: false }) // 5등
          .mockReturnValueOnce({ matchCount: 3, hasBonus: false }) // 5등
      };

      const stat = LottoResultCalculator.calculateWinningRankStatistics(lottos, winningLotto);

      expect(stat).toEqual({
        first: 1,
        second: 1,
        third: 1,
        fourth: 1,
        fifth: 2,
      });
    });

    test('규칙에 없는 matchCount는 집계되지 않는다.', () => {
      const lottos = [{}, {}, {}];
      const winningLotto = {
        getMatchResult: jest
          .fn()
          .mockReturnValueOnce({ matchCount: 2, hasBonus: false }) 
          .mockReturnValueOnce({ matchCount: 1, hasBonus: true  }) 
          .mockReturnValueOnce({ matchCount: 0, hasBonus: false })
      };

      const stat = LottoResultCalculator.calculateWinningRankStatistics(lottos, winningLotto);

      expect(stat).toEqual({
        first: 0,
        second: 0,
        third: 0,
        fourth: 0,
        fifth: 0,
      });
    });
  });

  describe('summarize()', () => {
    test('집계 + 수익률을 함께 반환한다.', () => {
      const lottos = [{}, {}];
      const winningLotto = {
        getMatchResult: jest
          .fn()
          .mockReturnValueOnce({ matchCount: 5, hasBonus: false }) // 3등
          .mockReturnValueOnce({ matchCount: 3, hasBonus: false }) // 5등
      };
      const purchaseAmount = 100_000;

      const { rankStat, profitRate } = LottoResultCalculator.summarize({
        lottos,
        winningLotto,
        purchaseAmount,
      });

      expect(rankStat).toEqual({
        first: 0,
        second: 0,
        third: 1,
        fourth: 0,
        fifth: 1,
      });
      expect(profitRate).toBe(1505);
    });
  });
});

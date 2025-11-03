import { RANK_INFO } from '../constants/prize.js';

class LottoResultCalculator {
  static summarize({ lottos, winningLotto, purchaseAmount }) {
    const rankStat = this.calculateWinningRankStatistics(lottos, winningLotto);
    const profitRate = this.calculateProfitRate(rankStat, purchaseAmount);
    return { rankStat, profitRate };
  }

  static calculateWinningRankStatistics(lottos, winningLotto) {
    const matchResults = lottos.map((lotto) => winningLotto.getMatchResult(lotto));
    const rankCount = RANK_INFO.reduce((acc, { key }) => {
      acc[key] = 0;
      return acc;
    }, {});

    matchResults.forEach(({ matchCount, hasBonus }) => {
      const rank = this.#determineLottoRank(matchCount, hasBonus);
      if (rank) rankCount[rank] += 1;
    });

    return rankCount;
  }

  static calculateProfitRate(rankCount, purchaseAmount) {
    const totalPrize = this.#calculateTotalPrize(rankCount);
    return (totalPrize / purchaseAmount) * 100;
  }

  static #determineLottoRank(matchCount, hasBonus) {
    const strictRule = RANK_INFO.find(
      (rule) => rule.matchCount === matchCount && rule.hasBonus === hasBonus,
    );
    if (strictRule) return strictRule.key;

    const noBonusRule = RANK_INFO.find(
      (rule) => rule.matchCount === matchCount && rule.hasBonus === false,
    );
    if (noBonusRule) return noBonusRule.key;

    return null;
  }

  static #calculateTotalPrize(rankCount) {
    return RANK_INFO.reduce((sum, { key, prize }) => {
      const wins = rankCount[key] ?? 0;
      return sum + wins * prize;
    }, 0);
  }
}
export default LottoResultCalculator;

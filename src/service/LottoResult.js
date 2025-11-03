import { RANK_INFO } from '../constants/prize.js';

class LottoResult {
  static countRanks(lottos, winningLotto) {
    const matchResults = this.#getAllLottosMatch(lottos, winningLotto);
    const rankCount = { first: 0, second: 0, third: 0, fourth: 0, fifth: 0 };

    matchResults.forEach(({ matchCount, hasBonus }) => {
      const rank = this.#getLottoRank(matchCount, hasBonus);
      if (rank) rankCount[rank] += 1;
    });

    return rankCount;
  }

  static #getLottoRank(matchCount, hasBonus) {
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

  static #getAllLottosMatch(lottos, winningLotto) {
    return lottos.map((lotto) => winningLotto.getMatchResult(lotto));
  }

  static calculateProfitRate(rankCount, purchaseAmount) {
    const totalPrize = this.#calculateTotalPrize(rankCount);
    const rate = (totalPrize / purchaseAmount) * 100;

    return rate;
  }

  static #calculateTotalPrize(rankCount) {
    let total = 0;
    RANK_INFO.forEach(({ key, prize }) => {
      const winCount = rankCount[key] ?? 0;
      total += winCount * prize;
    });
    return total;
  }
}
export default LottoResult;

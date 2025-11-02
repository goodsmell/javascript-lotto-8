class LottoResult {
  static calculate(tickets, winningLotto) {
    return tickets.map((ticket) => winningLotto.getMatchResult(ticket));
  }
}
export default LottoResult;

import LottoTicketGenerator from '../src/service/LottoTicketGenerator.js';
import Lotto from '../src/model/Lotto.js';

describe('LottoTicketGenerator', () => {
  const ticket = LottoTicketGenerator.generateOne();
  const numbers = ticket.getNumbers();
  test('숫자 6개를 가진 로또를 생성한다..', () => {
    expect(numbers).toHaveLength(6);
    expect(ticket).toBeInstanceOf(Lotto);
  });

  test('오름차순으로 생성한다.', () => {
    const sorted = [...numbers].sort((a, b) => a - b);
    expect(numbers).toEqual(sorted);
  });

  test('로또 여러장을 생성한다.', () => {
    const count = 5;
    const tickets = LottoTicketGenerator.generateMany(count);

    expect(tickets).toHaveLength(count);

    tickets.forEach((ticket) => {
      expect(ticket).toBeInstanceOf(Lotto);

      const numbers = ticket.getNumbers();
      expect(numbers).toHaveLength(6);
      expect(new Set(numbers).size).toBe(6);
    });
  });
});

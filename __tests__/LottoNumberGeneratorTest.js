import LottoTicketGenerator from '../src/service/LottoTicketGenerator.js';
import LottoTicket from '../src/model/LottoTicket.js';

describe('LottoTicketGenerator', () => {
  const ticket = LottoTicketGenerator.generateOne();
  const numbers = ticket.getNumbers();
  test('숫자 6개를 가진 로또를 생성한다..', () => {
    expect(numbers).toHaveLength(6); 
    expect(ticket).toBeInstanceOf(LottoTicket);
  });

  test('오름차순으로 생성한다.', () => {
    const sorted = [...numbers].sort((a, b) => a - b);
    expect(numbers).toEqual(sorted);
  });
});

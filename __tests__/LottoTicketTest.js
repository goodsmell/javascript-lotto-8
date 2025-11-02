import LottoTicket from '../src/model/LottoTicket.js';

describe('LottoTicket', () => {
  test('로또를 생성한다.', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const ticket = new LottoTicket(numbers);

    expect(ticket.getNumbers()).toEqual(numbers);
  });
});

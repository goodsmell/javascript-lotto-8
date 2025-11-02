import { Input } from './view/Input.js';
import { Output } from './view/Output.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import PurchaseAmount from './model/PurchaseAmount.js';
import LottoTicketGenerator from './service/LottoTicketGenerator.js';
import Lotto from './model/Lotto.js';

class App {
  async run() {
    const purchaseAmount = await this.#getMoney();
    const issuedTicketCount = purchaseAmount.getCountTicket();
    const tickets = LottoTicketGenerator.generateMany(issuedTicketCount);

    Output.printIssueLottosCount(issuedTicketCount);

    tickets.forEach((ticket) => {
      Output.printIssuedLottos(ticket.getNumbers());
    });

    const winningNumber = await this.#getWinningNumber();
  }

  async #getMoney() {
    while (true) {
      try {
        const input = await Input.askPurchaseAmount();
        const purchaseAmount = new PurchaseAmount(input);
        return purchaseAmount;
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  }

  async #getWinningNumber() {
    while (true) {
      try {
        const input = await Input.askWinningNumber();
        const winingNumber = input.split(',').map((n) => Number(n.trim()));
        const winningLotto = new Lotto(winingNumber);
        return winningLotto;
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  }
}

export default App;

import { Input } from './view/Input.js';
import { Output } from './view/Output.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import PurchaseAmount from './model/PurchaseAmount.js';
import LottoTicketGenerator from './service/LottoTicketGenerator.js';

class App {
  async run() {
    const purchaseAmount = await this.#getMoney();
    const issuedTicketCount = purchaseAmount.getCountTicket();
    const tickets = LottoTicketGenerator.generateMany(issuedTicketCount);

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
}

export default App;

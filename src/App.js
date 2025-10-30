import { Input } from './view/Input.js';
class App {
  async run() {
    const parchaseAmount = await Input.askPurchaseAmount();
  }
}

export default App;

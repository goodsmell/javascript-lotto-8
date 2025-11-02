import { MONEY_ERROR_MESSAGE } from './constants/messages.js';

export const isEmpty = (money) => {
  if (!money) {
    throw new Error(MONEY_ERROR_MESSAGE.INPUT_EMPTY);
  }
};

export const isNumber = (money) => {
  if (Number.isNaN(money)) {
    throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_NUMBER);
  }
};

export const isZero = (money) => {
  if (money === 0) {
    throw new Error(MONEY_ERROR_MESSAGE.INPUT_ZERO);
  }
};

export const isThousandUnits = (money) => {
  if (money % 1000 !== 0) {
    throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_THOUSAND_UNIT);
  }
};

export const MONEY_ERROR_MESSAGE = Object.freeze({
  INPUT_EMPTY: '[ERROR] 구입 금액이 입력되지 않았습니다.\n',
  INPUT_ZERO: '[ERROR] 0원은 입력할 수 없습니다.\n',
  INPUT_NOT_NUMBER: '[ERROR] 구입 금액은 숫자만 입력할 수 있습니다.\n',
  INPUT_NOT_THOUSAND_UNIT: '[ERROR] 금액은 1000원 단위로 입력해야 합니다.\n',
});

export const LOTTO_ERROR_MESSAGE = Object.freeze({
  INPUT_EMPTY: '[ERROR] 당첨 번호가 입력되지 않았습니다.\n',
  INPUT_NOT_NUMBER: '[ERROR] 문자는 입력할 수 없습니다.\n',
  INPUT_NOT_INTEGER: '[ERROR] 정수만 입력할 수 있습니다.\n',
  INPUT_OUT_OF_RANGE: '[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.\n',
  INPUT_NOT_SIX_NUMBERS: '[ERROR] 로또 번호는 6개를 입력해야 합니다.\n',
  INPUT_DUPLICATE: '[ERROR] 중복된 번호는 입력할 수 없습니다.\n',
});

export const BONUS_ERROR_MESSAGE = Object.freeze({
  INPUT_NOT_NUMBER: '[ERROR] 보너스 번호는 숫자여야 합니다.\n',
  INPUT_NOT_INTEGER: '[ERROR] 보너스 번호는 정수여야 합니다.\n',
  INPUT_OUT_OF_RANGE: '[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.\n',
  INPUT_DUPLICATE: '[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.\n',
});

export const INPUT_MESSAGE = Object.freeze({
  PURCHASE_AMOUNT: '구입금액을 입력해주세요.\n',
  WINNING_NUMBER: '\n당첨 번호를 입력해주세요.\n',
  BONUS_NUMBER: '\n보너스 번호를 입력해 주세요.\n',
});

export const OUTPUT_MESSAGE = Object.freeze({
  PURCHASE_RESULT: (count) => `\n${count}개를 구매했습니다.`,
  RESULT_TITLE: '\n당첨 통계',
  RESULT_DIVIDER: '---',
  PROFIT_RATE: (rate) => `총 수익률은 ${rate}%입니다.`,
});

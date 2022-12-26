import { GameBet, User } from "../types/types";

export const getDiceValueArray = (currentBet: GameBet | null, diceAmount: number) => {
  const diceValArr: number[] = [];

  if (currentBet) {
    if (diceAmount === currentBet.diceAmount) {
      for (let index = currentBet.diceValue + 1; index < 7; index++) {
        diceValArr.push(index);
      }
    } else {
      for (let index = 2; index < 7; index++) {
        diceValArr.push(index);
      }
    }
  } else {
    for (let index = 2; index < 7; index++) {
      diceValArr.push(index);
    }
  }
  return diceValArr;
};

export const getDiceAmountArray = (players: User[], currentBet: GameBet | null) => {
  const diceAmountArr: number[] = [];
  const diceInPlay = players.map((x) => x.dice.length).reduce((x, c) => x + c, 0);

  if (currentBet) {
    var allowedDiceAmount = currentBet.diceAmount;

    if (currentBet.diceValue === 6) {
      for (let index = currentBet.diceAmount + 1; index <= diceInPlay; index++) {
        diceAmountArr.push(index);
      }
    } else {
      for (let index = allowedDiceAmount; index <= diceInPlay; index++) {
        diceAmountArr.push(index);
      }
    }
  } else {
    for (let index = 1; index <= diceInPlay; index++) {
      diceAmountArr.push(index);
    }
  }
  return diceAmountArr;
};

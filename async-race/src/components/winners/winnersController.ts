import { WinnersView } from './winnersView';

type IWinnerData = {
  id: number;
  wins: number;
  time: number;
};

type PromiseType = {
  id?: number;
  wins: number;
  time: number;
};

export class WinnersController {
  constructor(id: number, time: number) {
    this.getWinnerStat(id, time);
  }

  async getWinnerStat(id: number, time: number) {
    const url = `http://localhost:3000/winners/${id}`;
    const method = 'GET';
    const res = await fetch(url, { method });
    const data = await res.json();
    if (res.status === 404) {
      this.createWinnerStat(id, time);
    } else {
      this.updateWinnerStat(id, time, data);
    }
  }

  async createWinnerStat(id: number, time: number) {
    console.log('create winner stat here');
    const createWinner = async (body: PromiseType) =>
      (
        await fetch('http://localhost:3000/winners/', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-type': 'application/json',
          },
        })
      ).json();

    createWinner({ id, wins: 1, time });
    // WinnersView.update();
    const winnersView = new WinnersView('time', 'ASC');
  }

  async updateWinnerStat(id: number, winnerTime: number, winnerData: IWinnerData) {
    console.log('save winner stat here', winnerData);
    let { wins } = winnerData;
    const resultTime = 0;
    let time = 0;
    if (winnerTime <= winnerData.time) {
      time = winnerTime;
    } else {
      time = winnerData.time;
    }
    console.log(winnerData.time, time);
    const updateWinner = async (body: PromiseType) =>
      (
        await fetch(`http://localhost:3000/winners/${id}`, {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: {
            'Content-type': 'application/json',
          },
        })
      ).json();

    updateWinner({ wins: (wins += 1), time });
    // const mainNode = document.querySelector('.container') as HTMLElement;
    const winnersView = WinnersView.sorting();
  }
}

export default WinnersController;

class LeagueService {
  constructor(
    private BASE_URL: string,
    private ROTATION_CHAMP_URL: string,
    private RIOT_API_KEY: string,
  ) {}

  async getFreeLotationChampion() {
    return fetch(
      `${this.BASE_URL}${this.ROTATION_CHAMP_URL}?api_key=${this.RIOT_API_KEY}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
          'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
          'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Content-Type': 'application/json',
        },
      },
    ).then((res) => {
      if (res.ok) return res.json()
      else throw new Error('네트워크에 문제가 있는듯?!')
    })
  }

  async getLeagueVersion() {
    return fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(
      (res) => {
        if (res.ok) return res.json()
        else throw new Error('네트워크에 뭐 문제가 있는듯')
      },
    )
  }

  async getAllChampion(verson: string) {
    return fetch(
      `https://ddragon.leagueoflegends.com/cdn/${verson}/data/ko_KR/champion.json`,
    ).then((res) => {
      if (res.ok) return res.json()
      else throw new Error('네트워크에 뭐 문제가 있는듯')
    })
  }
}

export default LeagueService

{
  const url = 'https://kr.api.riotgames.com/lol/platform/v3/champion-rotations'

  fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
      Origin: 'https://developer.riotgames.com',
      'X-Riot-Token': 'RGAPI-8c8095e6-25e8-4e1a-9191-f6d482f1da7b',
    },
  }).then((res: any) => console.log(res))
}

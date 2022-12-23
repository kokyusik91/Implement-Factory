const url =
  'https://ddragon.leagueoflegends.com/cdn/12.23.1/data/ko_KR/champion.json'

fetch(url, {
  method: 'GET',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
    Origin: 'https://developer.riotgames.com',
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data))

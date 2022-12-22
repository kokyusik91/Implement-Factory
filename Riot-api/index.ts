import { api } from './constant.js'
import { Champion } from './types.js'
import LeagueService from './service.js'

// 로케이션 정보 챔피언 뽑아내기

async function app() {
  let lolVersion = ''
  let totalChampion: any = {}
  let freeChampionIdList: number[] = []

  const leagueService = new LeagueService(
    api.BASE_URL,
    api.ROTATION_CHAMP_URL,
    api.RIOT_API_KEY,
  )

  try {
    const { freeChampionIds } = await leagueService.getFreeLotationChampion()
    freeChampionIdList = freeChampionIds
  } catch (err) {
    console.log(err as Error)
  }

  try {
    const versionList: string[] = await leagueService.getLeagueVersion()
    lolVersion = versionList[0]
  } catch (err) {
    console.log(err as Error)
  }

  try {
    const { data } = await leagueService.getAllChampion(lolVersion)
    totalChampion = data
  } catch (err) {
    console.log(err as Error)
  }
  console.log(totalChampion)
  console.log(freeChampionIdList)

  let array: Champion[] = []

  for (let champion in totalChampion) {
    freeChampionIdList.forEach((id) => {
      if (id == totalChampion[champion].key) {
        array.push(totalChampion[champion])
      }
    })
  }

  // const makeTemplate = (array: Champion[]) => {
  //   const templateArray = array.map(
  //     (champion) =>
  //       `<li><img src='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg' alt=${champion.name}/></li>`,
  //   )
  //   return templateArray.join('')
  // }

  // const template = makeTemplate(array)
  // console.log(template)

  // const ulElement = document.querySelector('.champion')! as HTMLUListElement
  // ulElement.insertAdjacentHTML('beforeend', template)
}

app()

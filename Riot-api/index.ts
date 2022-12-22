import { api } from './constant.js'
import LeagueService from './service.js'

// 로케이션 정보 챔피언 뽑아내기

async function app() {
  const leagueService = new LeagueService(
    api.BASE_URL,
    api.ROTATION_CHAMP_URL,
    api.RIOT_API_KEY,
  )

  let lolVersion = ''
  let totalChampion = {}
  try {
    const freeChampInfo = await leagueService.getFreeLotationChampion()
    console.log(freeChampInfo)
  } catch (err) {
    console.log(err as Error)
  }

  try {
    const versionList = await leagueService.getLeagueVersion()
    lolVersion = versionList[0]
  } catch (err) {
    console.log(err as Error)
  }

  try {
    totalChampion = await leagueService.getAllChampion(lolVersion)
  } catch (err) {
    console.log(err as Error)
  }

  console.log(totalChampion)
}

app()

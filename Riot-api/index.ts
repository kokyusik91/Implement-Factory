import { api } from './constants.js'
import { Champion, ChampionType } from './types.js'
import LeagueService from './service.js'

const TypeToTitle = (type: ChampionType) => {
  const classType = {
    Assassin: '암살자',
    Fighter: '전사',
    Mage: '마법사',
    Marksman: '원거리 딜러',
    Support: '서포터',
    Tank: '탱커',
  }
  return classType[type]
}

// 로케이션 정보 챔피언 뽑아내기

async function app() {
  let lolVersion = ''
  let totalChampion: any = {}
  let freeChampionIdList: number[] = []
  let champion = {}

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

  try {
    const response = await leagueService.getChampionByName(lolVersion, 'KSante')
    console.log('response', response)
  } catch (err) {
    console.log(err as Error)
  }

  console.log(totalChampion)

  let array: Champion[] = []

  for (let champion in totalChampion) {
    freeChampionIdList.forEach((id) => {
      if (id == totalChampion[champion].key) {
        array.push(totalChampion[champion])
      }
    })
  }

  const makeTemplate = (array: Champion[]) => {
    const templateArray = array.map(
      (champion) =>
        `  
      <li class="card">
        <div class="card_image">
          <img
            class="image"
            src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${
              champion.id
            }_1.jpg"
            alt=${champion.id}
          />
        </div>
        <div class='card_detail'>
        <div class="card_desc">
          <h1 class="card_desc_title">${champion.name}</h1>
          <p class="card_desc_para">${champion.title}</p>
        </div>
        <div class='card_info'>
          <div class='card_info_list'>
            <div class='role_image'>
              <img src="./images/${champion.tags[0]}.jpeg" alt=${
          champion.tags[0]
        }>
            </div>
            <h3 class='title'>역할군</h3>
            <p class='role_image_desc'>${TypeToTitle(champion.tags[0])}</p>
          </div>
          <div class='card_info_list'>
            <div class='difficulty_container'></div>
            <h3 class='title'>난이도</h3>
            <p class='difficulty_desc'>${champion.info.difficulty}</p>
          </div>
        </div>
        </div>
      </li>`,
    )
    return templateArray.join('')
  }

  const template = makeTemplate(array)
  console.log(template)

  const ulElement = document.querySelector('.champion')! as HTMLUListElement
  ulElement.insertAdjacentHTML('beforeend', template)
}

app()

import { api } from './constants.js'
import { Champion, ChampionType } from './types.js'
import LeagueService from './service.js'
import { TypeToTitle, checkDifficulty, difficultyTemplate } from './utilis.js'

// 로케이션 정보 챔피언 뽑아내기

async function app() {
  let lolVersion = ''
  let totalChampion: any = {}
  let freeChampionIdList: number[] = []
  let specificChamp: null = null

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

  const makeTemplate = (array?: Champion[]) => {
    const templateArray = array?.map(
      (champion) =>
        `  
      <li data-id=${champion.id} class="card">
        <div class='card-side card-front'>
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
            <div class='difficulty_container'>
              ${difficultyTemplate(checkDifficulty(champion.info.difficulty))}
            </div>
            <h3 class='title'>난이도</h3>
            <p class='difficulty_desc'>${checkDifficulty(
              champion.info.difficulty,
            )}</p>
          </div>
           </div>
          </div>
        </div>
        <div class='card-side card-back'>
        </div>
      </li>`,
    )
    return templateArray?.join('')
  }

  const template = makeTemplate(array)

  const ulElement = document.querySelector('.champion')! as HTMLUListElement
  ulElement.insertAdjacentHTML('beforeend', template || '')
  // 카드 클릭했을때 핸들러 함수.
  const handleClickCard = async (e: any) => {
    const card = e.target as HTMLLIElement
    const id = card.dataset.id
    let response

    if (id) {
      try {
        response = await leagueService.getChampionByName(lolVersion, id)
        const item = response.data[id]
        console.log(item)
        const bg = card.querySelector('.card-back')! as HTMLDivElement
        bg.style.backgroundImage = `url('http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${item.id}_0.jpg')`

        const template = `
          <h1 class='lore'>${item.name}</h1>
        `

        const lore = card.querySelector('.lore')
        if (!lore?.hasChildNodes()) {
          bg.insertAdjacentHTML('beforeend', template)
        }
      } catch (err) {
        console.log(err as Error)
      } finally {
      }
    }

    card.classList.toggle('rotate')
  }

  const ulTag = document.querySelector('.champion')! as HTMLUListElement
  ulTag.addEventListener('click', handleClickCard)

  const h1Tag = document.querySelector('.main_title')! as HTMLHeadingElement
  h1Tag.addEventListener('click', () => {
    console.log(specificChamp)
  })
}

app()

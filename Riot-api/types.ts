export type Champion = {
  blurb: string
  id: string
  image: ChampionImage
  info: ChampionInfo
  key: string
  name: string
  partype: string
  stats: ChampionStat
  tags: ChampionType[]
  title: string
  version: string
}

type ChampionImage = {
  full: string
  group: string
  h: number
  sprite: string
  w: number
  x: number
  y: number
}

type ChampionInfo = {
  attack: number
  defense: number
  difficulty: number
  magic: number
}

type ChampionStat = {
  armor: number
  armorperlevel: number
  attackdamage: number
  attackdamageperlevel: number
  attackrange: number
  attackspeed: number
  attackspeedperlevel: number
  crit: number
  critperlevel: number
  hp: number
  hpperlevel: number
  hpregen: number
  hpregenperlevel: number
  movespeed: number
  mp: number
  mpperlevel: number
  mpregen: number
  mpregenperlevel: number
  spellblock: number
  spellblockperlevel: number
}

export type ChampionType =
  | 'Assassin'
  | 'Fighter'
  | 'Mage'
  | 'Marksman'
  | 'Support'
  | 'Tank'

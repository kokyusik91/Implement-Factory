import { ChampionType } from './types.js'

export const TypeToTitle = (type: ChampionType) => {
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

export const checkDifficulty = (degree: number) => {
  switch (true) {
    case degree > 6:
      return '높음'
    case degree > 3:
      return '보통'
    case degree > 0:
      return '낮음'
    default:
      return '낮음'
  }
}

export const difficultyTemplate = (type: '높음' | '보통' | '낮음') => {
  const diff = {
    높음: `
      <div class='square high'></div>
      <div class='square high'></div>
      <div class='square high'></div>
    `,
    보통: `
      <div class='square normal'></div>
      <div class='square normal'></div>
      <div class='square'></div>
    `,
    낮음: `
      <div class='square low'></div>
      <div class='square'></div>
      <div class='square'></div>
    `,
  }

  return diff[type]
}

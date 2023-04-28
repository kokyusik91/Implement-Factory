const axios = require('axios')
const { parse } = require('node-html-parser')

const url = 'https://dgdr.io/' // Replace with the URL you want to fetch

axios
  .get(url)
  .then((response) => {
    const html = response.data
    const root = parse(html)
    const ogImage = root
      .querySelector('meta[property="og:image"]')
      .getAttribute('content')
    const ogTitle = root
      .querySelector('meta[property="og:title"]')
      .getAttribute('content')
    const ogDescription = root
      .querySelector('meta[property="og:description"]')
      .getAttribute('content')
    console.log(`OG Image: ${ogImage}`)
    console.log(`OG Title: ${ogTitle}`)
    console.log(`OG Description: ${ogDescription}`)
  })
  .catch((error) => console.log(error))

const axios = require('axios')
const { parse } = require('node-html-parser')

const url = 'https://dgdr.io/' // Replace with the URL you want to fetch

const extractUrl = async (url) => {
  try {
    const response = await axios.get(url, { timeout: 2000 })
    const html = response.data
    const root = parse(html)

    const ogImage = root
      .querySelector('meta[property="og:image"]')
      ?.getAttribute('content')
    const ogTitle = root
      .querySelector('meta[property="og:title"]')
      ?.getAttribute('content')
    const ogDescription = root
      .querySelector('meta[property="og:description"]')
      ?.getAttribute('content')

    return {
      ogImage: ogImage ? ogImage : null,
      ogTitle: ogTitle ? ogTitle : null,
      ogDescription: ogDescription ? ogDescription : null,
      ogRequestUrl: url,
    }
  } catch (error) {
    console.error('HTTP request failed:', error)
    return {
      ogImage: null,
      ogTitle: null,
      ogDescription: null,
      ogRequestUrl: url,
    }
  }
}

module.exports = extractUrl

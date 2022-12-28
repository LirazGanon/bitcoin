// const axios = require('axios')
import axios from 'axios'

export const bitcoinService = {
  getRate,
  getMarketPrice,
  getAvgBlockSize,
  getAvgBtcToUsd,
}

async function getRate(coins) {
  const URL = `https://blockchain.info/tobtc?currency=USD&value=${coins}`

  try {
    // const res = await axios.get('https://blockchain.info/tobtc?currency=USD&value=3')
    const res = await axios.get(URL)
    return res.data
  } catch (err) {
    console.error(err)
  }
  // do something. return a promise.
}

function getMarketPrice() {
  //return chart data.
}

async function getAvgBlockSize() {
  try {
    const response = await (
      await axios.get(
        `https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`
      )
    ).data
    let res = []
    if (response.values.length > 100) {
      res = response.values.reduce((acc, val, idx) => {
        if (idx % 10 === 0) {
          val = { MB: val.y, name: new Date(val.x).toLocaleTimeString() }
          acc.push(val)
        }
        return acc
      }, [])
    }
    return res
  } catch (error) {
    console.log(error)
  }
}

async function getAvgBtcToUsd() {
  try {
    const response = await (
      await axios.get(
        `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
      )
    ).data
    let res = []
    if (response.values.length > 100) {
      res = response.values.reduce((acc, val, idx) => {
        if (idx % 10 === 0) {
          val = { USD: val.y, name: new Date(val.x).toLocaleTimeString() }
          delete val.x
          acc.push(val)
        }
        return acc
      }, [])
    }
    return res
  } catch (error) {
    console.log(error)
  }
}

function getConfiremdTransactions() {
  // return something.
}

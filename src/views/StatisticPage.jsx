import { useState, useEffect } from 'react'
import { BlockSizeChart } from '../cmps/BlockSizeChart'
import { BtcToUsd } from '../cmps/BtcToUsd'
import { bitcoinService } from '../services/bitcoin.service'

export function StatisticPage() {
  const [avgBlockSizeData, setAvgBlockSizeData] = useState(null)
  const [avgBtcToUsd, setAvgBtcToUsd] = useState(null)

  useEffect(() => {
    async function initStats() {
      const avgBlockSize = await bitcoinService.getAvgBlockSize()
      const btcUsd = await bitcoinService.getAvgBtcToUsd()
      setAvgBlockSizeData(avgBlockSize)
      setAvgBtcToUsd(btcUsd)
    }
    initStats()
  }, [])

  return (
    <section className='statistic-page'>
      <BlockSizeChart data={avgBlockSizeData} />
      <BtcToUsd data={avgBtcToUsd}></BtcToUsd>
    </section>
  )
}

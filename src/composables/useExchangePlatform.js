export function useExchangePlatform() {
  const exchanges = [
    {
      name: 'Binance',
      logo: '/platform/Binance.png',
      url: 'https://www.binance.com',
    },
    {
      name: 'Coinbase',
      logo: '/platform/Coinbase.png',
      url: 'https://www.coinbase.com',
    },
    {
      name: 'KuCoin',
      logo: '/platform/KuCoin.png',
      url: 'https://www.kucoin.com',
    },
    {
      name: 'BlockFi',
      logo: '/platform/blockfi-logo.png',
      url: 'https://www.blockfi.com',
    },
    {
      name: 'OKX',
      logo: '/platform/okx-logo.png',
      url: 'https://www.okx.com',
    },
    {
      name: 'Coin Gecko',
      logo: '/platform/coingecko-logo.png',
      url: 'https://www.coingecko.com',
    },
    {
      name: 'Injective',
      logo: '/platform/injective-inj-coin-logo.png',
      url: 'https://www.injective.com',
    },
    {
      name: 'PancakeSwap',
      logo: '/platform/pancakeswap-logo.png',
      url: 'https://www.pancakeswap.com',
    },
    {
      name: 'SushiSwap',
      logo: '/platform/sushiswap-logo.png',
      url: 'https://www.sushi.com',
    },
    {
      name: 'Uniswap',
      logo: '/platform/uniswap-logo.png',
      url: 'https://www.uniswap.org',
    },
  ]
  return {
    exchanges,
  }
}

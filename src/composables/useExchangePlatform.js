export function useExchangePlatform() {
  const exchanges = [
    {
      name: 'Binance',
      logo: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png',
      url: 'https://www.binance.com',
    },
    {
      name: 'Coinbase',
      logo: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/89.png',
      url: 'https://www.coinbase.com',
    },
    {
      name: 'KuCoin',
      logo: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/314.png',
      url: 'https://www.kucoin.com',
    },
    {
      name: 'Kraken',
      logo: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/24.png',
      url: 'https://www.kraken.com',
    },
    {
      name: 'OKX',
      logo: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/294.png',
      url: 'https://www.okx.com',
    },
    {
      name: 'Crypto.com',
      logo: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/731.png',
      url: 'https://crypto.com',
    },
    {
      name: 'Bybit',
      logo: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/521.png',
      url: 'https://www.bybit.com',
    },
    { name: 'Gemini', logo: '', url: 'https://www.gemini.com' },
    {
      name: 'Bittrex',
      logo: '',
      url: 'https://global.bittrex.com',
    },
    {
      name: 'Huobi',
      logo: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/102.png',
      url: 'https://www.huobi.com',
    },
  ]
  return {
    exchanges,
  }
}

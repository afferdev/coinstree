import {
  Coin,
  Forecast,
  ForecastAPIData,
  FilteredCoinsData,
} from '@/interfaces';

export const filterCoinsData = (
  coinsData: Coin[],
  coinsForecast: ForecastAPIData
): FilteredCoinsData => {
  const coinsWithIndicators: Coin[] = [];
  const coinsWithoutIndicators: Coin[] = [];

  const coinsForecastObj: Forecast = {};
  coinsForecast.coinForecasts.forEach((dataVal: Forecast) => {
    const symbolKey = Object.keys(dataVal)[0];
    coinsForecastObj[symbolKey] = dataVal[symbolKey];
  });

  coinsData.forEach((dataVal: Coin) => {
    if (!coinsForecastObj[dataVal.symbol]) {
      coinsWithoutIndicators.push({
        coinName: dataVal.coinName,
        symbol: dataVal.symbol,
        marketCap: dataVal.marketCap,
      });
    } else {
      coinsWithIndicators.push({
        coinName: dataVal.coinName,
        symbol: dataVal.symbol,
        marketCap: dataVal.marketCap,
        indicator: coinsForecastObj[dataVal.symbol].forecast,
      });
    }
  });

  return {
    coinsWithIndicators,
    coinsWithoutIndicators,
  };
};

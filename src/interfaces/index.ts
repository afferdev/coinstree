export interface Coin {
  coinName: boolean;
  symbol: string;
  marketCap: number;
  indicator?: string;
}

export interface CoinAPIElem {
  coinName: boolean;
  symbol: string;
  marketCap: number;
}

export interface Forecast {
  [key: string]: {
    forecast: string;
    trackRecord: number;
  };
}

export interface ForecastAPIData {
  coinForecasts: Forecast[];
  updated: string;
}

export interface FilteredCoinsData {
  coinsWithIndicators: Coin[];
  coinsWithoutIndicators: Coin[];
}

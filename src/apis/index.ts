import { filterCoinsData } from '@/shared/utils';
import { FilteredCoinsData } from '@/interfaces';

const BASE_URL = 'https://trade.cointree.com/api';
export const SUPPORTED_ASSETS = `${BASE_URL}/exchangeconfig/supportedassetscoins`;
export const COINS_FORECAST = `${BASE_URL}/coin/forecasts`;

export const fetchData = async (): Promise<FilteredCoinsData> => {
  try {
    const coinsAPIResponse = await fetch(SUPPORTED_ASSETS);
    const coinsData = await coinsAPIResponse.json();
    const forecastAPIResponse = await fetch(COINS_FORECAST);
    const forecastData = await forecastAPIResponse.json();
    return filterCoinsData(coinsData, forecastData);
  } catch (e: any) {
    throw Error(e.message);
  }
};

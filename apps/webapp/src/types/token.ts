export interface CoinInfo {
  Id: string;
  Name: string;
  FullName: string;
  Internal: string;
  ImageUrl: string;
  Url: string;
  Algorithm: string;
  ProofType: string;
  Rating: {
    Weiss: {
      Rating: string;
      TechnologyAdoptionRating: string;
      MarketPerformanceRating: string;
    }
  };
  NetHashesPerSecond: number;
  BlockNumber: number;
  BlockTime: number;
  BlockReward: number;
  AssetLaunchDate: string;
  MaxSupply: number;
  Type: number;
  DocumentType: string;
}

export interface ConversionInfo {
  Conversion: string;
  ConversionSymbol: string;
  CurrencyFrom: string;
  CurrencyTo: string;
  Market: string;
  Supply: number;
  MktCapPenalty: number;
  TotalVolume24H: number;
  TotalTopTierVolume24H: number;
  SubBase: string;
  SubsNeeded: string[];
  RAW: string[];
  DirectPairAvailable: boolean;
}

export interface CoinData {
  CoinInfo: CoinInfo;
  ConversionInfo: ConversionInfo;
}

export interface ApiResponse {
  Message: string;
  Type: number;
  MetaData: {
    Count: number;
  };
  SponsoredData: unknown[];
  Data: CoinData[];
  RateLimit: Record<string, unknown>;
  HasWarning: boolean;
}
import { CoinData } from "./token";

export interface ApiResponse {
	Message: string;
	Type: number;
	MetaData: {
		Count: number;
	};
	SponsoredData: unknown[];
	Data: CoinData[];
}
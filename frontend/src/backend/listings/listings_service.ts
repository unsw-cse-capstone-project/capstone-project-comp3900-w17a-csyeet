import { Listing, PropertyType, PropertyFeature, Landmark } from '../../ui/util/types/listing';

export class ListingsService {
  listingsById = new Map<string,  Listing>();

  getListings(parameters: {
    location?: string,
    type?: PropertyType,
    numBedrooms?: number,
    numBathrooms?: number,
    numCarSpaces?: number,
    auctionStart?: Date,
    auctionEnd?: Date,
    features?: PropertyFeature[],
    landmarks?: Landmark[],
    includeClosedAuctions?: boolean,
    limit?: number,
    continuation?: string,
  }) {

  }
}
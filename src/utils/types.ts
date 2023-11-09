export interface BreweryDetailsType {
  id: string
  name: string
  phone: string
  postal_code: string
  country: string
  state: string
  city: string
  address_1: string
  website_url: string
  brewery_type: string
}

export interface RatingType {
  id: number
  name: string
  rating: number
  description: string
}

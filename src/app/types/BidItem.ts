export interface BidItems {
  objectId: string;
  title: string;
  description: string;
  price: number;
  type: string;
  imageUrl: string;
  typeOfPurchase: string;
  author: Author;
  bids: string[];
}

interface Author {
  __type: 'Pointer';
  className: '_User';
  objectId: string;
}

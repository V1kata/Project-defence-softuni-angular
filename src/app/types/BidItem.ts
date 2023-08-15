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
  createdAt: string;
  updatedAt: string;
}

export interface CallBackAfterCreate {
  createdAt: string;
  objectId: string;
}

interface Author {
  __type: 'Pointer';
  className: '_User';
  objectId: string;
}

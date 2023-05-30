export class PostManagement {
  id?: number = 0;
  itemName: string = '';
  itemType: string = '';
  itemSize: string = '';
  ItemQuantity: number = 0;
  ItemExpiry: Date | undefined;
  ItemDescription: string = '';
  ItemLoc: string = '';
  imageUpload: File[] = [];
}
export class PostManagementDashboard {
  id?: number = 0;
  postTitle: string = '';
  categoryId: number = 0;
  itemSize: string = '';
  location: string = '';
  validDate: Date | undefined;
  postDiscription: string = '';
  quantity: number = 0;
  images: File[] = [];
  userId: number = 0;
  userName: string = '';
  createDate: Date | undefined;
}

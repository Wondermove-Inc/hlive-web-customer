export interface ServiceRequest {
  _id: string;
  requestUser: {
    userId: string;
    mobile: string;
    firstName: string;
    lastName: string;
    email: string;
    userPhoneNumber: string;
    countryCode: string;
    country: string;
    languageCode: string;
    language: string;
    userType: string;
    representativeVinNo: string;
  };
  location: {
    type: string;
    coordinates: [];
  };
  country: string;
  bookingDate: string;
  bookingTime: string;
  requestType: string;
  requestStatus: string;
  liveConsult: boolean;
  requestData: {
    car?: {
      modelId: string;
      modelName: string;
      modelImage: string;
      regNo: string;
      vin: string;
      body: string;
      modelYear: string;
      exteriorColor: string;
      mileage: string;
    };
    damageInfo?: [
      {
        image: string;
        damagedArea: string;
        detailedArea: string;
        damageType: string;
      },
    ];
  };
  messageData: {
    _id: string;
  };
  dealership: {
    dealershipCode: string;
    dealershipLocation: {
      type: string;
      coordinates: [];
    };
    dealershipName: string;
    dealershipAddress: string;
    dealershipTelphone: string;
    representativeEmail: string;
    representativeWeb: string;
  };
  dealer?: {
    dealerCode: string;
    dealerName: string;
    dealerProfile: string;
    dealerTelephone: string;
  };
  badge?: any;
  requestDateTime: string;
  __v: number;
}

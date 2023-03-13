import { create } from 'zustand';

interface ServiceRequest {
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

interface ServiceType {
  requestDetail: ServiceRequest;
  requestAll: ServiceRequest[];
  renderType: string;
  setRequestDetail: (requestDetail: ServiceRequest) => void;
  setRequestAll: (requestAll: ServiceRequest[]) => void;

  setRenderType: (requestType: string) => void;
  chatListLoaded: boolean;
  chatListLoading: boolean;
  setChatListLoaded: (chatListLoaded: boolean) => void;
  setChatListLoading: (chatListLoading: boolean) => void;
  resetRequestDetail: () => void;
}

const requestDetailInit: ServiceRequest = {
  _id: '',
  requestUser: {
    userId: '',
    mobile: '',
    firstName: '',
    lastName: '',
    email: '',
    userPhoneNumber: '',
    countryCode: '',
    country: '',
    languageCode: '',
    language: '',
    userType: '',
    representativeVinNo: '',
  },
  location: {
    type: '',
    coordinates: [],
  },
  bookingDate: '',
  bookingTime: '',
  country: '',
  requestType: '',
  requestStatus: '',
  liveConsult: true,
  requestData: {
    car: {
      modelId: '',
      modelName: '',
      modelImage: '',
      regNo: '',
      vin: '',
      body: '',
      modelYear: '',
      exteriorColor: '',
      mileage: '',
    },
    damageInfo: [
      {
        image: '',
        damagedArea: '',
        detailedArea: '',
        damageType: '',
      },
    ],
  },
  messageData: null,

  dealership: {
    dealershipCode: '',
    dealershipLocation: {
      type: '',
      coordinates: [],
    },
    dealershipName: '',
    dealershipAddress: '',
    dealershipTelphone: '',
    representativeEmail: '',
    representativeWeb: '',
  },
  dealer: {
    dealerCode: '',
    dealerName: '',
    dealerProfile: '',
    dealerTelephone: '',
  },
  requestDateTime: '',
  __v: 0,
};

const useRequestStore = create<ServiceType>((set) => ({
  requestDetail: null,
  requestAll: [],
  renderType: '',

  setRequestDetail: (requestDetail: ServiceRequest) =>
    set((state) => ({
      ...state,
      requestDetail,
    })),

  resetRequestDetail: () =>
    set((state) => ({
      ...state,
      requestDetail: null,
    })),

  setRequestAll: (requestAll: ServiceRequest[]) =>
    set((state) => ({
      ...state,
      requestAll,
    })),
  setRenderType: (renderType: string) =>
    set((state) => ({
      ...state,
      renderType,
    })),
  chatListLoaded: false,
  chatListLoading: false,
  setChatListLoaded: (chatListLoaded: boolean) =>
    set((state) => ({
      ...state,
      chatListLoaded,
    })),
  setChatListLoading: (chatListLoading: boolean) =>
    set((state) => ({
      ...state,
      chatListLoading,
    })),
}));

export default useRequestStore;

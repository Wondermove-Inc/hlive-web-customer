import { create } from 'zustand';
import { ServiceRequest } from './type';
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

const requestStore = create<ServiceType>((set) => ({
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

export default requestStore;

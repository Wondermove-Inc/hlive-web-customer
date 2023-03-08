import { create } from 'zustand';

interface WorkingTime {
  active: boolean;
  open: string;
  close: string;
  lunchStart: string;
  lunchEnd: string;
}

interface PreferredTime {
  active: boolean;
  preferredTimeStart: string;
  preferredTimeEnd: string;
}

interface BusinessHour {
  monday: WorkingTime;
  tuesday: WorkingTime;
  wednesday: WorkingTime;
  thursday: WorkingTime;
  friday: WorkingTime;
  saturday: WorkingTime;
  sunday: WorkingTime;
}

interface Holiday {
  startDate: string;
  endDate: string;
  note: string;
}

interface Position {
  type: string;
  coordinates: any[];
}

interface ServiceYn {
  sales: boolean;
  service: boolean;
}

interface VehicleModelType {
  carType1: string;
  carType1Desc: string;
  carType2: string;
  carType2Desc: string;
  currency: string;
  image: string;
  modelDescription: string;
  modelId: string;
  powertrainList?: any[];
  price: number;
  price2?: number;
  sortNo: number;
}

interface DealershipType {
  _id: string;
  address: string;
  businessHour: BusinessHour;
  email: string;
  holiday: Holiday[];
  position: Position;
  name: string;
  preferredTime: PreferredTime;
  countryCode: string;
  scheduleUnit: number;
  serviceType: ServiceYn;
  status: boolean;
  telephone: string;
  website: string;
  dealershipCode: string;
  lastModified: string;
}

interface CustomerInfoType {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  userPhoneNumber: string;
  street: string;
  houseNumber?: string;
  postCode: string;
  city: string;
  address?: string;
  comment: string;
  ipAddress: string;
  country: string;
  countryCode: string;
  language: string;
  languageCode: string;
  userType: string;
  marketingAgreement: boolean;
  marketingEmail: boolean;
  marketingMail: boolean;
  marketingPhone: boolean;
  marketingMessenger: boolean;
}

interface initialState {
  selectedVehicleInfo: VehicleModelType;
  selectedDealershipInfo: DealershipType;
  selectedBookingDate: Date;
  selectedBookingTime: string;
  customerInfo: CustomerInfoType;
  confirmationResult: any;

  setSelectedVehicleInfo: (vehicleInfo: VehicleModelType) => void;
  setSelectedDealershipInfo: (dealershipInfo: DealershipType) => void;
  setSelectedBookingDate: (bookingDate: Date) => void;
  setSelectedBookingTime: (bookingTime: string) => void;
  setCustomerInfo: (customerInfo: CustomerInfoType) => void;
  setMarketingAgreement: (marketingAgreement: boolean) => void;
  setMarketingEmail: (marketingEmail: boolean) => void;
  setMarketingMail: (marketingMail: boolean) => void;
  setMarketingPhone: (marketingPhone: boolean) => void;
  setMarketingMessenger: (marketingMessenger: boolean) => void;
  // setConfirmationResult: (confirmationResult: object) => void;
}

const bookingStore = create<initialState>((set) => ({
  selectedVehicleInfo: {
    carType1: '',
    carType1Desc: '',
    carType2: '',
    carType2Desc: '',
    currency: '',
    image: '',
    modelDescription: '',
    modelId: '',
    powertrainList: [],
    price: 0,
    price2: 0,
    sortNo: 0,
  },
  setSelectedVehicleInfo: (vehicleInfo) => set(() => ({ selectedVehicleInfo: vehicleInfo })),

  selectedDealershipInfo: {
    _id: '',
    address: '',
    businessHour: {
      monday: {
        active: true,
        open: '',
        close: '',
        lunchStart: '',
        lunchEnd: '',
      },
      tuesday: {
        active: true,
        open: '',
        close: '',
        lunchStart: '',
        lunchEnd: '',
      },
      wednesday: {
        active: true,
        open: '',
        close: '',
        lunchStart: '',
        lunchEnd: '',
      },
      thursday: {
        active: true,
        open: '',
        close: '',
        lunchStart: '',
        lunchEnd: '',
      },
      friday: {
        active: true,
        open: '',
        close: '',
        lunchStart: '',
        lunchEnd: '',
      },
      saturday: {
        active: true,
        open: '',
        close: '',
        lunchStart: '',
        lunchEnd: '',
      },
      sunday: {
        active: true,
        open: '',
        close: '',
        lunchStart: '',
        lunchEnd: '',
      },
    },
    countryCode: '',
    dealershipCode: '',
    email: '',
    holiday: [],
    lastModified: '',
    name: '',
    position: {
      type: '',
      coordinates: [],
    },
    preferredTime: {
      active: false,
      preferredTimeStart: '',
      preferredTimeEnd: '',
    },
    scheduleUnit: 0,
    serviceType: {
      sales: false,
      service: false,
    },
    status: false,
    telephone: '',
    website: '',
  },
  setSelectedDealershipInfo: (dealershipInfo) => set(() => ({ selectedDealershipInfo: dealershipInfo })),

  selectedBookingDate: new Date(),
  selectedBookingTime: '',
  setSelectedBookingDate: (bookingDateInfo) => set(() => ({ selectedBookingDate: bookingDateInfo })),
  setSelectedBookingTime: (bookingTimeInfo) => set(() => ({ selectedBookingTime: bookingTimeInfo })),

  customerInfo: {
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    userPhoneNumber: '',
    street: '',
    houseNumber: '',
    postCode: '',
    city: '',
    address: '',
    comment: '',
    ipAddress: '',
    country: '',
    countryCode: '',
    language: '',
    languageCode: '',
    userType: 'GUEST',
    marketingAgreement: false,
    marketingEmail: false,
    marketingMail: false,
    marketingPhone: false,
    marketingMessenger: false,
  },
  setCustomerInfo: (personalInfo) => set(() => ({ customerInfo: personalInfo })),
  setMarketingAgreement: (result) => set((state) => ({ customerInfo: { ...state.customerInfo, marketingAgreement: result } })),
  setMarketingEmail: (marketingEmail) => set((state) => ({ customerInfo: { ...state.customerInfo, marketingEmail } })),
  setMarketingMail: (marketingMail) => set((state) => ({ customerInfo: { ...state.customerInfo, marketingMail } })),
  setMarketingPhone: (marketingPhone) => set((state) => ({ customerInfo: { ...state.customerInfo, marketingPhone } })),
  setMarketingMessenger: (marketingMessenger) => set((state) => ({ customerInfo: { ...state.customerInfo, marketingMessenger } })),

  confirmationResult: {},
  setConfirmationResult: (data) => set(() => ({ confirmationResult: data })),
}));

export default bookingStore;

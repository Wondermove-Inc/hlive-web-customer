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

interface initialState {
  selectedVehicleInfo: VehicleModelType;
  selectedDealershipInfo: DealershipType;
  selectedBookingDate: Date;
  selectedBookingTime: string;
  requestResult: string;

  setSelectedVehicleInfo: (vehicleInfo: VehicleModelType) => void;
  setSelectedDealershipInfo: (dealershipInfo: DealershipType) => void;
  setSelectedBookingDate: (bookingDate: Date) => void;
  setSelectedBookingTime: (bookingTime: string) => void;
  setRequestResult: (requestId: string) => void;
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

  requestResult: '',
  setRequestResult: (id) => set(() => ({ requestResult: id })),
}));

export default bookingStore;

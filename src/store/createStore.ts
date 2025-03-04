import { create } from 'zustand';

interface CreateState {
  image: File | null;
  title: string;
  description: string;
  price: number;
  supply: number;
  code: string;
  isCompiled: boolean;
  isConsoleOpen: boolean;
  error: string | null;
  contracts: string[];
  evalCode: string;
  yamlData: string;

  contractFile: string;

  setImage: (file: File | null) => void;
  setTitle: (title: string) => void;
  setDescription: (desc: string) => void;
  setPrice: (price: number) => void;
  setSupply: (supply: number) => void;
  setCode: (code: string) => void;
  setEvalCode: (code: string) => void;
  setIsCompiled: (status: boolean) => void;
  setIsConsoleOpen: (status: boolean) => void;
  setError: (error: string | null) => void;
  setContracts: (updater: string[] | ((prev: string[]) => string[])) => void;
  setContractFile: (file: string) => void;
  setYamlData: (data: string) => void;
}

export const useCreateStore = create<CreateState>((set) => ({
  image: null,
  title: '',
  description: '',
  price: 0,
  supply: 1,
  code: '',
  evalCode: '',
  isCompiled: false,
  isConsoleOpen: false,
  error: null,
  contracts: [],
  contractFile: '',
  yamlData: '',

  setImage: (file) => set({ image: file }),
  setTitle: (title) => set({ title }),
  setDescription: (desc) => set({ description: desc }),
  setPrice: (price) => set({ price }),
  setSupply: (supply) => set({ supply }),
  setCode: (code) => set({ code }),
  setIsCompiled: (status) => set({ isCompiled: status }),
  setIsConsoleOpen: (status) => set({ isConsoleOpen: status }),
  setError: (error) => set({ error }),
  setEvalCode: (code) => set({ evalCode: code }),
  setContracts: (updater) =>
    set((state) => ({
      contracts: typeof updater === 'function' ? updater(state.contracts) : updater,
    })),
  setContractFile: (file) => set({ contractFile: file }),
  setYamlData: (data) => set({ yamlData: data }),
}));

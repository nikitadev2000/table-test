import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { companyData } from "../data/company";

export interface Company {
  id: number;
  name: string;
  address: string;
  selected: boolean;
}

interface CompaniesState {
  companies: Company[];
  selectAll: boolean;
}

const initialState: CompaniesState = {
  companies: companyData,
  selectAll: false,
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,

  reducers: {
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload);
    },
    updateCompany: (state, action: PayloadAction<Company>) => {
      const index = state.companies.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
    },
    removeCompany: (state, action: PayloadAction<number>) => {
      state.companies = state.companies.filter((company) => company.id !== action.payload);
    },
    toggleSelectCompany: (state, action: PayloadAction<string>) => {
      const index = state.companies.findIndex((c) => c.id === +action.payload);
      if (index !== -1) {
        state.companies[index].selected = !state.companies[index].selected;
      }
    },
    toggleSelectAll: (state) => {
      state.selectAll = !state.selectAll;
      state.companies.forEach((company) => (company.selected = state.selectAll));
    },
  },
});

export const { addCompany, updateCompany, removeCompany, toggleSelectAll, toggleSelectCompany } =
  companiesSlice.actions;

export default companiesSlice;

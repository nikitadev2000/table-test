import { RootState } from "./store";
import { Company } from "./companiesSlice";

interface Selectors {
  isAllSelected: (state: RootState) => boolean;
  companies: (state: RootState) => Company[];
}

export const selectors: Selectors = {
  isAllSelected: (state) => state.companies.companies.filter((item: Company) => !item.selected).length === 0,
  companies: (state: RootState) => state.companies.companies,
};

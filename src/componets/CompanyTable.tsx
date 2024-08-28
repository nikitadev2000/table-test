import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

import { RootState } from "../store/store";
import { removeCompany, toggleSelectAll } from "../store/companiesSlice";

import AddCompanyForm from "./AddCompanyForm";
import CompanyRow from "./CompanyRow";

import ".././style/index.css";

const Table = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.companies.companies);
  const selectedCompanies = companies.filter((company) => company.selected);
  const selectAll = useSelector((state: RootState) => state.companies.selectAll);

  const [visibleCompanies, setVisibleCompanies] = useState(20);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const handleRemoveSelected = () => {
    selectedCompanies.forEach((company) => {
      dispatch(removeCompany(company.id));
    });
  };

  const handleSelectAll = () => {
    dispatch(toggleSelectAll());
  };

  const loadMoreCompanies = useCallback(() => {
    if (inView && visibleCompanies < companies.length && !loading) {
      setLoading(true);
      setTimeout(() => {
        setVisibleCompanies((prev) => prev + 20);
        setLoading(false);
      }, 3000); // Таймер для имитации подгрузки данных
    }
  }, [inView, visibleCompanies, companies.length, loading]);

  React.useEffect(() => {
    loadMoreCompanies();
  }, [inView, loadMoreCompanies]);

  return (
    <>
      <AddCompanyForm />
      <div className="table-container">
        <div className="table-controls">
          <label className="custom-checkbox">
            <input onClick={handleSelectAll} checked={selectAll} type="checkbox" />
            <span className={"checkbox-checkmark " + "toglle-all"}></span>
          </label>
          <span className="selectedAll">Выбрать всё</span>
          <button onClick={handleRemoveSelected} disabled={selectedCompanies.length === 0}>
            Удалить выбранное
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Название компании</th>
              <th>Адрес</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {companies.slice(0, visibleCompanies).map((company, index) => (
              <CompanyRow key={company.id} company={company} ref={index === visibleCompanies - 1 ? ref : null} />
            ))}
          </tbody>
        </table>
        {loading && <div className="loader">Идет загрузка...</div>}
      </div>
    </>
  );
};

export default Table;

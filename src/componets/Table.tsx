import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import AddCompanyForm from "./AddCompanyForm";
import CompanyRow from "./CompanyRow";
import { RootState } from "../store/store";

import "../App.css";

const Table = () => {
  const allCompanies = useSelector((state: RootState) => state.companies.companies);
  const [visibleCompanies, setVisibleCompanies] = useState(20);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1, 
  });

  const loadMoreCompanies = useCallback(() => {
    if (inView && visibleCompanies < allCompanies.length && !loading) {
      setLoading(true);
      setTimeout(() => {
        setVisibleCompanies((prev) => prev + 20);
        setLoading(false);
      }, 3000);
    }
  }, [inView, visibleCompanies, allCompanies.length, loading]);

 
  React.useEffect(() => {
    loadMoreCompanies();
  }, [inView, loadMoreCompanies]);

  return (
    <>
      <AddCompanyForm />
      <div className="table-container">
        <div className="table-controls">
          <input type="checkbox" />
          <span>Выбрать всё</span>
          <button onClick={() => {}} disabled={true}>
            Удалить выбранное
          </button>
        </div>
        <div className="table-header">
          <h3>Название компании</h3>
          <h3>Адрес</h3>
        </div>
        <div className="table-content">
          {allCompanies.slice(0, visibleCompanies).map((company, index) => (
            <CompanyRow
              key={company.id}
              company={company}
              ref={index === visibleCompanies - 1 ? ref : null} 
            />
          ))}
        </div>
        {loading && <div >Идет загрузка...</div>}
      </div>
    </>
  );
};

export default Table;

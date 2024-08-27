import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompany, toggleSelectAll } from "../store/companiesSlice";
import "../App.css";
import { RootState } from "../store/store";

const AddCompanyForm = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const selectAll = useSelector((state: RootState) => state.companies.selectAll);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (name && address) {
      dispatch(
        addCompany({
          id: +new Date(),
          name: name,
          address: address,
          selected: false,
        })
      );
      setName("");
      setAddress("");
    } else {
      alert("Нужно заполнить все поля!");
    }
  };

  const handleSelectAll = () => {
    if (selectAll === true) dispatch(toggleSelectAll());
  };

  

  return (
    <div className="companyForm">
      <input
        type="text"
        onClick={handleSelectAll}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название компании"
      />
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Адрес компании" />
      <button onClick={ handleAdd }>Добавить компанию</button>
    </div>
  );
};

export default AddCompanyForm;

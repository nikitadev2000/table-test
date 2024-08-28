import { useState } from "react";
import { useDispatch } from "react-redux";

import { addCompany } from "../store/companiesSlice";

import ".././style/index.css";

const AddCompanyForm = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");

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

  return (
    <div className="company-form">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Название компании" />
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Адрес компании" />
      <button onClick={handleAdd}>Добавить компанию</button>
    </div>
  );
};

export default AddCompanyForm;

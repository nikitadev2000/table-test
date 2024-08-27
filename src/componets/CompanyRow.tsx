import  { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Company, removeCompany, updateCompany } from "../store/companiesSlice";

import "../App.css";

interface CompanyRowProps {
  company: Company;
}


const CompanyRow = forwardRef<HTMLDivElement, CompanyRowProps>(({ company }, ref) => {
  const dispatch = useDispatch();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [name, setName] = useState(company.name);
  const [address, setAddress] = useState(company.address);

  const handleUpdate = () => {
    dispatch(updateCompany({ ...company, name, address }));
    setIsEditingName(false);
    setIsEditingAddress(false);
  };

  const handleRemove = (id: number) => {
    dispatch(removeCompany(id));
  };

  return (
    <div className="company-row" ref={ref}>
      <input type="checkbox" checked={company.selected} />
      {isEditingName ? (
        <input
          className="company-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleUpdate}
          autoFocus
        />
      ) : (
        <div className="company-name" onClick={() => setIsEditingName(true)}>
          {name}
        </div>
      )}
      {isEditingAddress ? (
        <input
          className="company-input"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onBlur={handleUpdate}
          autoFocus
        />
      ) : (
        <div className="company-address" onClick={() => setIsEditingAddress(true)}>
          {address}
        </div>
      )}
      <div className="addButton" onClick={() => handleRemove(company.id)}>
        X
      </div>
    </div>
  );
});

export default CompanyRow;

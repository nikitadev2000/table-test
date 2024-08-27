import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Company, removeCompany, toggleSelectCompany, updateCompany } from "../store/companiesSlice";
import "../App.css";

interface CompanyRowProps {
  company: Company;
}

const CompanyRow = forwardRef<HTMLTableRowElement, CompanyRowProps>(({ company }, ref) => {
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

  const handleToggleSelect = () => {
    dispatch(toggleSelectCompany(company.id.toString()));
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <tr className={`company-row ${company.selected ? "selected" : ""}`} ref={ref}>
      <td>
        <label className="custom-checkbox">
          <input onClick={handleToggleSelect} type="checkbox" checked={company.selected} />
          <span className="checkbox-checkmark"></span>
        </label>
      </td>
      <td className="cell-table" onClick={() => setIsEditingName(true)}>
        {isEditingName ? (
          <input
            className="company-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleUpdate}
            autoFocus
            onKeyDown={handleKeyDown}
          />
        ) : (
          name
        )}
      </td>
      <td className="cell-table" onClick={() => setIsEditingAddress(true)}>
        {isEditingAddress ? (
          <input
            className="company-input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={handleUpdate}
            autoFocus
            onKeyDown={handleKeyDown}
          />
        ) : (
          address
        )}
      </td>
      <td className="delete-button" onClick={() => handleRemove(company.id)}>
        ✖
      </td>
    </tr>
  );
});

export default CompanyRow;

import React from "react";
import { Field } from "../interfaces";
interface OverviewProps {
  fields: Field[];
  entity: any;
}
const Overview: React.FC<OverviewProps> = ({ fields, entity }) => {
  const renderEntity = () => {
    return fields.map((field) => {
      if (field.overviewDisplay)
        return (
          <p className="modal-item">
            <span className="modal-field">{field.fieldDisplay}:</span>{" "}
            <span>{entity[field.fieldName]}</span>
          </p>
        );
    });
  };
  return <div className="overview"></div>;
};

export default Overview;
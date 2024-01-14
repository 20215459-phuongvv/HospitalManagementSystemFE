const Autocomplete = ({ field, options, setFieldValue }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    // Additional filtering logic if needed
  };

  const renderOptions = () => {
    const filteredOptions = options.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filteredOptions.map((item) => (
      <li
        className="choosen-item"
        key={item.id}
        onClick={() => {
          console.log(field.fieldName, item.name);
          setFieldValue(field.fieldName, item.name);
          setFieldValue(field.fieldName.replace("Name", "Id"), item.id);
          setInputValue(""); // Clear input after selection
        }}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        {item.name}
      </li>
    ));
  };

  return (
    <div className="modal-data modal-modify-choosen">
      <label className="modal-label" htmlFor={field.fieldName}>
        {field.fieldDisplay}
      </label>
      <Field
        type="text"
        name={field.fieldName}
        className="modal-input"
        onChange={handleChange}
        value={inputValue}
      />
      <ErrorMessage name={field.fieldName} component="div" className="error" />
      <div className="choosen-container">
        <ul className="choosen">{renderOptions()}</ul>
      </div>
    </div>
  );
};

export default AutoComplete;
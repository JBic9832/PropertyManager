export default function FormField({ label, fieldName, placeholder }) {
  return (
    <p>
      <label className="flex flex-col">
        {label}{" "}
        <input
          className="border-2 border-black"
          type="text"
          name={fieldName}
          placeholder={placeholder}
        />
      </label>
    </p>
  );
}

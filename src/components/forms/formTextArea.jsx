export default function FormTextArea({ label, name, value, placeholder, rows, onChange }) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    );
  }
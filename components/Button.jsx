export default function Button({ children, css, onClick }) {
  return (
    <button
      className={`bg-gray-400 rounded-xl hover:bg-gray-700 hover:shadow-lg ${css}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

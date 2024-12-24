export function Information({ text }: { text: string }) {
  return (
    <div className="relative ml-2 group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-500 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
        />
      </svg>
      <div className="absolute p-2 ml-2 text-sm text-white transition-opacity duration-200 transform -translate-y-1/2 bg-gray-700 rounded-lg shadow-lg opacity-0 w-96 top-1/2 left-full group-hover:opacity-100">
        {text}
      </div>
    </div>
  );
}

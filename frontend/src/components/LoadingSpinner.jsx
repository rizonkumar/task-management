import { Loader2 } from "lucide-react";

export default function LoadingSpinner({
  size = "default",
  text = "Loading...",
}) {
  const sizes = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="relative">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-25"></div>

        <Loader2
          className={`${sizes[size]} text-blue-600 animate-spin`}
          strokeWidth={3}
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
      </div>

      {text && (
        <p className="text-gray-600 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
}

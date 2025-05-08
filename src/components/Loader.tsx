export const Loader = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <div
            className={`animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-opacity-50 mb-6`}
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Loading...
        </h2>
        <p className="text-gray-600 max-w-md">
            We're preparing content in your language. Please hang tight!
        </p>
    </div>
);
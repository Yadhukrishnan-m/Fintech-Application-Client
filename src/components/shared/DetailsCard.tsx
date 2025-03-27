interface DetailsCardProps {
  title: string;
  icon?: React.ReactNode;
  data: Record<string, string | number>;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ title, icon, data }) => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-teal-100">
      <h3 className="text-lg font-semibold text-teal-700 mb-4 flex items-center">
        {icon && <span className="h-5 w-5 mr-2 text-teal-500">{icon}</span>}
        {title}
      </h3>
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => {
          // Ensure value is either string or number before rendering
          if (typeof value !== "string" && typeof value !== "number") {
            return null; // Skip rendering invalid types
          }

          return (
            <div key={key} className="flex justify-between">
              <span className="text-gray-500">{key}:</span>
              <span
                className={`font-medium ${
                  key === "CIBIL Score" && typeof value === "number"
                    ? value > 700
                      ? "text-green-600"
                      : value > 500
                      ? "text-amber-600"
                      : "text-red-600"
                    : ""
                }`}
              >
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailsCard;

import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

export interface Column<T> {
  key: keyof T;
  label: string;
}

interface Action<T> {
  label: (row: T) => string;
  onClick: (row: T) => void;
  getColor: (row: T) => boolean; // Change this to return a boolean for the switch
}

interface Link<T> {
  label: string;
  to: (row: T) => string;
   columnName?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
  links?: Link<T>[];
  actionsLabel?: string; 
  linksLabel?: string;
}

export default function DataTable<T>({
  columns,
  data,
  actions = [],
  links = [],
  actionsLabel = "Actions",
  linksLabel = "Links",
}: DataTableProps<T>) {
  const navigate = useNavigate();

  // Function to render card-based view for mobile
  const renderMobileView = () => {
    return (
      <div className="block lg:hidden">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="mb-4 border border-teal-200 rounded-lg shadow-sm bg-white p-4"
          >
            {columns.map((col, colIndex) => (
              <div
                key={colIndex}
                className="py-2 flex justify-between border-b border-teal-100"
              >
                <span className="font-medium text-teal-700">{col.label}</span>
                <span className="text-gray-800">
                  {row[col.key] as ReactNode}
                </span>
              </div>
            ))}

            {/* Render actions with Switch */}
            {actions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {actions.map((action, actionIndex) => (
                  <div key={actionIndex} className="flex items-center gap-2">
                    <span className="text-teal-700">{action.label(row)}</span>
                    <Switch
                      checked={action.getColor(row)}
                      onCheckedChange={() => action.onClick(row)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Render links */}
            {links.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {links.map((link, linkIndex) => (
                  <button
                    key={linkIndex}
                    onClick={() => navigate(link.to(row))}
                    className="relative px-5 py-2 text-white font-semibold tracking-wide transition-all duration-300 
                   bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 
                   active:scale-95 rounded-lg shadow-lg overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-white opacity-10 transition-all duration-500 group-hover:opacity-20"></span>
                    <span className="relative">{link.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Function to render traditional table for desktop
  const renderDesktopView = () => {
    return (
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white border border-teal-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-teal-50">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="py-3 px-4 border-b border-teal-200 text-left text-teal-800"
                >
                  {col.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="py-3 px-4 border-b border-teal-200 text-left text-teal-800">
                  {actionsLabel || "Actions"}{" "}
                  {/* Default to "Actions" if not provided */}
                </th>
              )}

              {links.length > 0 && (
                <th className="py-3 px-4 border-b border-teal-200 text-left text-teal-800">
                  {linksLabel || "Links"}{" "}
                  {/* Default to "Links" if not provided */}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-teal-50 transition-colors duration-150"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="py-3 px-4 border-b border-teal-100"
                  >
                    {row[col.key] as ReactNode}
                  </td>
                ))}

                {/* Render actions with Switch */}
                {actions.length > 0 && (
                  <td className="py-3 px-4 border-b border-teal-100">
                    <div className="flex flex-wrap gap-2">
                      {actions.map((action, actionIndex) => (
                        <div
                          key={actionIndex}
                          className="flex items-center gap-2"
                        >
                          <span className="text-teal-700">
                            {action.label(row)}
                          </span>
                          <Switch
                            checked={action.getColor(row)}
                            onCheckedChange={() => action.onClick(row)}
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                )}

                {/* Render links */}
                {links.length > 0 && (
                  <td className="py-3 px-4 border-b border-teal-100">
                    <div className="flex items-center gap-2 flex-nowrap overflow-auto">
                      {links.map((link, linkIndex) => (
                        <button
                          key={linkIndex}
                          onClick={() => navigate(link.to(row))}
                          className="relative px-5 py-2 text-white font-semibold tracking-wide transition-all duration-300 
        bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 
        active:scale-95 rounded-lg shadow-lg overflow-hidden group whitespace-nowrap"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
      {renderDesktopView()}
      {renderMobileView()}
    </div>
  );
}

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type BreadcrumbProps = {
  paths: { name: string; link?: string }[];
};

export default function Breadcrumb({ paths }: BreadcrumbProps) {
  return (
    <nav className="text-sm font-medium text-teal-600">
      <ul className="flex items-center space-x-2">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            {path.link ? (
              <Link to={path.link} className="hover:text-teal-800 transition">
                {path.name}
              </Link>
            ) : (
              <span className="text-teal-800">{path.name}</span>
            )}
            {index < paths.length - 1 && (
              <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate=useNavigate()
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-700 leading-tight mb-4">
            Quick and Easy Loans for Your Financial Needs.
          </h1>
          <p className="text-gray-600 mb-6 max-w-lg">
            We offer specialized loan options for individuals, businesses, and
            agricultural needs, ensuring tailored financial solutions for every
            requirement. Our loans are designed to help you achieve your
            financial goals with flexible terms and competitive rates. Whether
            you're looking to expand your business, invest in farming equipment,
            or manage personal expenses, we provide quick approvals and a
            transparent process to make borrowing simple and stress-free.
          </p>
          <button
            onClick={() => navigate("/loans")}
            className="inline-flex bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-medium"
          >
            Get Started
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/HomeImages/Banner.avif"
            alt="Financial services illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default Banner;

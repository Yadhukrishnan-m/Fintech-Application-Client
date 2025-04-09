// import { Image } from "lucide-react";


export default function AboutUs() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8faf9] to-[#e9f5ee] opacity-70"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2d6a4f] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2d6a4f] opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#e9f5ee] text-[#2d6a4f] text-sm font-medium">
                About Our Company
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#2d6a4f] to-[#52b788]">
                We're Committed to Your Financial Success
              </h1>
              <p className="text-gray-600 md:text-xl/relaxed lg:text-xl/relaxed max-w-[600px]">
                Since our founding in 2010, we've been dedicated to providing
                accessible financial solutions that help individuals and
                businesses achieve their goals.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    {/* <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Trusted"
                      width={48}
                      height={48}
                      className="object-cover"
                    /> */}
                  </div>
                  <div className="ml-2">
                    <p className="font-medium">Trusted by</p>
                    <p className="text-[#2d6a4f]">10,000+ Customers</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    {/* <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Experience"
                      width={48}
                      height={48}
                      className="object-cover"
                    /> */}
                  </div>
                  <div className="ml-2">
                    <p className="font-medium">Experience</p>
                    <p className="text-[#2d6a4f]">13+ Years</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#2d6a4f] rounded-3xl opacity-5 transform rotate-3"></div>
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-[#e9f5ee]">
                {/* <Image
                  src="/placeholder.svg?height=500&width=600&text=Financial+Team"
                  alt="Team of financial professionals"
                  fill
                  className="object-cover"
                /> */}
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#e9f5ee] rounded-2xl z-[-1]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#e9f5ee] text-[#2d6a4f] text-sm font-medium">
              Our Purpose
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#2d6a4f] to-[#52b788]">
              Our Mission
            </h2>
            <p className="max-w-[800px] text-gray-600 md:text-xl/relaxed lg:text-xl/relaxed">
              To empower individuals and businesses with accessible, transparent
              financial solutions that foster growth and stability.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#2d6a4f] to-[#52b788] rounded-full mt-2"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-[#2d6a4f]"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
                title: "Financial Accessibility",
                desc: "We believe everyone deserves access to fair and transparent financial services that meet their unique needs.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-[#2d6a4f]"
                  >
                    <path d="M2 12h20M16 6l6 6-6 6" />
                  </svg>
                ),
                title: "Customer-Centric Approach",
                desc: "We put our customers first, tailoring solutions to meet their unique needs and providing exceptional service.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-[#2d6a4f]"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                ),
                title: "Integrity & Trust",
                desc: "We operate with the highest standards of ethics and transparency, building lasting relationships based on trust.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center space-y-4 text-center group"
              >
                <div className="bg-gradient-to-br from-[#e9f5ee] to-white p-6 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300 border border-[#e9f5ee]">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2d6a4f] group-hover:text-[#52b788] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8faf9] to-white"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#e9f5ee] text-[#2d6a4f] text-sm font-medium">
              What We Stand For
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#2d6a4f] to-[#52b788]">
              Our Core Values
            </h2>
            <p className="max-w-[800px] text-gray-600 md:text-xl/relaxed lg:text-xl/relaxed">
              The principles that guide our decisions and shape our company
              culture.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#2d6a4f] to-[#52b788] rounded-full mt-2"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Transparency",
                desc: "Clear communication and no hidden fees",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ),
              },
              {
                title: "Innovation",
                desc: "Constantly improving our services and processes",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M12 2v8" />
                    <path d="m4.93 10.93 1.41 1.41" />
                    <path d="M2 18h2" />
                    <path d="M20 18h2" />
                    <path d="m19.07 10.93-1.41 1.41" />
                    <path d="M22 22H2" />
                    <path d="m16 6-4 4-4-4" />
                    <path d="M16 18a4 4 0 0 0-8 0" />
                  </svg>
                ),
              },
              {
                title: "Responsibility",
                desc: "Promoting financial literacy and responsible lending",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                ),
              },
              {
                title: "Community",
                desc: "Supporting the communities we serve",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
            ].map((value, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2d6a4f] to-[#52b788] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                <div className="bg-white p-8 rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-300 border border-[#e9f5ee] relative z-10 group-hover:translate-y-1 h-full">
                  <div className="text-[#2d6a4f] group-hover:text-white transition-colors duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#2d6a4f] mt-4 group-hover:text-white transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 mt-2 group-hover:text-white transition-colors duration-300">
                    {value.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

function LoanProcess() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-700 mb-12">
          How we works ?
        </h2>
        <div className="space-y-12 md:space-y-16">
          {/* Step 1: Application */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 text-teal-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                  1
                </div>
                <h3 className="text-xl font-semibold text-teal-700">
                  Application
                </h3>
              </div>
              <p className="text-gray-600">
                Starting your loan application with QuicFin is quick, secure,
                and hassle-free. Our fully digital platform allows you to apply
                from the comfort of your home, eliminating long queues and
                paperwork. Simply sign up or log in, provide your personal and
                financial details, including income, employment information, and
                loan purpose, and submit your application. Our automated
                verification system ensures a fast and smooth approval process,
                helping you access the funds you need without unnecessary
                delays. Whether for personal use, business expansion, or
                emergencies, QuicFin offers a reliable and transparent lending
                experience tailored to your needs.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/HomeImages/Application.avif"
                alt="Application process"
                className="max-w-full h-auto"
              />
            </div>
          </div>

          {/* Step 2: Documentation and Verification */}
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 text-teal-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                  2
                </div>
                <h3 className="text-xl font-semibold text-teal-700">
                  Documentation and Verification
                </h3>
              </div>
              <p className="text-gray-600">
                Submit the required documents to verify your identity, income,
                and other relevant details, ensuring a smooth and secure loan
                application process. Upload valid identification proof, income
                statements, and any additional documents needed for assessment.
                Our team will carefully review your application to verify
                authenticity and ensure it meets our lending criteria. With a
                streamlined verification process, we aim to provide quick
                approvals while maintaining transparency and security, helping
                you access the funds you need without unnecessary delays.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/HomeImages/DocumentVerification.jpg"
                alt="Documentation process"
                className="max-w-full h-auto"
              />
            </div>
          </div>

          {/* Step 3: Credit Assessment */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 text-teal-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                  3
                </div>
                <h3 className="text-xl font-semibold text-teal-700">
                  Credit Assessment
                </h3>
              </div>
              <p className="text-gray-600">
                Our financial experts carefully evaluate your application by
                analyzing your credit history, current financial situation, and
                repayment capacity. This assessment helps us determine your
                creditworthiness, ensuring that you receive the best loan
                options suited to your financial profile. By reviewing factors
                such as income stability, existing liabilities, and past
                repayment behavior, we can accurately assess your credit score
                and overall eligibility, making the lending process fair,
                transparent, and tailored to your needs.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/HomeImages/CreditAssesment.jpg"
                alt="Credit assessment process"
                className="max-w-full h-auto"
              />
            </div>
          </div>

          {/* Step 4: Loan Approval */}
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 text-teal-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                  4
                </div>
                <h3 className="text-xl font-semibold text-teal-700">
                  Loan Approval
                </h3>
              </div>
              <p className="text-gray-600">
                If your application meets our lending criteria, we will promptly
                approve your loan and provide you with the terms and conditions,
                including interest rates, repayment schedule, and other
                essential details. Once you review and accept the offer, the
                funds will be securely disbursed to your registered bank
                account, ensuring quick and hassle-free access to the financial
                support you need. Our efficient processing system ensures
                minimal waiting time, allowing you to focus on your financial
                goals without delays. With QuicFin, you can trust a transparent
                and reliable lending experience tailored to your needs.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/HomeImages/LoanApproval.avif"
                alt="Loan approval process"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoanProcess;

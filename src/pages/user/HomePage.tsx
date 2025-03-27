import Banner from "@/components/user/shared/Banner"
import Footer from "@/components/user/shared/Footer"
import Header from "@/components/user/shared/Header"
import LoanHighlights from "@/components/user/home/LoanHighlights"
import LoanProcess from "@/components/user/home/LoanProcess"

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Banner />
      <LoanHighlights />
      <LoanProcess />
      <Footer />
    </div>
  );
} 

export default HomePage
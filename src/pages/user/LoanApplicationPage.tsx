import Breadcrumb from '@/components/shared/Breadcrumb'
import LoanApplicationForm from '@/components/user/application/LoanApplicationForm'
import Footer from '@/components/user/shared/Footer'
import Header from '@/components/user/shared/Header'
import { useParams } from 'react-router-dom'

function LoanApplicationPage() {
    const {id}=useParams()
  return (
    <>
      <Header />
      <Breadcrumb
        paths={[
          { name: "loans", link: "/loans" },
          { name: "loan Details", link: `/loan/${id}` },
          { name: "application" },
        ]}
      />
      <LoanApplicationForm />
      <Footer />
    </>
  );
}

export default LoanApplicationPage
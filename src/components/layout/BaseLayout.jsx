import Footer from "./Footer";
import Header from "./Header";

const BaseLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  )
}

export default BaseLayout;
import Header from "./Header";

function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
export default Layout;

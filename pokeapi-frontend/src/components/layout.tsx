import { Outlet } from "react-router";

function Layout() {
  return (
    <main className="flex flex-col antialiased min-h-dvh py-12">
      <Outlet />
      {/* <div className="max-w-7xl mx-auto">
      </div> */}
    </main>
  );
}

export default Layout;

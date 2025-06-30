import { Outlet } from "react-router";

function Layout() {
  return (
    <main className="flex flex-col antialiased min-h-dvh py-12">
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;

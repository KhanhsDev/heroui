import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen justify-between w-full overflow-hidden bg-[var(--bg-primary)] layout-background-img">
      <div className="flex flex-row overflow-hidden flex-1">
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* ========== HEADER SECTION ========== */}
          <Header />
          {/* ========== CONTENT SECTION ========== */}
          <main className="flex-1 w-full overflow-hidden">
            {/* Content area - children will be rendered here */}
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

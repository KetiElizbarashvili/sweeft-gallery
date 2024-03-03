import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {children}
      </main>
      <footer className="p-4 bg-blue-600 text-gray">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Photo Gallery App. All rights reserved.</p>
          <p>Powered by Making Science • Sweeft</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
 

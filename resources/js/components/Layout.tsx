import React from 'react';
import { Link } from '@inertiajs/react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-light bg-white border-bottom shadow-sm px-3 py-3">
        <div className="container-fluid d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between">
          <Link href="/search" className="navbar-brand text-success fw-bold mb-2 mb-md-0" style={{ lineHeight: '1.2' }}>
            <span className="d-none d-sm-inline">
              ♻ Waste Collection and Recycling Locator
            </span>
            <span className="d-inline d-sm-none">
              ♻ Waste Collection and<br />Recycling Locator
            </span>
          </Link>

          <div className="d-flex flex-column flex-sm-row gap-2">
            <Link href="/search" className="nav-link text-success fw-medium px-0">
              Search
            </Link>
            <Link href="/contact" className="nav-link text-success fw-medium px-0">
              Contact
            </Link>
            <Link href="/inquiries" className="nav-link text-success fw-medium px-0">
              Inquiries
            </Link>
          </div>
        </div>
      </nav>

      <main className="container py-5">
        {children}
      </main>
    </div>
  );
};

export default Layout;

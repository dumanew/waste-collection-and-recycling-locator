import React from 'react';
import Layout from '../components/Layout';
import { Head } from '@inertiajs/react';

interface Inquiry {
  id: number;
  name: string;
  contact_number: string;
  message: string;
  center_type: string;
  region: string;
  city: string;
  center_name: string;
  center_email: string;
  center_contact_number: string;
  material_name: string | null; 
  created_at: string;
}



const Inquiries = ({ inquiries }: { inquiries: Inquiry[] }) => {
  return (
    <Layout>
      <Head title="Inquiries" />
      <div className="card shadow-sm p-4">
        <h2 className="text-success mb-4 text-center">📋 Submitted Contact Forms</h2>

        {inquiries.length === 0 ? (
          <p className="text-muted text-center">No inquiries submitted yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Contact Number</th>
                  <th>Message</th>
                  <th>Center Type</th>
                  <th>Region</th>
                  <th>City</th>
                  <th>Center</th>
                  <th>Center Contact Number</th>
                  <th>Center Email</th>
                  <th>Material</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td>{new Date(inq.created_at).toLocaleString()}</td>
                    <td>{inq.name}</td>
                    <td>{inq.contact_number}</td>
                    <td>{inq.message}</td>
                    <td>{inq.center_type}</td>
                    <td>{inq.region}</td>
                    <td>{inq.city}</td>
                    <td>{inq.center_name}</td>
                    <td>{inq.center_contact_number}</td>
                    <td>{inq.center_email}</td>
                    <td>{inq.material_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Inquiries;

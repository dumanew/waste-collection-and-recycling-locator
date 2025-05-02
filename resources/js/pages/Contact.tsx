import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Head } from '@inertiajs/react';

const Contact = () => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [message, setMessage] = useState('');
  const [centerType, setCenterType] = useState('recycling');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [center, setCenter] = useState('');
  const [centerDetails, setCenterDetails] = useState<null | {
    contact_number: string;
    email: string;
    material_id: number;
    material_name: string;
  }>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [centerNames, setCenterNames] = useState<string[]>([]);

  const regions = [
    'National Capital Region (NCR)',
    'Cordillera Administrative Region (CAR)',
    'Ilocos Region (Region I)',
    'Cagayan Valley (Region II)',
    'Central Luzon (Region III)',
    'Calabarzon (Region IV-A)',
    'Mimaropa (Region IV-B)',
    'Bicol Region (Region V)',
    'Western Visayas (Region VI)',
    'Central Visayas (Region VII)',
    'Eastern Visayas (Region VIII)',
    'Zamboanga Peninsula (Region IX)',
    'Northern Mindanao (Region X)',
    'Davao Region (Region XI)',
    'Soccsksargen (Region XII)',
    'Caraga (Region XIII)',
    'Autonomous Region in Muslim Mindanao (ARMM)',
  ];

  useEffect(() => {
    if (region) {
      axios.get('/api/cities', { params: { region } }).then((res) => {
        setCities(res.data);
        setCity('');
        setCenter('');
        setCenterNames([]);
        setCenterDetails(null);
      });
    }
  }, [region]);

  useEffect(() => {
    if (region && city && centerType) {
      axios
        .get('/api/center-names', {
          params: { region, city, type: centerType },
        })
        .then((res) => {
          setCenterNames(res.data);
          setCenter('');
          setCenterDetails(null);
        });
    }
  }, [region, city, centerType]);

  useEffect(() => {
    if (center) {
      axios
        .get('/api/center-details', {
          params: { name: center },
        })
        .then((res) => {
          console.log('Center details loaded:', res.data);
          setCenterDetails(res.data);
        });
    }
  }, [center]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('/api/inquiries', {
        name,
        contact_number: contactNumber,
        message,
        center_type: centerType,
        region,
        city,
        center_name: center,
        center_contact_number: centerDetails?.contact_number ?? '',
        center_email: centerDetails?.email ?? '',
        material_id: centerDetails?.material_id ?? null,
        material_name: centerDetails?.material_name ?? '',
      });

      alert('Inquiry submitted successfully!');
      setName('');
      setContactNumber('');
      setMessage('');
      setCenter('');
      setCenterDetails(null);
    } catch (error) {
      console.error('❌ Axios Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <Layout>
      <Head title="Contact" />
      <div className="card shadow-sm p-4" style={{ backgroundColor: '#ffffff' }}>
        <h2 className="text-success mb-4 text-center">📞 Contact Us</h2>
        <form onSubmit={handleSubmit} className="row gy-3">
          <div className="col-md-6">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Contact Number</label>
            <input
              type="text"
              className="form-control"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Center Type</label>
            <select
              className="form-select"
              value={centerType}
              onChange={(e) => setCenterType(e.target.value)}
            >
              <option value="recycling">Recycling Center</option>
              <option value="waste">Waste Center</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Region</label>
            <select
              className="form-select"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">-- Select Region --</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">City</label>
            <select
              className="form-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!region}
            >
              <option value="">-- Select City --</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Center Name</label>
            <select
              className="form-select"
              value={center}
              onChange={(e) => setCenter(e.target.value)}
              disabled={!city}
            >
              <option value="">-- Select Center --</option>
              {centerNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-success px-4">
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;

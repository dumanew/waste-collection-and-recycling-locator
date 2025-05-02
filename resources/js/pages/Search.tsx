import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Head } from '@inertiajs/react';

const Search = () => {
  const [type, setType] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [material, setMaterial] = useState('');
  const [materials, setMaterials] = useState<{ id: number; name: string }[]>([]);
  const [centerName, setCenterName] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [centerNames, setCenterNames] = useState<string[]>([]);
  const [centerDetails, setCenterDetails] = useState<null | {
    address: string;
    contact_number: string;
    email: string;
  }>(null);

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
    axios.get('/api/materials').then((res) => {
      setMaterials(res.data);
    });
  }, []);

  useEffect(() => {
    if (region) {
      axios.get('/api/cities', { params: { region } }).then((res) => {
        setCities(res.data);
        setCity('');
        setCenterNames([]);
        setCenterName('');
        setCenterDetails(null);
      });
    }
  }, [region]);

  useEffect(() => {
    if ((region && city && type) || (material && region && city)) {
      axios
        .get('/api/center-names', {
          params: { region, city, type, material },
        })
        .then((res) => {
          setCenterNames(res.data);
          setCenterName('');
          setCenterDetails(null);
        });
    }
  }, [region, city, type, material]);

  useEffect(() => {
    if (centerName) {
      axios
        .get('/api/center-details', {
          params: { name: centerName },
        })
        .then((res) => {
          setCenterDetails(res.data);
        });
    }
  }, [centerName]);

  useEffect(() => {
    if (material && region && city) {
      axios
        .get('/api/available-types', {
          params: { material, region, city },
        })
        .then((res) => {
          const types = res.data;
          if (types.length === 1) {
            setType(types[0]); // auto-select if one available
          } else {
            setType(''); // clear selection if multiple
          }
        });
    } else if (!material) {
      setType(''); // allow manual type selection when no material
    }
  }, [material, region, city]);

  return (
    <Layout>
      <Head title="Search" />
      <div className="card shadow-sm p-4" style={{ backgroundColor: '#ffffff' }}>
        <h2 className="text-center text-success mb-4">
          🌱 Waste Collection and Recycling Locator
        </h2>

        <div className="row gy-3">
          <div className="col-md-6">
            <label className="form-label">Search by Material (optional)</label>
            <select
              className="form-select"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="">-- Select Material --</option>
              {materials.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Center Type</label>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={!!material && type !== ''}
            >
              <option value="">-- Select Center Type --</option>
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
            <label className="form-label">City/Municipality</label>
            <select
              className="form-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!region}
            >
              <option value="">-- Select City/Municipality --</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-12">
            <label className="form-label">Center Name</label>
            <select
              className="form-select"
              value={centerName}
              onChange={(e) => setCenterName(e.target.value)}
              disabled={!region || !city}
            >
              <option value="">-- Select Center --</option>
              {centerNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {centerDetails && (
          <div className="mt-4 border-top pt-3">
            <h5 className="text-success">📍 Center Details</h5>
            <p><strong>Address:</strong> {centerDetails.address}</p>
            <p><strong>Contact:</strong> {centerDetails.contact_number}</p>
            <p><strong>Email:</strong> {centerDetails.email}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;

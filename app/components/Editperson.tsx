import React, { useState, useEffect } from 'react';
import './EditPerson.css';

type Person = {
  id?: string | number;
  name?: string;
  email?: string;
  phone?: string;
  department?: string;
  position?: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
};

type EditPersonProps = {
  person?: Person | null;
  onSave: (p: Person) => void;
  onCancel: () => void;
  isOpen: boolean;
};

const EditPerson: React.FC<EditPersonProps> = ({ person, onSave, onCancel, isOpen }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: ''
  });

  useEffect(() => {
    if (person) {
      setFormData({
        name: person.name ?? '',
        email: person.email ?? '',
        phone: person.phone ?? '',
        department: person.department ?? '',
        position: person.position ?? ''
      });
    }
  }, [person]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ ...(person || {}), ...formData });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Person</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>
          
          <div className="modal-actions">
            <button type="submit" className="btn-save">Save Changes</button>
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPerson;
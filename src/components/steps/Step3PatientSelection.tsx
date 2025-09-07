import React, { useState } from 'react';
import { Search, Plus, User, Phone, Mail, Calendar, X } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  avatar?: string;
}

interface Step3Props {
  selectedPatient: Patient | null;
  onPatientSelect: (patient: Patient) => void;
}

const Step3PatientSelection: React.FC<Step3Props> = ({ selectedPatient, onPatientSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    cedula: ''
  });

  const existingPatients: Patient[] = [
    {
      id: '1',
      name: 'María González López',
      phone: '+57 300 123 4567',
      email: 'maria.gonzalez@email.com',
      age: 34
    },
    {
      id: '2',
      name: 'Carlos Andrés Ruiz',
      phone: '+57 301 234 5678',
      email: 'carlos.ruiz@email.com',
      age: 28
    },
    {
      id: '3',
      name: 'Ana Sofía Martínez',
      phone: '+57 302 345 6789',
      email: 'ana.martinez@email.com',
      age: 41
    }
  ];

  const filteredPatients = existingPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewPatientSubmit = () => {
    const patient: Patient = {
      id: Date.now().toString(),
      name: newPatient.name,
      phone: newPatient.phone,
      email: newPatient.email,
      age: parseInt(newPatient.age)
    };
    onPatientSelect(patient);
    setShowNewPatientForm(false);
    setNewPatient({ name: '', phone: '', email: '', age: '', cedula: '' });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Seleccionar Paciente</h2>
        <p className="text-lg text-gray-600">Busca un paciente existente o registra uno nuevo</p>
      </div>

      {/* Buscador */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg"
          />
        </div>
      </div>

      {/* Botón Nuevo Paciente */}
      <div className="text-center mb-8">
        <button
          onClick={() => setShowNewPatientForm(true)}
          className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-6 h-6" />
          <span>Nuevo Paciente</span>
        </button>
      </div>

      {/* Lista de pacientes existentes */}
      {filteredPatients.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Pacientes Existentes</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => onPatientSelect(patient)}
                className={`
                  cursor-pointer bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-lg hover:scale-105
                  ${selectedPatient?.id === patient.id 
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-blue-300'
                  }
                `}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl
                    ${selectedPatient?.id === patient.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gradient-to-r from-gray-500 to-gray-600'
                    }
                  `}>
                    {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{patient.name}</h4>
                    <p className="text-sm text-gray-500">{patient.age} años</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{patient.email}</span>
                  </div>
                </div>
                
                {selectedPatient?.id === patient.id && (
                  <div className="mt-4 text-center">
                    <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium">
                      ✓ Seleccionado
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Nuevo Paciente */}
      {showNewPatientForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Nuevo Paciente</h3>
              <button
                onClick={() => setShowNewPatientForm(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleNewPatientSubmit(); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cédula</label>
                <input
                  type="text"
                  value={newPatient.cedula}
                  onChange={(e) => setNewPatient({...newPatient, cedula: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
                <input
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewPatientForm(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-semibold"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step3PatientSelection;
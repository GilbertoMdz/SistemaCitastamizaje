import React from 'react';
import { CheckCircle, User, Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
}

interface Step5Props {
  selectedType: string;
  selectedArea: string;
  selectedPatient: Patient | null;
  selectedDate: string;
  selectedTime: string;
  onConfirm: () => void;
}

const Step5Confirmation: React.FC<Step5Props> = ({
  selectedType,
  selectedArea,
  selectedPatient,
  selectedDate,
  selectedTime,
  onConfirm
}) => {
  const getTestName = () => {
    const tests: { [key: string]: string } = {
      'vision': 'Examen de Visión',
      'hearing': 'Audiometría',
      'cardio': 'Electrocardiograma',
      'neuro': 'Evaluación Neurológica',
      'basic': 'Paquete Básico',
      'complete': 'Paquete Completo',
      'executive': 'Paquete Ejecutivo'
    };
    return tests[selectedArea] || selectedArea;
  };

  const getTestDuration = () => {
    const durations: { [key: string]: string } = {
      'vision': '15 minutos',
      'hearing': '20 minutos',
      'cardio': '10 minutos',
      'neuro': '30 minutos',
      'basic': '45 minutos',
      'complete': '90 minutos',
      'executive': '2 horas'
    };
    return durations[selectedArea] || 'Tiempo estimado';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Confirmar Cita</h2>
        <p className="text-lg text-gray-600">Revisa los detalles de tu cita antes de confirmarla</p>
      </div>

      <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* Información del Paciente */}
        <div className="bg-white rounded-3xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 ml-3">Paciente</h3>
          </div>
          
          {selectedPatient && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {selectedPatient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{selectedPatient.name}</p>
                  <p className="text-sm text-gray-500">{selectedPatient.age} años</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span>{selectedPatient.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span className="truncate">{selectedPatient.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Información de la Prueba */}
        <div className="bg-white rounded-3xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 ml-3">
              {selectedType === 'individual' ? 'Prueba' : 'Paquete'}
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4">
              <h4 className="font-semibold text-emerald-800 mb-2">{getTestName()}</h4>
              <div className="flex items-center space-x-2 text-sm text-emerald-600">
                <Clock className="w-4 h-4" />
                <span>Duración: {getTestDuration()}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tipo de cita:</span>
                <span className="font-medium text-gray-800 capitalize">{selectedType === 'individual' ? 'Individual' : 'Paquete'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información de Fecha y Hora */}
        <div className="bg-white rounded-3xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 ml-3">Fecha y Hora</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-semibold text-purple-800 capitalize">{formatDate(selectedDate)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-semibold text-purple-800">{selectedTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de Confirmación */}
      <div className="text-center pt-8">
        <button
          onClick={onConfirm}
          className="inline-flex items-center space-x-4 px-12 py-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
        >
          <CheckCircle className="w-8 h-8" />
          <span>Confirmar Cita</span>
        </button>
        
        <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
          Al confirmar, se enviará un correo de confirmación con todos los detalles de tu cita
        </p>
      </div>
    </div>
  );
};

export default Step5Confirmation;
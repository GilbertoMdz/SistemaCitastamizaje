import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import Step1TypeSelection from './components/steps/Step1TypeSelection';
import Step2AreaSelection from './components/steps/Step2AreaSelection';
import Step3PatientSelection from './components/steps/Step3PatientSelection';
import Step4Availability from './components/steps/Step4Availability';
import Step5Confirmation from './components/steps/Step5Confirmation';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
}

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const stepTitles = ['Tipo', 'Área/Paquete', 'Paciente', 'Disponibilidad', 'Confirmar'];
  const totalSteps = stepTitles.length;

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedType !== '';
      case 1: return selectedArea !== '';
      case 2: return selectedPatient !== null;
      case 3: return selectedDate !== '' && selectedTime !== '';
      case 4: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setSelectedType('');
    setSelectedArea('');
    setSelectedPatient(null);
    setSelectedDate('');
    setSelectedTime('');
    setIsConfirmed(false);
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center transform animate-bounce">
          <div className="inline-flex p-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-8">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            ¡Cita Confirmada!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Tu cita ha sido programada exitosamente. Recibirás un correo de confirmación en breve.
          </p>
          
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-emerald-800 mb-3">Detalles de tu cita:</h3>
            <div className="space-y-2 text-sm text-emerald-700">
              <p><strong>Paciente:</strong> {selectedPatient?.name}</p>
              <p><strong>Tipo:</strong> {selectedType === 'individual' ? 'Prueba Individual' : 'Paquete de Pruebas'}</p>
              <p><strong>Fecha:</strong> {selectedDate}</p>
              <p><strong>Hora:</strong> {selectedTime}</p>
            </div>
          </div>
          
          <button
            onClick={resetWizard}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Crear Nueva Cita
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <Sidebar />
      <Header />
      
      <div className="ml-64 pt-20 p-8">
        <ProgressBar 
          currentStep={currentStep + 1} 
          totalSteps={totalSteps} 
          stepTitles={stepTitles} 
        />
        
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8 min-h-[600px] transition-all duration-500">
          {currentStep === 0 && (
            <Step1TypeSelection
              selectedType={selectedType}
              onTypeSelect={setSelectedType}
            />
          )}
          
          {currentStep === 1 && (
            <Step2AreaSelection
              selectedType={selectedType}
              selectedArea={selectedArea}
              onAreaSelect={setSelectedArea}
            />
          )}
          
          {currentStep === 2 && (
            <Step3PatientSelection
              selectedPatient={selectedPatient}
              onPatientSelect={setSelectedPatient}
            />
          )}
          
          {currentStep === 3 && (
            <Step4Availability
              selectedType={selectedType}
              selectedArea={selectedArea}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateSelect={setSelectedDate}
              onTimeSelect={setSelectedTime}
            />
          )}
          
          {currentStep === 4 && (
            <Step5Confirmation
              selectedType={selectedType}
              selectedArea={selectedArea}
              selectedPatient={selectedPatient}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onConfirm={handleConfirm}
            />
          )}
        </div>
        
        {/* Botones de navegación */}
        <div className="flex justify-between items-center mt-6 max-w-4xl mx-auto">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300
              ${currentStep === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105'
              }
            `}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Anterior</span>
          </button>
          
          {currentStep < totalSteps - 1 && (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                ${canProceed()
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <span>Siguiente</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, MapPin, ArrowRight } from 'lucide-react';

interface Step4Props {
  selectedType: string;
  selectedArea: string;
  selectedDate: string;
  selectedTime: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

const Step4Availability: React.FC<Step4Props> = ({
  selectedType,
  selectedArea,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const occupiedSlots = ['09:00', '10:30', '15:00', '16:30'];

  const packageSteps = {
    basic: [
      { id: 1, name: 'Visión', duration: '15 min', color: 'from-blue-500 to-cyan-500' },
      { id: 2, name: 'Audición', duration: '20 min', color: 'from-purple-500 to-pink-500' },
      { id: 3, name: 'Presión arterial', duration: '10 min', color: 'from-red-500 to-rose-500' }
    ],
    complete: [
      { id: 1, name: 'Visión', duration: '15 min', color: 'from-blue-500 to-cyan-500' },
      { id: 2, name: 'Audición', duration: '20 min', color: 'from-purple-500 to-pink-500' },
      { id: 3, name: 'ECG', duration: '10 min', color: 'from-red-500 to-rose-500' },
      { id: 4, name: 'Laboratorio', duration: '30 min', color: 'from-green-500 to-emerald-500' },
      { id: 5, name: 'Rayos X', duration: '15 min', color: 'from-yellow-500 to-orange-500' }
    ],
    executive: [
      { id: 1, name: 'Examen completo', duration: '45 min', color: 'from-blue-500 to-cyan-500' },
      { id: 2, name: 'Ecocardiograma', duration: '30 min', color: 'from-purple-500 to-pink-500' },
      { id: 3, name: 'Prueba de esfuerzo', duration: '20 min', color: 'from-red-500 to-rose-500' },
      { id: 4, name: 'Laboratorio especializado', duration: '15 min', color: 'from-green-500 to-emerald-500' }
    ]
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días vacíos del mes anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    return date < today;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Seleccionar Fecha y Hora</h2>
        <p className="text-lg text-gray-600">Elige el día y horario que mejor se adapte a tu agenda</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Calendario */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              Seleccionar Fecha
            </h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-lg font-semibold text-gray-700 min-w-[120px] text-center">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (!day) return <div key={index} className="p-3"></div>;
              
              const dateStr = formatDate(day);
              const isSelected = selectedDate === dateStr;
              const isDisabled = isPastDate(day);
              const todayClass = isToday(day);
              
              return (
                <button
                  key={index}
                  onClick={() => !isDisabled && onDateSelect(dateStr)}
                  disabled={isDisabled}
                  className={`
                    p-3 text-center rounded-xl transition-all duration-300 font-medium
                    ${isSelected 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110' 
                      : isDisabled
                      ? 'text-gray-300 cursor-not-allowed'
                      : todayClass
                      ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 hover:from-emerald-200 hover:to-teal-200'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105'
                    }
                  `}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horarios disponibles */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            Horarios Disponibles
          </h3>
          
          {selectedDate ? (
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map(time => {
                const isOccupied = occupiedSlots.includes(time);
                const isSelected = selectedTime === time;
                
                return (
                  <button
                    key={time}
                    onClick={() => !isOccupied && onTimeSelect(time)}
                    disabled={isOccupied}
                    className={`
                      p-3 text-center rounded-xl transition-all duration-300 font-medium
                      ${isSelected
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105'
                        : isOccupied
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105 hover:shadow-md'
                      }
                    `}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Selecciona una fecha para ver los horarios disponibles</p>
            </div>
          )}
        </div>
      </div>

      {/* Mapa de ruta para paquetes */}
      {selectedType === 'package' && selectedArea && packageSteps[selectedArea as keyof typeof packageSteps] && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-500" />
              Ruta de tu Paquete de Pruebas
            </h3>
            
            <div className="flex items-center justify-between overflow-x-auto pb-4">
              {packageSteps[selectedArea as keyof typeof packageSteps].map((step, index) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg
                      hover:scale-110 transition-all duration-300
                    `}>
                      {step.id}
                    </div>
                    <div className="mt-3 text-center max-w-[100px]">
                      <p className="text-sm font-semibold text-gray-800">{step.name}</p>
                      <p className="text-xs text-gray-500">{step.duration}</p>
                    </div>
                  </div>
                  
                  {index < packageSteps[selectedArea as keyof typeof packageSteps].length - 1 && (
                    <div className="mx-4 flex items-center">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4Availability;
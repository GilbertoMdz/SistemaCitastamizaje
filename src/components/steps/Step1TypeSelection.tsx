import React from 'react';
import { User, Package } from 'lucide-react';

interface Step1Props {
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

const Step1TypeSelection: React.FC<Step1Props> = ({ selectedType, onTypeSelect }) => {
  const types = [
    {
      id: 'individual',
      title: 'Prueba Individual',
      description: 'Selecciona una prueba específica de tamizaje',
      icon: User,
      gradient: 'from-blue-500 to-cyan-500',
      hoverGradient: 'from-blue-600 to-cyan-600',
      features: ['Tiempo optimizado', 'Costo específico', 'Resultados rápidos']
    },
    {
      id: 'package',
      title: 'Paquete de Pruebas',
      description: 'Combina múltiples pruebas con descuento especial',
      icon: Package,
      gradient: 'from-emerald-500 to-teal-500',
      hoverGradient: 'from-emerald-600 to-teal-600',
      features: ['Ahorro hasta 30%', 'Evaluación completa', 'Seguimiento integrado']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Qué tipo de cita necesitas?</h2>
        <p className="text-lg text-gray-600">Elige la opción que mejor se adapte a tus necesidades</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {types.map((type) => (
          <div
            key={type.id}
            onClick={() => onTypeSelect(type.id)}
            className={`
              relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2
              ${selectedType === type.id ? 'scale-105 -translate-y-2' : ''}
            `}
          >
            <div className={`
              bg-gradient-to-br ${type.gradient} p-1 rounded-3xl shadow-xl transition-all duration-300
              ${selectedType === type.id ? 'shadow-2xl ring-4 ring-white ring-opacity-50' : ''}
              hover:shadow-2xl group
            `}>
              <div className="bg-white rounded-3xl p-8 h-full">
                <div className="text-center">
                  <div className={`
                    inline-flex p-4 rounded-2xl bg-gradient-to-r ${type.gradient} mb-6
                    group-hover:shadow-lg transition-all duration-300
                    ${selectedType === type.id ? 'animate-pulse' : ''}
                  `}>
                    <type.icon className="w-12 h-12 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{type.title}</h3>
                  <p className="text-gray-600 mb-6">{type.description}</p>
                  
                  <div className="space-y-3">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center space-x-2">
                        <div className={`w-2 h-2 bg-gradient-to-r ${type.gradient} rounded-full`}></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {selectedType === type.id && (
                    <div className="mt-6 flex justify-center">
                      <div className={`
                        px-4 py-2 bg-gradient-to-r ${type.gradient} text-white rounded-full text-sm font-medium
                        animate-bounce
                      `}>
                        ✓ Seleccionado
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step1TypeSelection;
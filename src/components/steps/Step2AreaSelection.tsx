import React from 'react';
import { Eye, Ear, Heart, Brain, Settings as Lungs, TestTube, Clock, FileText } from 'lucide-react';

interface Step2Props {
    selectedType: string;
    selectedArea: string;
    onAreaSelect: (area: string) => void;
}

const Step2AreaSelection: React.FC<Step2Props> = ({ selectedType, selectedArea, onAreaSelect }) => {
    const individualAreas = [
        {
            id: 'vision',
            title: 'Examen de Visión',
            duration: '15 min',
            requirements: 'Sin lentes de contacto',
            icon: Eye,
            color: 'from-blue-500 to-indigo-500'
        },
        {
            id: 'hearing',
            title: 'Audiometría',
            duration: '20 min',
            requirements: 'Oídos limpios',
            icon: Ear,
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 'cardio',
            title: 'Electrocardiograma',
            duration: '10 min',
            requirements: 'Ropa cómoda',
            icon: Heart,
            color: 'from-red-500 to-rose-500'
        },
        {
            id: 'neuro',
            title: 'Evaluación Neurológica',
            duration: '30 min',
            requirements: 'Descanso previo',
            icon: Brain,
            color: 'from-green-500 to-emerald-500'
        }
    ];

    const packages = [
        {
            id: 'basic',
            title: 'Paquete Básico',
            duration: '45 min',
            requirements: 'Ayuno 8 horas',
            tests: ['Visión', 'Audición', 'Presión arterial'],
            icon: TestTube,
            color: 'from-cyan-500 to-blue-500'
        },
        {
            id: 'complete',
            title: 'Paquete Completo',
            duration: '90 min',
            requirements: 'Ayuno 12 horas',
            tests: ['Visión', 'Audición', 'ECG', 'Laboratorio', 'Rayos X'],
            icon: Lungs,
            color: 'from-emerald-500 to-teal-500'
        },
        {
            id: 'executive',
            title: 'Paquete Ejecutivo',
            duration: '2 horas',
            requirements: 'Ayuno 12 horas',
            tests: ['Examen completo', 'Ecocardiograma', 'Prueba de esfuerzo', 'Laboratorio especializado'],
            icon: FileText,
            color: 'from-purple-500 to-indigo-500'
        }
    ];

    const items = selectedType === 'individual' ? individualAreas : packages;

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {selectedType === 'individual' ? 'Selecciona el área de evaluación' : 'Elige tu paquete'}
                </h2>
                <p className="text-lg text-gray-600">
                    {selectedType === 'individual'
                        ? 'Escoge la prueba específica que necesitas'
                        : 'Selecciona el paquete que mejor se adapte a tus necesidades'
                    }
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onAreaSelect(item.id)}
                        className={`
              relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl
              ${selectedArea === item.id ? 'scale-105 shadow-xl' : ''}
            `}
                    >
                        <div className={`
              bg-gradient-to-br ${item.color} p-1 rounded-2xl transition-all duration-300
              ${selectedArea === item.id ? 'ring-4 ring-white ring-opacity-50' : ''}
            `}>
                            <div className="bg-white rounded-2xl p-6 h-full">
                                <div className="flex flex-col h-full">
                                    <div className={`
                    inline-flex p-3 rounded-xl bg-gradient-to-r ${item.color} mb-4 self-start
                    transition-all duration-300
                    ${selectedArea === item.id ? 'animate-pulse' : ''}
                  `}>
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>

                                    <div className="flex items-center space-x-4 mb-4 text-sm">
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-600">{item.duration}</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 mb-2">
                                            <strong>Requisitos:</strong> {item.requirements}
                                        </p>
                                    </div>
                                    {selectedType === 'package' && Array.isArray((item as any).tests) && (
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Incluye:</p>
                                            <div className="space-y-1">
                                                {(item as any).tests?.map((test: string, index: number) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${item.color} rounded-full`}></div>
                                                        <span className="text-sm text-gray-600">{test}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedArea === item.id && (
                                        <div className="mt-4">
                                            <div className={`
                        px-3 py-1 bg-gradient-to-r ${item.color} text-white rounded-full text-sm font-medium
                        text-center animate-pulse
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

export default Step2AreaSelection;
import React from 'react';
import { Calendar, Users, Stethoscope, ClipboardList, Settings, Home } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: false },
    { icon: Calendar, label: 'Citas', active: true },
    { icon: Users, label: 'Pacientes', active: false },
    { icon: Stethoscope, label: 'Pruebas', active: false },
    { icon: ClipboardList, label: 'Reportes', active: false },
    { icon: Settings, label: 'Configuración', active: false },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white h-screen fixed left-0 top-0 shadow-2xl">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MedScreen
            </h2>
            <p className="text-sm text-slate-400">Clínica de Tamizaje</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            className={`
              flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 cursor-pointer
              ${item.active 
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 shadow-lg' 
                : 'hover:bg-slate-700/50 hover:shadow-md hover:translate-x-1'
              }
            `}
          >
            <div className={`
              p-2 rounded-lg transition-all duration-300
              ${item.active 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg' 
                : 'bg-slate-700 group-hover:bg-slate-600'
              }
            `}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className={`font-medium ${item.active ? 'text-white' : 'text-slate-300'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </nav>
      
      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-white">Dr. María González</p>
              <p className="text-xs text-slate-400">Administradora</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
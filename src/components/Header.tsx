import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm fixed top-0 right-0 left-64 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Nueva Cita Médica
          </h1>
          <p className="text-sm text-gray-500">Programa una nueva cita de tamizaje</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 hover:shadow-md">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl transition-all duration-200 hover:shadow-lg">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
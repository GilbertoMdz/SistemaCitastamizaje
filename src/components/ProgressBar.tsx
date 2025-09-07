import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, stepTitles }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        {stepTitles.map((title, index) => (
          <div 
            key={index}
            className={`flex items-center ${index < stepTitles.length - 1 ? 'flex-1' : ''}`}
          >
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
              ${index < currentStep 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' 
                : index === currentStep 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg animate-pulse' 
                : 'bg-gray-200 text-gray-500'
              }
            `}>
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span className={`ml-2 text-sm font-medium hidden md:block ${
              index <= currentStep ? 'text-gray-800' : 'text-gray-400'
            }`}>
              {title}
            </span>
            {index < stepTitles.length - 1 && (
              <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    index < currentStep 
                      ? 'w-full bg-gradient-to-r from-emerald-500 to-teal-500' 
                      : 'w-0 bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
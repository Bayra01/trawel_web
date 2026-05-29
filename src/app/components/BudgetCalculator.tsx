import { useState, useEffect } from 'react';
import { Car, Fuel, Home, Utensils, Calculator, TrendingUp } from 'lucide-react';

const MNT_TO_USD = 0.00029; // Approximate exchange rate

interface BudgetItem {
  id: string;
  label: string;
  icon: any;
  min: number;
  max: number;
  defaultValue: number;
  unit: string;
  color: string;
}

const budgetItems: BudgetItem[] = [
  {
    id: 'jeep',
    label: 'Jeep Rental',
    icon: Car,
    min: 0,
    max: 2000000,
    defaultValue: 900000,
    unit: '₮/week',
    color: '#4A90A4',
  },
  {
    id: 'fuel',
    label: 'Fuel',
    icon: Fuel,
    min: 0,
    max: 1000000,
    defaultValue: 400000,
    unit: '₮',
    color: '#D4A373',
  },
  {
    id: 'ger',
    label: 'Ger Camp Stays',
    icon: Home,
    min: 0,
    max: 1500000,
    defaultValue: 600000,
    unit: '₮/6 nights',
    color: '#6B9E78',
  },
  {
    id: 'food',
    label: 'Food',
    icon: Utensils,
    min: 0,
    max: 800000,
    defaultValue: 300000,
    unit: '₮/week',
    color: '#B87D4B',
  },
];

export function BudgetCalculator() {
  const [values, setValues] = useState<Record<string, number>>(
    budgetItems.reduce((acc, item) => ({ ...acc, [item.id]: item.defaultValue }), {})
  );

  const totalMNT = Object.values(values).reduce((sum, val) => sum + val, 0);
  const totalUSD = totalMNT * MNT_TO_USD;

  const handleChange = (id: string, value: number) => {
    setValues(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#F5F8F3] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#4A90A4]/10 rounded-full px-4 py-2 mb-4">
            <Calculator className="w-5 h-5 text-[#4A90A4]" />
            <span className="text-[#4A90A4]">Trip Budget Calculator</span>
          </div>
          <h2 className="text-5xl mb-4">Plan Your Mongolia Budget</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estimate the cost of your Mongolian adventure with real-time calculations in both MNT and USD
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left & Middle: Sliders */}
          <div className="lg:col-span-2 space-y-6">
            {budgetItems.map((item) => {
              const Icon = item.icon;
              const percentage = ((values[item.id] - item.min) / (item.max - item.min)) * 100;

              return (
                <div key={item.id} className="bg-white rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: item.color }} />
                      </div>
                      <div>
                        <h4 className="text-lg">{item.label}</h4>
                        <p className="text-sm text-gray-500">{item.unit}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl" style={{ color: item.color }}>
                        ₮{values[item.id].toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${(values[item.id] * MNT_TO_USD).toFixed(0)}
                      </div>
                    </div>
                  </div>

                  {/* Slider */}
                  <div className="relative">
                    <input
                      type="range"
                      min={item.min}
                      max={item.max}
                      step={10000}
                      value={values[item.id]}
                      onChange={(e) => handleChange(item.id, parseInt(e.target.value))}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${item.color} 0%, ${item.color} ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`,
                      }}
                    />
                  </div>

                  {/* Min/Max Labels */}
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>₮{item.min.toLocaleString()}</span>
                    <span>₮{item.max.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Total Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Total Card */}
              <div className="bg-gradient-to-br from-[#4A90A4] to-[#3D7A8C] text-white rounded-3xl p-8 shadow-xl mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl">Total Estimate</h3>
                  <TrendingUp className="w-8 h-8 opacity-80" />
                </div>

                <div className="mb-6">
                  <div className="text-sm text-white/70 mb-1">Mongolian Tugrik</div>
                  <div className="text-4xl mb-4">₮{totalMNT.toLocaleString()}</div>
                  
                  <div className="text-sm text-white/70 mb-1">US Dollars</div>
                  <div className="text-3xl">${totalUSD.toFixed(2)}</div>
                </div>

                <div className="pt-6 border-t border-white/20">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/80">Duration:</span>
                    <span>6-7 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">Daily Average:</span>
                    <span>₮{Math.round(totalMNT / 6).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Breakdown Chart */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h4 className="text-lg mb-4">Cost Breakdown</h4>
                <div className="space-y-3">
                  {budgetItems.map((item) => {
                    const itemPercentage = (values[item.id] / totalMNT) * 100;
                    return (
                      <div key={item.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{item.label}</span>
                          <span className="text-gray-900">{itemPercentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${itemPercentage}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-[#FFF8F0] rounded-3xl p-6 mt-6 border border-[#D4A373]/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4A373]/20 flex items-center justify-center flex-shrink-0">
                    💡
                  </div>
                  <div>
                    <h5 className="text-sm mb-1">Budget Tip</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Traveling in shoulder season (May or September) can reduce costs by 20-30% while still enjoying great weather.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100">
            <div className="text-3xl mb-2">🚗</div>
            <h4 className="text-lg mb-2">4WD Required</h4>
            <p className="text-sm text-gray-600">Most destinations require sturdy off-road vehicles</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100">
            <div className="text-3xl mb-2">⛽</div>
            <h4 className="text-lg mb-2">Plan Fuel Stops</h4>
            <p className="text-sm text-gray-600">Gas stations are sparse in rural areas</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100">
            <div className="text-3xl mb-2">🏕️</div>
            <h4 className="text-lg mb-2">Book Ger Camps</h4>
            <p className="text-sm text-gray-600">Reserve ahead during peak summer season</p>
          </div>
        </div>
      </div>
    </section>
  );
}

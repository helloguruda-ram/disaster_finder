
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AnalysisResult, DisasterType } from '../types';
import StatusBadge from './StatusBadge';

interface AnalysisDashboardProps {
  result: AnalysisResult;
  imageUrl: string;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ result, imageUrl }) => {
  const chartData = [
    { name: 'Confidence', value: result.confidence * 100 },
    { name: 'Variance', value: (1 - result.confidence) * 100 }
  ];

  const COLORS = ['#3b82f6', '#1e293b'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      {/* Left: Visualization */}
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Source Satellite Feed</span>
            <span className="text-[10px] text-slate-500 font-mono">ID: SAT-842-X</span>
          </div>
          <div className="aspect-video relative group">
            <img src={imageUrl} alt="Analysis Target" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            
            {/* Scrutiny Reticle Overlay */}
            <div className="absolute inset-0 border-[20px] border-slate-900/20 pointer-events-none flex items-center justify-center">
              <div className="w-1/2 h-1/2 border border-blue-500/30 rounded-full flex items-center justify-center">
                 <div className="w-4 h-4 border border-blue-500 animate-ping rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Detection Logic
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            {result.reasoning}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Status</div>
              <StatusBadge type={result.category} />
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">AI Certainty</div>
              <div className="text-2xl font-bold text-white">{(result.confidence * 100).toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Insights */}
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
           <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Key Indicators
          </h3>
          <div className="space-y-3">
            {result.detectedFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-slate-800/30 p-3 rounded-lg border border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <span className="text-sm text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Incident Protocol
          </h3>
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
            <p className="text-sm text-red-300 font-medium italic">
              " {result.recommendedAction} "
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl h-64">
           <h3 className="text-lg font-bold mb-2 text-slate-300">Certainty Distribution</h3>
           <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;

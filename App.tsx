
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import AnalysisDashboard from './components/AnalysisDashboard';
import { AnalysisResult, DisasterType, ScanHistoryItem } from './types';
import { analyzeSatelliteImage } from './services/geminiService';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      setSelectedImage(base64);
      await startAnalysis(base64);
    };
    reader.readAsDataURL(file);
  };

  const startAnalysis = async (image: string) => {
    setIsAnalyzing(true);
    try {
      const analysisResult = await analyzeSatelliteImage(image);
      setResult(analysisResult);
      
      const newHistoryItem: ScanHistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        imageUrl: image,
        result: analysisResult
      };
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 10));
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Hero Section */}
        {!selectedImage && (
          <div className="text-center space-y-8 py-12">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
                Planetary Shield <br />
                <span className="text-blue-500">Early Warning AI</span>
              </h2>
              <p className="max-w-2xl mx-auto text-xl text-slate-400">
                Advanced satellite imagery analysis for real-time disaster monitoring. 
                Identify forest fires and tsunamis with state-of-the-art vision models.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm font-medium">Wildfire Monitoring</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm font-medium">Ocean Inundation</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium">Environmental Baseline</span>
              </div>
            </div>
          </div>
        )}

        {/* Upload Zone */}
        <div className={`mt-8 ${selectedImage ? 'mb-8' : ''}`}>
          <div className="max-w-3xl mx-auto">
            <label className="relative group flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-700 rounded-2xl hover:border-blue-500/50 hover:bg-slate-800/20 transition-all cursor-pointer overflow-hidden">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-12 h-12 text-slate-500 group-hover:text-blue-400 transition-colors mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mb-2 text-lg font-semibold text-slate-300">
                  {isAnalyzing ? "Processing Satellite Feed..." : "Deploy Satellite Imagery"}
                </p>
                <p className="text-xs text-slate-500">
                  Supports High-Res TIFF, JPG, PNG from Sentinel-2 or Landsat
                </p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isAnalyzing} />
              
              {isAnalyzing && (
                <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-blue-400 font-mono text-sm animate-pulse tracking-widest uppercase">Analyzing Pixels...</p>
                  </div>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mt-6">
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Results Dashboard */}
        {result && selectedImage && (
          <AnalysisDashboard result={result} imageUrl={selectedImage} />
        )}

        {/* History / Recent Scans */}
        {history.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mission Log
              </h3>
              <button 
                onClick={() => setHistory([])}
                className="text-xs text-slate-500 hover:text-slate-300 font-medium uppercase tracking-widest transition-colors"
              >
                Clear History
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-all cursor-pointer group"
                  onClick={() => {
                    setSelectedImage(item.imageUrl);
                    setResult(item.result);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="aspect-[4/3] relative">
                    <img src={item.imageUrl} alt="Scan History" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                       <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                         item.result.category === DisasterType.FIRE ? 'bg-red-500 text-white' :
                         item.result.category === DisasterType.TSUNAMI ? 'bg-blue-500 text-white' :
                         'bg-emerald-500 text-white'
                       }`}>
                         {item.result.category.replace('_', ' ')}
                       </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-[10px] text-slate-500 font-mono mb-1">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                    <div className="text-sm font-semibold text-slate-300 truncate">
                      Confidence: {(item.result.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-slate-900/50 border-t border-slate-800 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-slate-500 text-sm">
            Powered by Gemini Vision Intelligence. For decision support only. 
            Always consult local emergency agencies during active events.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-xs text-slate-600 hover:text-blue-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-600 hover:text-blue-500 transition-colors">API Access</a>
            <a href="#" className="text-xs text-slate-600 hover:text-blue-500 transition-colors">Earth Engine Docs</a>
          </div>
          <p className="text-slate-700 text-[10px] font-mono">
            &copy; {new Date().getFullYear()} OrbitalEye Systems v2.5.0-Preview
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

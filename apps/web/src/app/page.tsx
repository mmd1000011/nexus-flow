'use client';

import { useState, useEffect } from 'react';

interface NexusEvent {
  id: string;
  type: string;
  payload: Record<string, any>;
  timestamp: string;
}

export default function Home() {
  const [events, setEvents] = useState<NexusEvent[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newType, setNewType] = useState('TASK_CREATED');
  const [newPayload, setNewPayload] = useState('{\n  "title": "Deploy Nexus Flow",\n  "status": "Pending"\n}');
  const [sending, setSending] = useState(false);

  const fetchEvents = () => {
    fetch('http://localhost:8000/events')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    try {
      const payloadObject = JSON.parse(newPayload);
      
      await fetch('http://localhost:8000/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: newType, payload: payloadObject }),
      });

      setNewPayload('{\n  "title": "",\n  "status": ""\n}');
      fetchEvents(); 
    } catch (error) {
      alert('فرمت JSON معتبر نیست! لطفاً دقت کنید.');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-8 font-mono">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-8 border-b border-gray-800 pb-4">
          <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
            <span className="text-4xl">⚡</span> Nexus Flow - Event Stream
          </h1>
          <p className="text-gray-500 mt-2">Monitoring system events in real-time</p>
        </div>

        {/* --- فرم جدید شلیک رویداد --- */}
        <div className="mb-8 bg-gray-900 p-6 rounded-lg border border-cyan-900/50 shadow-lg shadow-cyan-500/10">
          <h2 className="text-lg font-bold text-cyan-300 mb-4">Dispatch New Event</h2>
          <form onSubmit={handlePublish} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div>
              <label className="block text-xs text-gray-400 mb-1">Event Type</label>
              <input 
                type="text" 
                value={newType} 
                onChange={(e) => setNewType(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-xs text-gray-400 mb-1">Payload (JSON)</label>
              <textarea 
                value={newPayload} 
                onChange={(e) => setNewPayload(e.target.value)}
                className="w-full h-[76px] bg-gray-950 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 resize-none"
                required
              />
            </div>

            <div className="flex items-end">
              <button 
                type="submit" 
                disabled={sending}
                className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                {sending ? 'Publishing...' : '🚀 Publish Event'}
              </button>
            </div>

          </form>
        </div>

        {/* --- جدول رویدادها --- */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 bg-gray-800/50 text-xs uppercase tracking-wider text-gray-400 font-semibold">
            <div>Event ID</div>
            <div>Type</div>
            <div>Payload</div>
            <div>Timestamp</div>
          </div>

          <div className="divide-y divide-gray-800 max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-500 animate-pulse">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No events found.</div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-800/30 transition-colors">
                  <div className="text-cyan-300 text-sm truncate" title={event.id}>
                    {event.id.substring(0, 8)}...
                  </div>
                  <div>
                    <span className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded text-xs font-bold">
                      {event.type}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">
                    <pre className="bg-gray-950 p-2 rounded text-xs overflow-x-auto">
                      {JSON.stringify(event.payload, null, 2)}
                    </pre>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(event.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
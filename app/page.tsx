'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!url) return;
    
    setLoading(true);
    try {
      // For now, save locally
      const newBookmark = {
        url: url,
        title: new URL(url).hostname,
        savedAt: new Date().toISOString()
      };
      
      // Save to localStorage for now
      const existing = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      existing.unshift(newBookmark);
      localStorage.setItem('bookmarks', JSON.stringify(existing));
      
      setSaved(existing.map((b: any) => b.url));
      setUrl('');
      
      // Optional: Call your API
      await fetch('/api/bookmarks/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
    setLoading(false);
  };

  // Load saved bookmarks on mount
  useState(() => {
    const existing = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setSaved(existing.map((b: any) => b.url));
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <header className="p-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">TagStream</h1>
          <p className="text-white/80 mt-2">Your intelligent bookmark manager</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto p-6">
        {/* Quick Save Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Quick Save
          </h2>
          <div className="flex gap-3">
            <inpu
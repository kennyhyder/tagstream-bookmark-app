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
      const newBookmark = {
        url: url,
        title: new URL(url).hostname,
        savedAt: new Date().toISOString()
      };
      
      const existing = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      existing.unshift(newBookmark);
      localStorage.setItem('bookmarks', JSON.stringify(existing));
      
      setSaved(existing.map((b: any) => b.url));
      setUrl('');
      
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <header className="p-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h1 className
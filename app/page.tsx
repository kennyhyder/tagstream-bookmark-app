// Next.js App - Deploy FREE on Vercel
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (FREE tier)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TagStream() {
  const [bookmarks, setBookmarks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // FREE Authentication with Supabase
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  // Quick Save - Works with ANY URL
  const quickSave = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/bookmarks/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          userId: user?.id
        })
      });
      
      const data = await response.json();
      if (data.success) {
        await loadBookmarks();
        showToast('Bookmark saved!');
      }
    } catch (error) {
      showToast('Error saving bookmark', 'error');
    }
    setLoading(false);
  };

  // Import from Instagram/Twitter archives
  const handleFileImport = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', user?.id || '');
    
    // Detect platform from filename
    const endpoint = file.name.includes('instagram') 
      ? '/api/import/instagram'
      : '/api/import/twitter-archive';
    
    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      if (data.success) {
        showToast(`Imported ${data.imported} bookmarks!`);
        await loadBookmarks();
      }
    } catch (error) {
      showToast('Import failed', 'error');
    }
    setLoading(false);
  };

  // Load bookmarks from Supabase
  const loadBookmarks = async () => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });
    
    if (data) setBookmarks(data);
  };

  // Search with Supabase full-text search (FREE)
  const searchBookmarks = async (query: string) => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .textSearch('title', query)
      .eq('user_id', user?.id);
    
    setBookmarks(data || []);
  };

  // Drag and drop for URLs
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const text = e.dataTransfer.getData('text');
    if (text.startsWith('http')) {
      quickSave(text);
    }
  };

  useEffect(() => {
    // Check auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) {
        loadBookmarks();
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    
      {/* Header */}
      
        
          ⚡ TagStream
          {user ? (
            
              {user.email}
               supabase.auth.signOut()}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
              >
                Sign Out
              
            
          ) : (
            
              Sign in with Google (FREE)
            
          )}
        
      

      {user && (
        <>
          {/* Quick Save Area */}
          
             { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
            >
              Quick Save
              
                 {
                    const url = e.clipboardData.getData('text');
                    if (url.startsWith('http')) {
                      quickSave(url);
                    }
                  }}
                />
                
                  Save
                
              
              
              {/* Import Section */}
              
                
                  📸 Import Instagram
                   e.target.files?.[0] && handleFileImport(e.target.files[0])}
                    className="hidden"
                  />
                
                
                  🐦 Import Twitter
                   e.target.files?.[0] && handleFileImport(e.target.files[0])}
                    className="hidden"
                  />
                
              
            
          

          {/* Search Bar */}
          
             searchBookmarks(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
            />
          

          {/* Bookmarks Grid */}
          
            {bookmarks.map((bookmark) => (
              
                {bookmark.title}
                {bookmark.description?.substring(0, 100)}...
                
                  {bookmark.tags?.map((tag: string) => (
                    
                      {tag}
                    
                  ))}
                
                
                  Open →
                
              
            ))}
          
        
      )}
    
  );
}
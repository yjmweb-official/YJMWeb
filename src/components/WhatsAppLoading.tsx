import React, { useEffect, useState } from 'react';
import { ArrowLeft, MessageSquare } from 'lucide-react';

interface WhatsAppLoadingProps {
  onBackToApp?: () => void;
}

export default function WhatsAppLoading({ onBackToApp }: WhatsAppLoadingProps) {
  const [countdown, setCountdown] = useState<number>(3);
  const [source, setSource] = useState<string>('contact_whatsapp');
  const [destinationUrl, setDestinationUrl] = useState<string>('https://wa.me/94776826937');

  useEffect(() => {
    // 1. Parse URL query parameters to retrieve button source and destination WhatsApp URL
    let currentSource = 'contact_whatsapp';
    let currentDest = 'https://wa.me/94776826937';

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const querySource = urlParams.get('source');
      const queryDest = urlParams.get('dest');

      if (querySource) {
        currentSource = querySource;
      }
      if (queryDest) {
        currentDest = queryDest;
      }

      setSource(currentSource);
      setDestinationUrl(currentDest);

      // 2. Fire GA4 'whatsapp_connection_started' event immediately on page load
      if (window.gtag) {
        window.gtag('event', 'whatsapp_connection_started', {
          source_button: currentSource,
          page_title: document.title,
          page_path: window.location.pathname,
          page_location: window.location.href,
          timestamp: new Date().toISOString()
        });
        console.log(`[GA4-Analytics] Fired whatsapp_connection_started: source=${currentSource}`);
      } else {
        console.warn('[GA4-Analytics] window.gtag not available on whatsapp_connection_started');
      }
    }

    // 3. Start countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    // 4. Handle auto-redirect after 2.5 - 3 seconds
    const redirectTimeout = setTimeout(() => {
      if (typeof window !== 'undefined') {
        // Fire GA4 'whatsapp_redirect_completed' event immediately before redirecting
        if (window.gtag) {
          window.gtag('event', 'whatsapp_redirect_completed', {
            source_button: currentSource,
            page_title: document.title,
            page_path: window.location.pathname,
            page_location: window.location.href,
            timestamp: new Date().toISOString()
          });
          console.log(`[GA4-Analytics] Fired whatsapp_redirect_completed: source=${currentSource}`);
        }

        // Output debug log
        console.log('WhatsApp click tracked');

        // Automatically launch WhatsApp with target destination URI
        window.location.href = currentDest;
      }
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimeout);
    };
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      if (onBackToApp) {
        onBackToApp();
      } else {
        window.history.back();
      }
    }
  };

  return (
    <div 
      className="min-h-screen bg-neutral-950 text-white flex flex-col justify-center items-center p-4 relative overflow-hidden"
      id="whatsapp-loading-page-layout font-sans"
    >
      {/* Background Animated Neon Ambient Glow Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-neon-blue/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-neon-purple/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      {/* Modern Back Button in Top-Left Corner */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 rounded-xl text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer select-none group"
          id="btn-back-to-previous"
        >
          <ArrowLeft className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:-translate-x-1 transition-transform" />
          <span>Back to Previous Page</span>
        </button>
      </div>

      {/* Main Glassmorphism Presentation Container */}
      <div 
        className="glass-panel p-8 sm:p-12 rounded-3xl border border-neon-blue/30 bg-neutral-950/80 max-w-md w-full text-center space-y-8 shadow-[0_0_60px_rgba(0,198,255,0.15)] relative overflow-hidden z-10 animate-fade-in"
        id="loading-panel-container"
      >
        {/* Futuring double-rotating neon spinner rings with pulsing icon */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-neon-blue/10" />
          <div className="absolute inset-0 rounded-full border-t-4 border-l-4 border-neon-blue animate-spin" style={{ animationDuration: '1s' }} />
          <div className="absolute w-18 h-18 rounded-full border-2 border-neon-purple/10" />
          <div className="absolute w-18 h-18 rounded-full border-b-2 border-r-2 border-neon-purple animate-spin" style={{ animationDuration: '2.5s', animationDirection: 'reverse' }} />
          
          <div className="absolute w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.2)] animate-pulse">
            <MessageSquare className="w-6 h-6 text-green-400 fill-green-400/10" />
          </div>
        </div>

        {/* Content stack */}
        <div className="space-y-3.5">
          <h1 className="text-xl sm:text-2xl font-display font-medium tracking-tight text-white uppercase bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-white to-neon-purple leading-tight">
            Connecting to WhatsApp Support
          </h1>
          
          <div className="flex justify-center items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[10px] font-semibold uppercase tracking-wider rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping mr-2" />
              Redirecting in {countdown}s
            </span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm mx-auto pt-3">
            Please wait while we connect you with our support team. You will be redirected automatically in a few seconds.
          </p>
        </div>

        {/* Fancy loading dots micro-animation */}
        <div className="flex justify-center items-center gap-1.5 pt-2">
          <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-bounce" />
        </div>

        {/* SLA and Security Label Details */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-neutral-500">
          <span className="uppercase">Origin: {source.replace('_', ' ')}</span>
          <span className="uppercase text-neutral-400 font-semibold">SECURE HANDSHAKE active</span>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';

export function VLibrasWidget() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Evita duplicar script se já estiver na página
    if (!document.getElementById('vlibras-script')) {
      const script = document.createElement('script');
      script.id = 'vlibras-script';
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.async = true;
      script.onload = () => {
        try {
          if (window.VLibras) {
            new window.VLibras.Widget('https://vlibras.gov.br/app');
          }
        } catch (e) {
          console.warn('VLibras init:', e);
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div vw="true" className="enabled">
      <div vw-access-button="true" className="active"></div>
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
}

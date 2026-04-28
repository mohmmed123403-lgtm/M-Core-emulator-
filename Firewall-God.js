export function obliterateHeaders(html, req, url) {
  html = html.replace(/X-Frame-Options/gi, 'X-MCore-Options');
  html = html.replace(/frame-ancestors/gi, 'mcore-ancestors');
  html = html.replace(/DENY/gi, 'ALLOWALL');
  html = html.replace(/SAMEORIGIN/gi, 'ALLOWALL');
  
  const currentHost = `https://${req.get('host')}/mcore/titan?q=`;
  const baseUrl = new URL(url).origin;
  
  html = html.replace(/href="\//g, `href="${currentHost}${baseUrl}/`);
  html = html.replace(/href="http/g, `href="${currentHost}http`);
  
  const godScript = `<script>Object.defineProperty(window,'top',{get:()=>window});window.open=u=>location.href='${currentHost}'+encodeURIComponent(u);</script>`;
  return html.replace('</head>', godScript + '</head>');
}
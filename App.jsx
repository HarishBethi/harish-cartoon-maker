
import React, { useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'https://harish-cartoon-maker-1.onrender.com';

export default function App(){
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [style, setStyle] = useState('cartoonify')
  const [loading, setLoading] = useState(false)
  const [resultUrl, setResultUrl] = useState(null)
  const [error, setError] = useState(null)

  function onFileChange(e){
    const f = e.target.files?.[0]
    if(!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResultUrl(null)
    setError(null)
  }

  async function fileToBase64(file){
    return await new Promise((res, rej)=>{
      const reader = new FileReader()
      reader.onload = ()=> res(reader.result)
      reader.onerror = rej
      reader.readAsDataURL(file)
    })
  }

  async function onConvert(e){
    e.preventDefault()
    if(!file){ setError('Please choose an image.'); return }
    setLoading(true); setError(null); setResultUrl(null)
    try{
      const image = await fileToBase64(file)
      const a = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/convert`, {
        method:'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ image, style })
      })
      if(!resp.ok){
        const txt = await resp.text()
        throw new Error(txt || 'Server error')
      }
      const body = await resp.json()
      if(body.output) setResultUrl(body.output)
      else throw new Error('No output from server')
    }catch(err){
      console.error(err)
      setError(err.message || 'Conversion failed')
    }finally{ setLoading(false) }
  }

  function onTryAgain(){
    setFile(null); setPreview(null); setResultUrl(null); setError(null); setLoading(false)
  }

  return (
    <div className="container">
      <h1>Harish Cartoon Maker</h1>
      <p className="muted">Upload a photo and convert it to <strong>Disney–Pixar style Cartoonify</strong> or a <strong>Detailed shaded sketch</strong> using AI.</p>

      <form onSubmit={onConvert}>
        <div style={{margin:'12px 0'}}>
          <input type="file" accept="image/*" onChange={onFileChange} />
        </div>

        {preview && <div style={{marginBottom:12}}>
          <div className="muted">Preview</div>
          <img src={preview} alt="preview" style={{maxWidth:'100%', maxHeight:320, borderRadius:8, marginTop:8}} />
        </div>}

        <div style={{display:'flex', gap:8, marginBottom:12}}>
          <button type="button" onClick={()=>setStyle('cartoonify')} style={{padding:'8px 12px', borderRadius:6, border: style==='cartoonify' ? 'none' : '1px solid #e5e7eb', background: style==='cartoonify' ? '#4f46e5' : '#fff', color: style==='cartoonify' ? '#fff' : '#111'}}>Cartoonify (Disney–Pixar)</button>
          <button type="button" onClick={()=>setStyle('sketch')} style={{padding:'8px 12px', borderRadius:6, border: style==='sketch' ? 'none' : '1px solid #e5e7eb', background: style==='sketch' ? '#4f46e5' : '#fff', color: style==='sketch' ? '#fff' : '#111'}}>Sketch (Detailed shaded)</button>
        </div>

        <div style={{display:'flex', gap:8}}>
          <button disabled={loading} style={{padding:'8px 16px', background:'#111827', color:'#fff', borderRadius:6}}>{loading ? 'Converting...' : 'Convert'}</button>
          <button type="button" onClick={onTryAgain} style={{padding:'8px 12px', borderRadius:6}}>Try again</button>
        </div>

        {error && <div style={{color:'#b91c1c', marginTop:12}}>Error: {error}</div>}
      </form>

      {resultUrl && <div style={{marginTop:16}}>
        <div className="muted">Result</div>
        <img src={resultUrl} alt="result" style={{maxWidth:'100%', maxHeight:520, borderRadius:8, marginTop:8}} />
        <div style={{marginTop:8}}>
          <a href={resultUrl} download style={{padding:'8px 12px', background:'#059669', color:'#fff', borderRadius:6, textDecoration:'none'}}>Download</a>
        </div>
      </div>}

      <div className="about">
        <strong>Created by Harish Bethi</strong><br/>
        Powered by AI · Cartoonify &amp; Sketch
      </div>
    </div>
  )
}

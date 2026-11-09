import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import WhatWeSource from './pages/WhatWeSource.jsx';
import CategoryDetail from './pages/CategoryDetail.jsx';
import ProofFiles from './pages/ProofFiles.jsx';
import CaseFile from './pages/CaseFile.jsx';
import OurStandard from './pages/OurStandard.jsx';
import Resources from './pages/Resources.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/what-we-source" element={<WhatWeSource />} />
        <Route path="/what-we-source/:slug" element={<CategoryDetail />} />
        <Route path="/proof-files" element={<ProofFiles />} />
        <Route path="/proof-files/:slug" element={<CaseFile />} />
        <Route path="/our-standard" element={<OurStandard />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/proof-file" element={<Navigate to="/proof-files" replace />} />
        <Route path="/case-files" element={<Navigate to="/proof-files" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

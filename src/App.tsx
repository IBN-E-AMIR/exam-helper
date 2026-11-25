import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ComingSoon from './pages/ComingSoon';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="subjects" element={<ComingSoon icon="subjects" title="subjects" desc="subjectsDesc" features={['subjectsF1', 'subjectsF2', 'subjectsF3']} />} />
          <Route path="notes" element={<ComingSoon icon="notes" title="notes" desc="notesDesc" features={['notesF1', 'notesF2', 'notesF3']} />} />
          <Route path="papers" element={<ComingSoon icon="papers" title="papers" desc="papersDesc" features={['papersF1', 'papersF2', 'papersF3']} />} />
          <Route path="viva" element={<ComingSoon icon="viva" title="viva" desc="vivaDesc" features={['vivaF1', 'vivaF2', 'vivaF3']} />} />
          <Route path="planner" element={<ComingSoon icon="planner" title="planner" desc="plannerDesc" features={['plannerF1', 'plannerF2', 'plannerF3']} />} />
          <Route path="progress" element={<ComingSoon icon="progress" title="progress" desc="progressDesc" features={['progressF1', 'progressF2', 'progressF3']} />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

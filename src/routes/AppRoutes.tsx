import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

// Home & 404 ship in the main bundle; other pages load on demand.
const Explore = lazy(() => import('../pages/Explore'));
const GameDetails = lazy(() => import('../pages/GameDetails'));
const Categories = lazy(() => import('../pages/Categories'));
const TopGames = lazy(() => import('../pages/TopGames'));
const News = lazy(() => import('../pages/News'));
const NewsDetails = lazy(() => import('../pages/News/NewsDetails'));
const Community = lazy(() => import('../pages/Community'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const PluginTest = lazy(() => import('../pages/PluginTest'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="games/:id" element={<GameDetails />} />
        <Route path="categories" element={<Categories />} />
        <Route path="top-games" element={<TopGames />} />
        <Route path="news" element={<News />} />
        <Route path="news/:id" element={<NewsDetails />} />
        <Route path="community" element={<Community />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="plugin-test" element={<PluginTest />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

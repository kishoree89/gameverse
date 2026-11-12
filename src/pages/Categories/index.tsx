import PageBanner from '../../components/common/PageBanner';
import SectionHeading from '../../components/common/SectionHeading';
import CategoryCard from '../../components/home/CategoryCard';
import { categories } from '../../data/categories';
import { IMG } from '../../utils/images';

export default function Categories() {
  return (
    <>
      <PageBanner
        eyebrow="Browse by genre"
        title={<>Game <span className="text-gradient">Categories</span></>}
        subtitle="From white-knuckle racers to slow-burn horror, pick a category and dive into games tailored to how you love to play."
        image={IMG.arcadeBlue}
      />
      <section className="container-gv">
        <SectionHeading eyebrow={`${categories.length} categories`} title="Choose Your Arena" subtitle="Select a category to see every game in it." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <CategoryCard key={c.id} category={c} index={i} large />
          ))}
        </div>
      </section>
    </>
  );
}

import { MapPin, BedDouble, Bath, Maximize, ArrowRight, Heart } from 'lucide-react';
import { featuredProperties } from '../../data/siteData';

const PropertyCard = ({ property }) => {
  const badgeColors = {
    Featured: 'bg-primary text-white',
    Premium: 'bg-gradient-to-r from-primary to-accent text-white',
    New: 'bg-green-500 text-white',
    Exclusive: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border-light hover:border-primary/20 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge */}
        <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md ${badgeColors[property.badge] || 'bg-primary text-white'}`}>
          {property.badge}
        </span>

        {/* Favorite Button */}
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
          <Heart className="w-4 h-4 text-accent" />
        </button>

        {/* Price */}
        <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl glass-dark">
          <span className="text-xl font-bold text-white">{property.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-text-muted mb-4">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-border-light mb-4" />

        {/* Property Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-text-secondary">
            <BedDouble className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5 text-text-secondary">
            <Bath className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1.5 text-text-secondary">
            <Maximize className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{property.area}</span>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-3 rounded-xl border-2 border-primary/20 text-primary font-semibold text-sm hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 group/btn">
          View Details
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

const FeaturedProperties = () => {
  return (
    <section id="featured" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            ✨ Handpicked For You
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Featured <span className="gradient-text">Properties</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Explore our curated selection of premium properties, each verified and ready for your dream lifestyle.
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-primary text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            View All Properties
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
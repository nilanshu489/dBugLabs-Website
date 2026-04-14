import { Calendar, MapPin, Users, ArrowRight, Trophy } from 'lucide-react';

const EventCard = ({ event }) => {
  const { title, description, date, location, attendees, winners, type, image } = event;

  const getEventTypeColor = (type) => {
    const colors = {
      'Hackathon': 'from-purple-600 to-pink-500',
      'Workshop': 'from-blue-500 to-cyan-500',
      'Competition': 'from-orange-500 to-red-500',
      'Bootcamp': 'from-green-500 to-emerald-500',
    };
    return colors[type] || 'from-purple-500 to-pink-500';
  };

  return (
    <div className="card group overflow-hidden">
      {/* Event Header */}
      <div className={`relative h-40 bg-gradient-to-br ${getEventTypeColor(type)} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        
        <div className="text-center z-10">
          <Trophy className="w-12 h-12 text-white/80 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-white/90 text-sm font-medium">{type}</span>
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
            {type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <Calendar className="w-4 h-4 text-purple-400" />
            {date}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <MapPin className="w-4 h-4 text-purple-400" />
            {location}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <Users className="w-4 h-4 text-purple-400" />
            {attendees} participants
          </div>
        </div>

        {/* Winners */}
        {winners && winners.length > 0 && (
          <div className="pt-4 border-t border-purple-500/10">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Winners</p>
            <div className="flex flex-wrap gap-2">
              {winners.map((winner, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-md text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                >
                  {winner}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* View Details Button */}
        <button className="w-full mt-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 text-purple-400 hover:text-pink-400 hover:bg-purple-500/10 transition-all">
          View Details
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EventCard;

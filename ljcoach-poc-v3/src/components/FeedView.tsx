
import MuxPlayer from '@mux/mux-player-react';
import { Trophy } from 'lucide-react';
import useStore from '../store';

const FeedView = () => {
  const { pitches } = useStore();

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Competition Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Weekly competition</h2>
        <div className="flex items-center text-gray-600 mb-4 space-x-2">
          <span>30 participants</span>
          <span>•</span>
          <span>3 days left</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-500 w-5 h-5" />
            <span className="text-lg">Top prize: $500</span>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Submit your pitch
          </button>
        </div>
      </div>

      {/* Pitch Cards */}
      {Object.values(pitches).map((pitch) => (
        <PitchCard key={pitch.id} pitch={pitch} />
      ))}
    </div>
  );
};

import { Pitch } from '../store/types';

const PitchCard = ({ pitch }: { pitch: Pitch }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-6">
        {/* Version and Score */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Version {pitch.history[0]?.version}</span>
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
              Winner
            </span>
          </div>
          <div className="text-sm font-medium">200 ⬆️</div>
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-semibold mb-2">{pitch.title}</h3>
        <p className="text-gray-600 mb-6">{pitch.description}</p>

        {/* Video Player */}
        <div className="rounded-lg overflow-hidden mb-6">
          <MuxPlayer
            playbackId={pitch.playbackId}
            metadata={{ video_title: pitch.title }}
            streamType="on-demand"
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <MetricBox label="Clarity" value={pitch.metrics.clarity} />
          <MetricBox label="Engagement" value={pitch.metrics.engagement} />
          <MetricBox label="Pacing" value={pitch.metrics.pacing} />
          <MetricBox label="Structure" value={pitch.metrics.structure} />
        </div>

        {/* Transcript */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Transcript</h4>
          <div className="space-y-2 text-gray-600">
            {pitch.transcript?.split('\n').map((line, i) => (
              <p key={i} className="py-1">{line}</p>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Comments</h4>
          <div className="space-y-3">
            <Comment
              author="Coach"
              text="Strong market positioning. Key suggestions: 1. Add more detail on implementation 2. Highlight cost savings earlier 3. Include pilot results"
              timestamp="Jan 15, 2:30 PM"
            />
            <Comment
              author="Abigale"
              text="I can help with the pilot results section. We have some great data from the office implementation."
              timestamp="Jan 15, 3:15 PM"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricBox = ({ label, value }: { label: string; value: number }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-indigo-600 mb-1">{value}%</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

const Comment = ({ author, text, timestamp }: { author: string; text: string; timestamp: string }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium">{author}</span>
      <span className="text-xs text-gray-500">{timestamp}</span>
    </div>
    <p className="text-sm text-gray-700">{text}</p>
  </div>
);

export default FeedView;
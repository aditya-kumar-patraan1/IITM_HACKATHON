import React, { useState, useEffect, use } from 'react';
import { 
  Sun, Heart, Coffee, Frown, Angry, AlertTriangle, 
  Zap, Meh, Smile, Moon, ThumbsUp, 
  ThumbsDown, Eye, HelpCircle, Cloud, Star, Users, Calendar, CloudRain, BookOpen, Save, RotateCcw,
  Sparkles, Edit3, ChevronLeft
} from "lucide-react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function MoodJournal() {
  const [selectedMood, setSelectedMood] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [savedEntries, setSavedEntries] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    console.log("Selected Mood : ", selectedMood);
    console.log("Current Journal : ", journalEntry);
  }, [journalEntry, selectedMood]);

  const moods = [
    {
      id: 'happy',
      name: 'Happy',
      icon: Sun,
      color: 'from-yellow-400 to-yellow-500',
      hoverColor: 'from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-600',
      bgLight: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      description: 'Joyful, content, optimistic',
      gradient: 'bg-gradient-to-r from-yellow-400 to-orange-400'
    },
    {
      id: 'surprised',
      name: 'Surprised',
      icon: Zap,
      color: 'from-purple-400 to-purple-500',
      hoverColor: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgLight: 'bg-gradient-to-br from-purple-50 to-purple-100',
      description: 'Shocked, amazed, astonished',
      gradient: 'bg-gradient-to-r from-purple-400 to-indigo-400'
    },
    {
      id: 'calm',
      name: 'Calm',
      icon: Moon,
      color: 'from-teal-400 to-teal-500',
      hoverColor: 'from-teal-500 to-teal-600',
      textColor: 'text-teal-600',
      bgLight: 'bg-gradient-to-br from-teal-50 to-teal-100',
      description: 'Relaxed, peaceful, at ease',
      gradient: 'bg-gradient-to-r from-teal-400 to-cyan-400'
    },
    {
      id: 'excited',
      name: 'Excited',
      icon: Sparkles,
      color: 'from-pink-400 to-pink-500',
      hoverColor: 'from-pink-500 to-pink-600',
      textColor: 'text-pink-600',
      bgLight: 'bg-gradient-to-br from-pink-50 to-pink-100',
      description: 'Energetic, thrilled, enthusiastic',
      gradient: 'bg-gradient-to-r from-pink-400 to-rose-400'
    },
    {
      id: 'confident',
      name: 'Confident',
      icon: ThumbsUp,
      color: 'from-emerald-400 to-emerald-500',
      hoverColor: 'from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-600',
      bgLight: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      description: 'Assured, bold, self-reliant',
      gradient: 'bg-gradient-to-r from-emerald-400 to-green-400'
    },
    {
      id: 'grateful',
      name: 'Grateful',
      icon: Heart,
      color: 'from-rose-400 to-rose-500',
      hoverColor: 'from-rose-500 to-rose-600',
      textColor: 'text-rose-600',
      bgLight: 'bg-gradient-to-br from-rose-50 to-rose-100',
      description: 'Thankful, appreciative, blessed',
      gradient: 'bg-gradient-to-r from-rose-400 to-pink-400'
    },
    {
      id: 'curious',
      name: 'Curious',
      icon: HelpCircle,
      color: 'from-indigo-400 to-indigo-500',
      hoverColor: 'from-indigo-500 to-indigo-600',
      textColor: 'text-indigo-600',
      bgLight: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      description: 'Inquisitive, questioning, exploring',
      gradient: 'bg-gradient-to-r from-indigo-400 to-blue-400'
    },
    {
      id: 'loved',
      name: 'Loved',
      icon: Heart,
      color: 'from-red-400 to-red-500',
      hoverColor: 'from-red-500 to-red-600',
      textColor: 'text-red-600',
      bgLight: 'bg-gradient-to-br from-red-50 to-red-100',
      description: 'Cherished, cared for, valued',
      gradient: 'bg-gradient-to-r from-red-400 to-rose-400'
    },
    {
      id: 'neutral',
      name: 'Neutral',
      icon: Star,
      color: 'from-gray-400 to-gray-500',
      hoverColor: 'from-gray-500 to-gray-600',
      textColor: 'text-gray-600',
      bgLight: 'bg-gradient-to-br from-gray-50 to-gray-100',
      description: 'Balanced, indifferent, stable',
      gradient: 'bg-gradient-to-r from-gray-400 to-slate-400'
    }
  ];

  const prompts = {
    happy: [
      "What made you smile today? Describe that moment in detail.",
      "What are three things that are going exceptionally well in your life right now?",
      "Write about a recent accomplishment that fills you with pride.",
      "Who in your life brings you the most joy? What do you love about them?",
      "What activities make you feel most alive and energized?",
      "Describe a perfect day from your recent memory.",
      "What are you looking forward to in the coming weeks?"
    ],
    grateful: [
      "List five small things you often take for granted but are thankful for today.",
      "Write a letter of gratitude to someone who has impacted your life positively.",
      "What challenges have you overcome that you're grateful for experiencing?",
      "Describe a moment when a stranger's kindness made your day better.",
      "What aspects of your daily routine bring you comfort and gratitude?",
      "Think of a difficult time in your past. What good came from it?",
      "What are you grateful for about your current season of life?"
    ],
    reflective: [
      "What patterns do you notice in your thoughts and behaviors lately?",
      "How have you grown or changed in the past month?",
      "What life lesson keeps coming up for you repeatedly?",
      "Write about a decision you made recently. What influenced your choice?",
      "What would you tell your younger self about where you are now?",
      "What questions about life are you pondering these days?",
      "Describe a belief you held strongly that has evolved or changed."
    ],
    sad: [
      "What do you need to feel supported and comforted right now?",
      "Write about what you're grieving or missing in your life.",
      "What would you say to a friend going through what you're experiencing?",
      "Describe a time when you felt this way before and how you moved through it.",
      "What small act of self-care could you do for yourself today?",
      "What emotions are underneath your sadness? Explore them gently.",
      "Write about someone or something that brings you comfort during difficult times."
    ],
    anxious: [
      "What specific worries are consuming your mental energy right now?",
      "Write down your fears, then challenge each one with a rational response.",
      "What aspects of your current situation are within your control?",
      "Describe your breathing and body sensations right now. What do you notice?",
      "What has helped you feel calm and centered in the past?",
      "If your anxiety could speak, what would it be trying to protect you from?",
      "What would you do today if you felt completely confident and unafraid?"
    ],
    surprised: [
      "What unexpected event happened recently that caught you off guard?",
      "How do you typically react to surprises - positive and negative?",
      "Write about a pleasant surprise that made your day better.",
      "What's something that surprised you about yourself recently?",
      "Describe a moment when you were amazed by something or someone.",
      "What's the most surprising thing you've learned this week?",
      "How has life surprised you in ways you never expected?"
    ],
    calm: [
      "What brings you the most peace in your daily life?",
      "Describe your ideal quiet moment - where are you and what are you doing?",
      "What helps you feel centered when life gets chaotic?",
      "Write about a place that always makes you feel calm.",
      "What activities help you slow down and be present?",
      "How do you create moments of stillness in your busy life?",
      "What wisdom have you gained from peaceful moments?"
    ],
    excited: [
      "What are you most excited about right now in your life?",
      "Describe something you're looking forward to with anticipation.",
      "What project or goal has you feeling energized and motivated?",
      "Write about a time when your excitement led to something wonderful.",
      "What new opportunity or adventure is calling to you?",
      "How does excitement feel in your body and mind?",
      "What would you do if you had unlimited energy and enthusiasm?"
    ],
    confident: [
      "What accomplishment are you most proud of recently?",
      "Write about a time when you trusted yourself and it paid off.",
      "What skills or qualities do you feel most confident about?",
      "Describe a challenge you're ready to take on.",
      "What would you attempt if you knew you couldn't fail?",
      "How has your confidence grown over the past year?",
      "What advice would your confident self give to someone struggling?"
    ],
    curious: [
      "What question has been on your mind lately that you'd love to explore?",
      "What new skill or subject would you like to learn more about?",
      "Write about something that fascinates you but you don't fully understand.",
      "What would you ask if you could have a conversation with anyone?",
      "Describe a mystery in your life that you'd like to solve.",
      "What assumptions are you questioning about yourself or the world?",
      "If you could explore any topic deeply, what would it be and why?"
    ],
    loved: [
      "Who makes you feel most loved and appreciated in your life?",
      "Describe a moment when you felt completely accepted for who you are.",
      "What acts of love, big or small, have touched your heart recently?",
      "Write about how you show love to the important people in your life.",
      "What does unconditional love mean to you?",
      "How do you recognize and receive love when it's offered to you?",
      "What would you want the people you care about to know about how much they mean to you?"
    ],
    neutral: [
      "What does it feel like to be in a balanced, neutral state of mind?",
      "Write about the value of feeling neither high nor low emotionally.",
      "How do you find stability when emotions feel intense?",
      "What helps you return to center when you're feeling off-balance?",
      "Describe what contentment looks like in your daily life.",
      "What are you observing about yourself and your life from this neutral perspective?",
      "How can this calm, balanced feeling serve you moving forward?"
    ]
  };

  const fetchSavedEntries = async () => {
    await axios.get(`${BACKEND_URL}/api/journal/getJournals`,{
      withCredentials: true
    }).then((res)=>{
      if(res.data.status == 1){
        setSavedEntries(res.data.journals);
      }
    }).catch((e)=>{
      console.error("Error fetching saved entries:", e);
    })
  }
  
  useEffect(()=>{
    console.log("Page reloaded");
    fetchSavedEntries();
  },[]);

  useEffect(()=>{
    console.log(savedEntries);
  },[savedEntries]);

  const getRandomPrompt = (mood) => {
    const moodPrompts = prompts[mood] || prompts.reflective;
    const randomIndex = Math.floor(Math.random() * moodPrompts.length);
    return moodPrompts[randomIndex];
  };

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
    setCurrentPrompt(getRandomPrompt(moodId));
    setJournalEntry('');
  };

  const getNewPrompt = () => {
    if (selectedMood) {
      setCurrentPrompt(getRandomPrompt(selectedMood));
    }
  };

  const saveEntry = async () => {
    if (journalEntry.trim() === "" || selectedMood.trim() === "") {
      toast.error("Please select a mood and write something before saving");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/journal/addJournal`, {
        moodTitle: selectedMood,
        moodDescription: journalEntry    
      }, { withCredentials: true });
      
      if (response.data.status === 1) {
        toast.success("Journal entry saved successfully!");
        fetchSavedEntries();
        setJournalEntry("");
        setCurrentPrompt("");
        setSelectedMood("");
      }
    } catch (error) {
      console.error("Error saving journal:", error);
      toast.error("Failed to save journal entry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedMoodData = moods.find(mood => mood.id === selectedMood);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Toaster 
        toastOptions={{
          duration: 3000,
          style: {
            background: '#FFFF',
            color: '#101010',
            borderRadius: '10px',
            padding: '16px',
          },
        }}
      />
      
      {/* Header */}
      <div className="text-center py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-purple-600/5 to-pink-600/5"></div>
        <div className="relative">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Edit3 className="w-6 h-6 text-white" />
            </div>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            <Sparkles className="w-8 h-8 text-indigo-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Mood Journal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Express yourself through guided prompts tailored to your emotional state
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Mood Selection Sidebar */}
          <div className="lg:col-span-1 h-screen lg:h-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 sticky top-6 flex flex-col max-h-[calc(100vh-3rem)]">
              <div className="p-6 flex-shrink-0">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <Heart className="w-6 h-6 text-indigo-500" />
                    How are you feeling?
                  </h3>
                  {showSaved && (
                    <button
                      onClick={() => setShowSaved(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto px-6 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <div className="space-y-3">
                  {moods.map((mood) => {
                    const Icon = mood.icon;
                    const isSelected = selectedMood === mood.id;
                    return (
                      <button
                        key={mood.id}
                        onClick={() => handleMoodSelect(mood.id)}
                        className={`w-full p-4 rounded-2xl transition-all duration-300 text-left group relative overflow-hidden ${
                          isSelected
                            ? `bg-gradient-to-r ${mood.color} text-white shadow-lg transform scale-105 shadow-${mood.id}/25`
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md hover:transform hover:scale-102'
                        }`}
                      >
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-white'} transition-colors`}>
                              <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : mood.textColor}`} />
                            </div>
                            <span className="font-semibold">{mood.name}</span>
                          </div>
                          <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'} leading-relaxed`}>
                            {mood.description}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="absolute inset-0 bg-gradient-to-r opacity-10 rounded-2xl" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 pt-0 flex-shrink-0">
                {/* Saved Entries Toggle */}
                <button
                  onClick={() => setShowSaved(!showSaved)}
                  className="w-full p-4 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group border border-indigo-100"
                >
                  <BookOpen className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-indigo-700">
                    {showSaved ? 'Hide' : 'View'} Saved Entries ({savedEntries.length})
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {!showSaved ? (
              <>
                {selectedMood ? (
                  <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    {/* Mood Header */}
                    <div className={`${selectedMoodData.bgLight} rounded-2xl p-6 mb-8 border border-gray-100`}>
                      <div className="flex items-center gap-4 mb-3">
                        <div className={`p-3 rounded-2xl bg-gradient-to-r ${selectedMoodData.color} shadow-lg`}>
                          <selectedMoodData.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className={`text-2xl font-bold ${selectedMoodData.textColor} mb-1`}>
                            Feeling {selectedMoodData.name}
                          </h3>
                          <p className="text-gray-600 font-medium">{selectedMoodData.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Prompt Section */}
                    {currentPrompt && (
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-indigo-500" />
                            Today's Prompt
                          </h4>
                          <button
                            onClick={getNewPrompt}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all duration-200 hover:scale-105"
                          >
                            <RotateCcw className="w-4 h-4" />
                            New Prompt
                          </button>
                        </div>
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                          <p className="text-gray-700 text-lg leading-relaxed font-medium italic">
                            "{currentPrompt}"
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Journal Input */}
                    <div className="mb-8">
                      <label className="block text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Edit3 className="w-5 h-5 text-indigo-500" />
                        Your thoughts:
                      </label>
                      <div className="relative">
                        <textarea
                          value={journalEntry}
                          onChange={(e) => setJournalEntry(e.target.value)}
                          placeholder="Start writing your thoughts here... Let your emotions flow freely."
                          rows={12}
                          className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none text-gray-700 leading-relaxed text-lg transition-all duration-200 placeholder:text-gray-400"
                        />
                        <div className="absolute bottom-4 right-4 text-sm text-gray-400 font-medium">
                          {journalEntry.length} characters
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <button
                      onClick={saveEntry}
                      disabled={!journalEntry.trim() || isLoading}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-x-95 disabled:transform-none disabled:shadow-none"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Save Entry
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
                    <div className="max-w-lg mx-auto">
                      <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <p className="text-6xl" >💖</p>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-4">
                        Select Your Mood
                      </h3>
                      <p className="text-gray-500 text-lg leading-relaxed">
                        Choose how you're feeling today to get a personalized writing prompt that matches your emotional state and helps you explore your thoughts.
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Saved Entries View */
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-indigo-500" />
                  Saved Entries
                </h3>
                {savedEntries.length > 0 ? (
                  <div className="space-y-8">
                    {savedEntries.map((entry, index) => {
                      if(entry.moodTitle != selectedMood && selectedMood!="") return null;
                      const moodData = moods.find(m => m.id === selectedMood) || moods[0];
                      return (
                        <div key={entry._id || index} className="border-2 border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${moodData.color} shadow-md`}>
                              <moodData.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <span className={`font-bold text-lg ${moodData.textColor}`}>{entry.moodTitle}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <Calendar className="w-4 h-4 text-gray-400"/>
                                <span className="text-sm text-gray-500">
  {new Date(entry.myDate).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  })}
</span>

                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {entry.moodDescription}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                    <h4 className="text-xl font-bold text-gray-400 mb-2">No entries yet</h4>
                    <p className="text-gray-500 text-lg">Start journaling to see your entries here!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
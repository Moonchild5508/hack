import React, { useState } from 'react';
import { Brain, Heart, Battery, MessageSquareWarning, Sparkles } from 'lucide-react';

type Emotion = 'happy' | 'sad' | 'anxious' | 'angry' | 'neutral';
type StressLevel = 1 | 2 | 3 | 4 | 5;

interface Recommendation {
  title: string;
  description: string;
  activity: string;
}

function App() {
  const [emotion, setEmotion] = useState<Emotion>('neutral');
  const [stressLevel, setStressLevel] = useState<StressLevel>(3);
  const [showResult, setShowResult] = useState(false);

  const getRecommendation = (emotion: Emotion, stress: StressLevel): Recommendation => {
    if (emotion === 'anxious' && stress >= 4) {
      return {
        title: '深呼吸练习',
        description: '您似乎正在经历较高的焦虑和压力。建议进行一些放松练习。',
        activity: '尝试"4-7-8"呼吸法：吸气4秒，屏息7秒，呼气8秒。重复5次。'
      };
    } else if (emotion === 'sad' && stress >= 3) {
      return {
        title: '正念冥想',
        description: '感到悲伤是正常的。让我们通过冥想来提升心情。',
        activity: '找一个安静的地方，闭上眼睛，专注于当下的感受，不做评判，持续10分钟。'
      };
    } else if (emotion === 'angry') {
      return {
        title: '情绪释放',
        description: '愤怒需要健康的方式来释放。',
        activity: '可以尝试剧烈运动，如快走或跑步15分钟，让身体释放内啡肽。'
      };
    } else if (stress >= 4) {
      return {
        title: '压力管理',
        description: '您的压力水平较高，需要适当的休息和调节。',
        activity: '建议进行15分钟的渐进式肌肉放松：从脚趾开始，依次绷紧再放松每组肌肉。'
      };
    } else {
      return {
        title: '保持平衡',
        description: '您的状态相对平稳，继续保持良好的心理健康很重要。',
        activity: '建议进行一次愉快的户外散步，享受自然，保持这种平和的心态。'
      };
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const recommendation = getRecommendation(emotion, stressLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">心理状态检测</h1>
          <p className="text-gray-600">了解您的情绪，获取专业建议</p>
        </div>

        {!showResult ? (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="mb-8">
              <label className="block text-gray-700 text-lg font-medium mb-4">
                您最近的情绪状态是？
              </label>
              <div className="grid grid-cols-5 gap-4">
                {(['happy', 'sad', 'anxious', 'angry', 'neutral'] as Emotion[]).map((e) => (
                  <button
                    key={e}
                    onClick={() => setEmotion(e)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      emotion === e
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-2xl">
                        {e === 'happy' && '😊'}
                        {e === 'sad' && '😢'}
                        {e === 'anxious' && '😰'}
                        {e === 'angry' && '😠'}
                        {e === 'neutral' && '😐'}
                      </span>
                      <p className="mt-2 text-sm text-gray-600">
                        {e === 'happy' && '开心'}
                        {e === 'sad' && '难过'}
                        {e === 'anxious' && '焦虑'}
                        {e === 'angry' && '生气'}
                        {e === 'neutral' && '平静'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 text-lg font-medium mb-4">
                您当前的压力水平？ (1-5)
              </label>
              <div className="flex items-center gap-4">
                {([1, 2, 3, 4, 5] as StressLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setStressLevel(level)}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      stressLevel === level
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    <div className="text-center">
                      <Battery className={`w-6 h-6 mx-auto ${
                        level <= 2 ? 'text-green-500' :
                        level === 3 ? 'text-yellow-500' :
                        'text-red-500'
                      }`} />
                      <p className="mt-2 text-sm text-gray-600">
                        {level === 1 && '很轻松'}
                        {level === 2 && '轻微压力'}
                        {level === 3 && '中等压力'}
                        {level === 4 && '较大压力'}
                        {level === 5 && '极度压力'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              获取分析和建议
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                {recommendation.title}
              </h2>
              <button
                onClick={() => setShowResult(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                返回
              </button>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <p className="text-gray-700">{recommendation.description}</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium text-gray-800 mb-2">建议活动</h3>
                <p className="text-gray-700">{recommendation.activity}</p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex items-start gap-3">
                  <MessageSquareWarning className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-600">
                    注意：这只是一般性的建议。如果您持续感到困扰，建议咨询专业的心理医生获取帮助。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>关爱心理健康 © 2024</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
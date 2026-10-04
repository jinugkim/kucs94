/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, EventNotice } from './types';
import { INITIAL_NOTICES } from './data/protocolData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FuneralGuide } from './components/FuneralGuide';
import { WeddingGuide } from './components/WeddingGuide';
import { OtherEventsGuide } from './components/OtherEventsGuide';
import { EnvelopeSimulator } from './components/EnvelopeSimulator';
import { CostCalculator } from './components/CostCalculator';
import { MessageGenerator } from './components/MessageGenerator';
import { KucsRulesSection } from './components/KucsRulesSection';
import { GithubRepoGuide } from './components/GithubRepoGuide';
import { RegisterModal } from './components/RegisterModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('funeral');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Load notices from localStorage or fallback
  const [notices, setNotices] = useState<EventNotice[]>(() => {
    try {
      const saved = localStorage.getItem('kucs94_event_notices');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_NOTICES;
  });

  // Encouragements / condolence messages
  const [encouragements, setEncouragements] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('kucs94_encouragements');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      'notice-1': [
        '민우야, 삼가 고인의 명복을 빈다. 어머님 좋은 곳으로 가셨을 거야. 힘내라.',
        '삼가 조의를 표합니다. 장례 잘 치르고 기운 내길 바란다.'
      ],
      'notice-2': [
        '준형아 장녀 결혼 진심으로 축하한다! 꼭 참석할게.',
        '벌써 자녀 결혼이라니 감회가 새롭다. 두 분의 앞날을 축복합니다.'
      ]
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('kucs94_event_notices', JSON.stringify(notices));
    } catch (e) {
      console.error(e);
    }
  }, [notices]);

  useEffect(() => {
    try {
      localStorage.setItem('kucs94_encouragements', JSON.stringify(encouragements));
    } catch (e) {
      console.error(e);
    }
  }, [encouragements]);

  const handleRegisterNotice = (newNoticeData: Omit<EventNotice, 'id' | 'createdAt'>) => {
    const newNotice: EventNotice = {
      ...newNoticeData,
      id: `notice-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setNotices(prev => [newNotice, ...prev]);
    setActiveTab('kucs-rules');
  };

  const handleSendEncouragement = (noticeId: string, message: string) => {
    setEncouragements(prev => ({
      ...prev,
      [noticeId]: [...(prev[noticeId] || []), message]
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
      />

      {/* Hero Banner (Always informative and accessible) */}
      <HeroSection
        onSelectTab={setActiveTab}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Navigation Category Pill Selector */}
        <div className="mb-8 flex items-center justify-between border-b border-neutral-200 pb-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {[
              { id: 'funeral', label: '1. 장례(조사) 절차' },
              { id: 'wedding', label: '2. 결혼(경사) 절차' },
              { id: 'other', label: '3. 수연·첫돌·개업' },
              { id: 'envelope', label: '4. 봉투 서식기' },
              { id: 'calculator', label: '5. 축·조의금 계산기' },
              { id: 'messages', label: '6. 알림·답례문' },
              { id: 'kucs-rules', label: '7. 동문 지원 기준' },
              { id: 'github', label: '8. GitHub (kucs94)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center text-xs text-neutral-400 font-mono">
            KUCS 94 Fellowship Protocol
          </div>
        </div>

        {/* Tab Views */}
        <div className="transition-all duration-200">
          {activeTab === 'funeral' && <FuneralGuide />}
          {activeTab === 'wedding' && <WeddingGuide />}
          {activeTab === 'other' && <OtherEventsGuide />}
          {activeTab === 'envelope' && <EnvelopeSimulator />}
          {activeTab === 'calculator' && <CostCalculator />}
          {activeTab === 'messages' && <MessageGenerator />}
          {activeTab === 'kucs-rules' && (
            <KucsRulesSection
              notices={notices}
              onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
              onSendEncouragement={handleSendEncouragement}
              encouragements={encouragements}
            />
          )}
          {activeTab === 'github' && <GithubRepoGuide />}
        </div>
      </main>

      {/* Registration Modal */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegisterNotice}
      />

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}

import React from 'react';
import { TabType } from '../types';
import { Bell, GitBranch, BookmarkCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenRegisterModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenRegisterModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => setActiveTab('funeral')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors">
            KUCS 94 경조사 포털
          </span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-600">
          <button
            onClick={() => setActiveTab('funeral')}
            className={`transition-colors hover:text-neutral-900 whitespace-nowrap cursor-pointer ${
              activeTab === 'funeral' ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900' : ''
            }`}
          >
            장례(조사) 절차
          </button>
          <button
            onClick={() => setActiveTab('wedding')}
            className={`transition-colors hover:text-neutral-900 whitespace-nowrap cursor-pointer ${
              activeTab === 'wedding' ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900' : ''
            }`}
          >
            결혼(경사) 절차
          </button>
          <button
            onClick={() => setActiveTab('other')}
            className={`transition-colors hover:text-neutral-900 whitespace-nowrap cursor-pointer ${
              activeTab === 'other' ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900' : ''
            }`}
          >
            기타 경조사
          </button>
          <button
            onClick={() => setActiveTab('envelope')}
            className={`transition-colors hover:text-neutral-900 whitespace-nowrap cursor-pointer ${
              activeTab === 'envelope' ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900' : ''
            }`}
          >
            봉투 서식기
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`transition-colors hover:text-neutral-900 whitespace-nowrap cursor-pointer ${
              activeTab === 'calculator' ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900' : ''
            }`}
          >
            축·조의금 계산기
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`transition-colors hover:text-neutral-900 whitespace-nowrap cursor-pointer ${
              activeTab === 'messages' ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900' : ''
            }`}
          >
            알림·답례문 생성
          </button>
          <button
            onClick={() => setActiveTab('kucs-rules')}
            className={`transition-colors hover:text-neutral-900 whitespace-nowrap cursor-pointer ${
              activeTab === 'kucs-rules' ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900' : ''
            }`}
          >
            동문 지원 기준
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/jinugkim/kucs94"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border text-neutral-700 border-neutral-300 hover:bg-neutral-100 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            title="GitHub jinugkim/kucs94 리포지토리 바로가기"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">jinugkim/kucs94</span>
          </a>

          <button
            onClick={onOpenRegisterModal}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xs"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>경조사 등록·신청</span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Navigation Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-neutral-100 gap-2 scrollbar-none text-xs bg-neutral-50/80">
        {[
          { id: 'funeral', label: '장례 절차' },
          { id: 'wedding', label: '결혼 절차' },
          { id: 'other', label: '기타 경조사' },
          { id: 'envelope', label: '봉투 서식' },
          { id: 'calculator', label: '금액 계산' },
          { id: 'messages', label: '알림문 생성' },
          { id: 'kucs-rules', label: '동문 지원' },
          { id: 'github', label: 'GitHub' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as TabType)}
            className={`px-3 py-1 rounded-md whitespace-nowrap font-medium transition-colors ${
              activeTab === item.id
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
